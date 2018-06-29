<?php

namespace App\Jobs;

use App\Traits\WordpressAPI;

use App\Story;
use App\Asset;
use App\Libraries\VideoHelper;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Carbon\Carbon;

class QueueStory implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, WordpressAPI;

    protected $post;
    protected $update_type;
    protected $user_id;

    public $tries = 2;
    public $timeout = 3600;

    /**
     * Create a new job instance.
     *
     * @return void
     */

    public function __construct($post, $update_type = 'new', $user_id)
    {
        $this->post = $post;
        $this->update_type = $update_type;
        $this->user_id = $user_id;
    }

	/**
	 * Execute the job.
	 * @param array $post
	 * @param string $update_type
	 * @return void
	 */
	public function handle() // THIS JOB ADDS OR UPDATES A STORY IN OUR DB FROM EACH WP POST
	{
		// determine if adding new story & updating
		if($this->update_type == 'new') {
			$story = new Story();
			$story->alpha_id = VideoHelper::quickRandom();
			$story->wp_id = $this->post->id;
			$story->active = 1;
            $story->state = 'licensed';
		} else {
			$story = Story::where([['wp_id', $this->post->id]])->first();
		}

		// get assets from curl request (as a function)
		$asset_ids = $this->createAssets($this->post->featured_media, $this->post->content->rendered);
		if(count($asset_ids)) {
			$story->thumb = (Asset::find($asset_ids[0])->url ? Asset::find($asset_ids[0])->url : NULL);
		}

		// get author from curl request
		if($this->post->author) {
			$author = $this->apiRequest('users/' . $this->post->author);
			$story->author = isset($author->name) ? $author->name : NULL;
		}

		if($this->post->content->rendered){
			$description = preg_replace('/copyrightHolder\">([^<]+)</is','copyrightHolder"><',$this->post->content->rendered); // Remove UNILAD
			$description = preg_replace('/<script(.*?)>(.*?)<\/script>/is', '', $description); // Remove scripts
			$description = strip_tags($description, '<p><blockquote>'); // Strip tags (except p and blockquote)
			$description = str_replace('If you have a story you want to tell send it to UNILAD via stories@unilad.co.uk. To license this article contact licensing@unilad.co.uk','',$description); // Need to remove last line
			$description = str_replace('If you have a story you want to tell send it to stories@unilad.co.uk. To license this article contact licensing@unilad.co.uk','',$description); // Need to remove last line
		}else{
			$description = NULL;
		}

        $story->flagged = (is_int(array_search(env('UNILAD_WP_FLAGGED_ID'), $this->post->tags)) ? 1 : 0); // if tag in WP is also 'flagged' then display as hot story in stories view

		$story->excerpt = ($this->post->excerpt ? substr(trim(strip_tags($this->post->excerpt->rendered)),0,700) : NULL);
		$story->date_ingested = Carbon::parse($this->post->date)->format('Y-m-d H:i:s');
		$story->categories = implode(",",$this->post->categories);
		$story->status = $this->post->status;
		$story->title = $this->post->title->rendered;
		$story->url = $this->post->link;
		$story->description = $description;
		$story->user_id = $this->user_id;

		$story->save();
		$story->assets()->sync($asset_ids);
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
			$jwPlayerCodes = $this->getJwPlayerCode($description);

			if ($jwPlayerCodes) {
				foreach($jwPlayerCodes as $jwPlayerCode){
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
	 * @param string $postBody
	 * @return null|string
	 */
	private function getJwPlayerCode(string $postBody)
	{
		$jwInstances = array();
		if ($c = preg_match_all("/jwplayer\.php\?mediaID=([^\"]+)/is", $postBody, $matches)) {
			$jwInstances = $matches[1];
		}elseif ($d = preg_match_all("/jwplayer\(\'jwplayer_([^_]+)/is", $postBody, $matches)) {
			$jwInstances = $matches[1];
		}

		if($jwInstances){
			return $jwInstances;
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
