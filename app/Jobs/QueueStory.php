<?php

namespace App\Jobs;

use App\Traits\WordpressAPI;

use Auth;
use App\User;
use App\Story;
use App\Asset;
use App\Video;
use App\Libraries\VideoHelper;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use Carbon\Carbon as Carbon;

class QueueStory implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, WordpressAPI;

    protected $story_data;
    protected $update_type;
    protected $user_id;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($story_data, $update_type = 'new', $user_id)
    {
        $this->story_data = $story_data;
        $this->update_type = $update_type;
        $this->user_id = $user_id;
    }

    /**
     * @param string $postBody
     * @return null|string
     */
    private function getJwPlayerCode(string $postBody)
    {
        $reg = 'jwplayer_([^_]+)';

        if ($c = preg_match_all("/" . $reg . "/is", $postBody, $matches)) {
            $alphanum = $matches[1][0];
            return $alphanum;
        }
        return null;
    }

    /**
     * @param string $jwPlayerCode
     */
    private function getJwPlayerFile(string $jwPlayerCode)
    {
        $response = \GuzzleHttp\json_decode(file_get_contents('https://content.jwplatform.com/feeds/' . $jwPlayerCode . '.json'));

        $sources = $response->playlist[0]->sources;

        $videoUrl = array_filter($sources, function($k) {
            return $k->type == 'video/mp4';
        });

        return end($videoUrl)->file;
    }

    /**
     * @param string $featured_media
     * @param string $description
     * @return array
     */
     public function createAssets($featured_media, $description) {
         $asset_ids = [];

         // get featured image
         if($featured_media != 0) {

             // check if wp asset already exists within db
             $checkAsset = Asset::where([['wp_asset_id', $featured_media]])->first();
             if(!$checkAsset) {
                 // get WP asset details
                 $thumb = $this->apiRequest('media/' . $featured_media, true);

                 // create new asset in db
                 $asset = new Asset();
                 $asset->alpha_id = VideoHelper::quickRandom();
                 $asset->wp_asset_id = $thumb->id;
                 $asset->mime_type = $thumb->mime_type;
                 $asset->url = preg_replace("/^http:/i", "https:", $thumb->source_url); //might be useful to check if URL has changed
                 $asset->save();

                 // save asset id for syncing story->assets relationships
                 $asset_ids[] = $asset->id;
             } else {
                 $asset_ids[] = $checkAsset->id;
             }
         }

         // get all other assets
         if($description){
             // get the JW Player unique code
             $jwPlayerCode = $this->getJwPlayerCode($description);

             if ($jwPlayerCode) {
                 // get the JW Player video URL
                 $jwVideoFileUrl = $this->getJwPlayerFile($jwPlayerCode);

                 // check if JW Player video already exists in db
                 $asset = Asset::where([['url', $jwVideoFileUrl]])->first();
                 if (!$asset){
                     $asset = new Asset();
                     $asset->alpha_id = VideoHelper::quickRandom();
                     $asset->url = $jwVideoFileUrl;
                     $asset->jw_player_code = $jwPlayerCode;
                     $asset->mime_type = 'video/mp4';
                     $asset->thumbnail = 'https://assets-jpcust.jwpsrv.com/thumbs/' . $jwPlayerCode . '.jpg';
                     $asset->save();
                 }

                 // save asset id for syncing story->assets relationships
                 $asset_ids[] = $asset->id;
             }

             preg_match_all('/wp-image-(\d+)/', $description, $imageMatches);

             // Fetch all the assets from wp
             if(isset($imageMatches[1])){
                 foreach($imageMatches[1] as $key => $imageId){

                     // check if wp asset already exists within db
                     $checkAsset = Asset::where([['wp_asset_id', $imageId]])->first();
                     if(!$checkAsset) {
                         // get WP asset details
                         $image = $this->apiRequest('media/' . $imageId, true);

                         if($image->source_url) {
                             // create new asset in db
                             $asset = new Asset();
                             $asset->alpha_id = VideoHelper::quickRandom();
                             $asset->wp_asset_id = $image->id;
                             $asset->mime_type = $image->mime_type;
                             $asset->url = preg_replace("/^http:/i", "https:", $image->source_url); //might be useful to check if URL has changed
                             $asset->save();

                             // save asset id for syncing story->assets relationships
                             $asset_ids[] = $asset->id;
                         }
                     } else {
                         $asset_ids[] = $checkAsset->id;
                     }
                 }
             }
         }

         return $asset_ids;
     }

    /**
     * Execute the job.
     * @param array $story_data
     * @param string $update_type
     * @return void
     */
    public function handle() // THIS JOB ADDS OR UPDATES A STORY IN OUR DB FROM EACH WP POST
    {
        // determine if adding new story & updating
        if($this->update_type == 'new') {
            $story = new Story();
            $story->alpha_id = VideoHelper::quickRandom();
            $story->wp_id = $this->story_data['wp_id'];
            $story->active = 1;
        } else {
            $story = Story::where([['wp_id', $this->story_data['wp_id']]])->first();
        }

        // get assets from curl request (as a function)
        $asset_ids = $this->createAssets($this->story_data['featured_media'], $this->story_data['description']);
        if(count($asset_ids)) {
            $story->thumb = (Asset::find($asset_ids[0])->url ? Asset::find($asset_ids[0])->url : NULL);
        }

        // get author from curl request
        if($this->story_data['author']) {
            $author = $this->apiRequest('users/' . $this->story_data['author']);
            $story->author = isset($author->name) ? $author->name : NULL;
        }

        $story->excerpt = ($this->story_data['excerpt'] ? $this->story_data['excerpt'] : NULL);
        $story->date_ingested = $this->story_data['date'];
        $story->categories = implode("|",$this->story_data['categories']);
        $story->status = $this->story_data['status'];
        $story->state = 'licensed';
        $story->title = $this->story_data['title'];
        $story->url = $this->story_data['url'];
        $story->description = ($this->story_data['description'] ? $this->story_data['description'] : NULL);
        $story->user_id = $this->user_id;

        $story->save();
        $story->assets()->sync($asset_ids);
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
     public function failed($exception)
     {
         // Send user notification of failure, etc...
     }
}
