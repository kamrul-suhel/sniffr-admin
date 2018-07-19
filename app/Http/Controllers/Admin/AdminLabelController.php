<?php

namespace App\Http\Controllers\Admin;

use App\Label;
use App\Video;
use App\Story;
use Carbon\Carbon as Carbon;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;

use App\Http\Controllers\Controller;
use Dumpk\Elastcoder\ElastcoderAWS;

class AdminLabelController extends Controller {

    /**
     * AdminLabelController constructor.
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
     public function index() {

         //$isJson = $request->ajax();

         // function to remove duplicates within multidimensional array
         function super_unique($array,$key) {
             $temp_array = [];
             foreach ($array as &$v) {
                 if (!isset($temp_array[$v[$key]]))
                 $temp_array[$v[$key]] =& $v;
             }
             $array = array_values($temp_array);
             // order array by confidence
             usort($array, function($a, $b) {
                 return $b['Confidence'] <=> $a['Confidence'];
             });
             return $array;
         }

         // list of words that are too common which should be removed
         $blacklist = array('Human', 'Person', 'People', 'Furniture', 'Chair');

         // get file name of video, then copy video for analysis
         $search_value = Input::get('f');
         //$disk = Storage::disk('s3_sourcebucket');
         //$disk->copy(''.$video_value, 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.$video_value);

         // strip out and create search index
         $search_value = substr($search_value, 0, strrpos($search_value, '.'));
         if($search_value){
             $search = array();
             for ($i = 1; $i < 10; ++$i) {
                 $search[] = $search_value.'-'.sprintf("%04s", $i).'.png';
             }
         }

         if(isset($search)) {
             //search database for labels associated with search index
             $files = Label::whereIn('frame', $search)
                ->get();

             // create array with all labels obtained through image analysis
             $labels = array();
             $count = 0;
             foreach ($files as $file) {
                 $temps = $file->labels;
                 if(is_array($temps)&&count($temps)) {
                     foreach ($temps as $temp){
                         if (!in_array($temp['Name'], $blacklist)) {
                             if($temp['Confidence']>85) {
                                 $labels[$count]['Name'] = $temp['Name'];
                                 $labels[$count]['Confidence'] = $temp['Confidence'];
                                 $count++;
                             }
                         }
                     }
                 }
             }

             // remove duplicates and order labels array by confidence
             $labels = super_unique($labels,'Name');

             // if array exists then display labels
             if (!empty($labels)) {

                 return response()->json(['status' => 'success', 'message' => 'Labels found.', 'labels' => $labels]);
             } else {

                 return response()->json(['status' => 'fail', 'message' => 'No labels found.']);
             }

         } else {

             return response()->json(['status' => 'fail', 'message' => 'No labels found.']);
         }

     }

     public function analyseVideo() {
         $type = Input::get('type');
         if($type=='start') {
             $config = [
                    'MinConfidence' => 80,
                    'Video' => [
                        'S3Object' => [
                            'Bucket' => 'vlp-storage',
                            'Name' => '1-hfcqy4pz2fnub4txlp9aof1rwpwcnff.mp4',
                        ],
                    ],
                ];
             $job = \Rekognition::startLabelDetection($config);
         } elseif($type=='get') {
             $config = [
                    'JobId' => '1c5e8249508ea97368d5e0dc5381d1e839470880d34db42466c30cd349c19cf5',
                    'SortBy' => 'NAME',
                ];
             $job = \Rekognition::getLabelDetection($config);
         } elseif ($type=='adult_start') {
             $config = [
                    'Video' => [
                        'S3Object' => [
                            'Bucket' => 'vlp-storage',
                            'Name' => '11dtbg-ys3jw8j8kqq2nt_evx4w6ilhg7.mp4',
                        ],
                    ],
                ];
             $job = \Rekognition::startContentModeration($config);
         } elseif ($type=='adult_get') {
             $config = [
                    'JobId' => '32d74b9d5ff1d85bb2f3786f5a0d72529f8f7475813d4cfaaa846ed69e4f36dd',
                    'SortBy' => 'NAME',
                ];
             $job = \Rekognition::getContentModeration($config);
             if($job['JobStatus']=='SUCCEEDED'){
                 $labels = $job['ModerationLabels'];
                 if(count($labels)) {
                     foreach($labels as $label){
                         foreach($label as $l){
                             $uniques[$l['Name']] = ['Confidence' => $l['Confidence']];
                         }
                     }
                 }
             } else {
                 echo $job['JobStatus'];
             }
         }
     }

    public function analyseVideo_2()
    {
        $thumbnail_file = Input::get('f');

        if (Storage::disk('s3')->exists(basename($thumbnail_file))) {
            Storage::disk('s3')->setVisibility(basename($thumbnail_file), 'public');
        }
    }

    public function checkWatermark()
    {
        $fileName = '1514976319-new-video.mp4';
        $ext = pathinfo($fileName, PATHINFO_EXTENSION);
        $watermark_file = substr($fileName, 0, strrpos($fileName, '.')) . '-watermark.' . $ext;

        $config = [
            'PresetId' => '1516201655942-vaq9mu',
            'width' => 1920,
            'height' => 1080,
            'aspect' => '16:9',
            'ext' => 'mp4',
            'PipelineId' => '1515757750300-4fybrt',
            'Watermarks' => [[
                'PresetWatermarkId' => 'TopRight',
                'InputKey' => 'logo-sniffr-white.png'
            ]],
        ];

        $elastcoder = new ElastcoderAWS();
        $job = $elastcoder->transcodeVideo($fileName, $watermark_file, $config);
        echo $job['Id'];
    }

     public function makeWatermark() {

        // FFMpeg
        $file = '1514988307-snow_angels.mp4';
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        $watermark_file = substr($file, 0, strrpos($file, '.')).'-watermark.'.$ext;
        $gif_file = substr($file, 0, strrpos($file, '.')).'.gif';

        $watermark = FFMpeg::open($file);

        $video_dimensions = $watermark
            ->getStreams()
            ->videos()
            ->first()
            ->getDimensions();
        $video_width = $video_dimensions->getWidth();
        $video_height = $video_dimensions->getHeight();

        // Save logo to right size
        $logo_width = floor($video_width/10);
        $logo_padding_width = floor($video_width/100);
        $logo_file = public_path('content/uploads/settings/logo-sniffr-white-'.$logo_width .'.png');

        Image::make(public_path('content/uploads/settings/logo-sniffr-white.png'))->opacity(80)->resize($logo_width, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save($logo_file);

        $watermark_filter = new \FFMpeg\Filters\Video\WatermarkFilter($logo_file, array(
            'position' => 'relative',
            'right' => $logo_padding_width,
            'top' => $logo_padding_width,
        ));

        $watermark->addFilter($watermark_filter)
            ->export()
            ->inFormat(new \FFMpeg\Format\Video\X264('libmp3lame'))
            ->save($watermark_file);

        $url = Storage::disk('s3')->setVisibility($watermark_file, 'public');

        $data['url'] = $url;
        return view('admin.videos.test', $data);

        if(Storage::disk('s3')->exists($url)) {
            $data['url'] = $url;
            return view('admin.videos.test', $data);
        } else {
            echo 'Not found.';
        }
    }

    public function reviewFailedJobs() {

        function get_string_between($string, $start, $end){
            $string = ' ' . $string;
            $ini = strpos($string, $start);
            if ($ini == 0) return '';
            $ini += strlen($start);
            $len = strpos($string, $end, $ini) - $ini;
            return substr($string, $ini, $len);
        }

        $query_value = 'QueueEmail';
        $fails = DB::table('failed_jobs')->where('payload', 'LIKE' , '%'.$query_value.'%')->get();
        foreach($fails as $fail) {
            $payload = json_decode($fail->payload);
            $payload = get_string_between($payload->data->command, ';i:', ';s:');
            if($payload) {
                $video = Video::where('id', $payload)->first();
                if(isset($video->contact->id)) {
                    if($video->state=='accepted' || $video->state=='pending' || $video->state=='licensed') {
                        echo 'full name: '.$video->contact->full_name.' | email: '.$video->contact->email.' | video_alpha_id: '.$video->alpha_id.' <br />';
                    }
                }
            }
        }

    }

    public function automateEmailReminders() {

        $assets = Story::where([['state', 'approved'], ['contact_id', '!=', NULL], ['contact_made', NULL], ['contacted_at', '>', Carbon::now()->subDays(30)->toDateTimeString()]])
        ->where(function ($query) {
            $query->where('reminders', '<', 4)
                ->orWhereNull('reminders');
        })
        ->orderBy('contacted_at', 'DESC')
        ->get();

        if(count($assets)>0) {

            // Set incremental queue delay
            $queue_delay = 10;

            // Loop through stories
            foreach ($assets as $asset) {
                // Check previous reminders and whether the story fits within the range: 24 hours, 48 hours, 72 hours (archive)
                $ok = false;
                switch (true) {
                    case ($asset->reminders == NULL && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString()): // no reminders sent, this will be the first to be sent
                        $type = '24 hours';
                        $ok = true; //After 24 hours
                        break;
                    case ($asset->reminders == 1 && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(2)->toDateTimeString()): // this will be the second to be sent
                        $type = '48 hours';
                        $ok = true; //After 48 hours
                        break;
                    case ($asset->reminders == 2 && $asset->contacted_at < Carbon::now()->subDays(2)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(3)->toDateTimeString()): // this will move story into archive
                        $type = 'Archive';
                        $ok = true; //After 72 hours
                        break;
                }

                // Only send reminder if within above range plus if story has a contact
                if(isset($asset->contact) && $ok == true) {

                    // Which method to contact (if not archiving story)
                    if($type!='Archive') {

                        switch (true) {
                            case (isset($asset->contact->email)):
                                // Schedule email reminder to be sent via queue/job
                                // QueueEmail::dispatch($asset->id, 'story_contacted', 'story')
                                //     ->delay(now()->addSeconds($queue_delay));
                                break;
                            case (isset($asset->contact->twitter)):
                                // Schedule twitter reminder to be sent via queue/job
                                // QueueTweet::dispatch($asset->id, 'story_contacted', 'story')
                                //     ->delay(now()->addSeconds($queue_delay));
                                break;
                            case (isset($asset->contact->reddit)):
                                // Schedule reddit reminder to be sent via queue/job
                                // QueueReddit::dispatch($asset->id, 'story_contacted', 'story')
                                //     ->delay(now()->addSeconds($queue_delay));
                                break;
                        }

                    }

                    // Output to schedule log
                    echo Carbon::now()->toDateTimeString().' : '.$type.' : '.$asset->alpha_id.' : '.$asset->title.' : '.$asset->contacted_at.' : '.($asset->reminders ? $asset->reminders : 0).' : '.$asset->contact->full_name. "<br />";

                    // Need to update story reminder count and contacted_at sent timestamp
                    $asset->contacted_at = now();
                    $asset->reminders = ($asset->reminders ? $asset->reminders+1 : 1);
                    $asset->state = ($type=='Archive' ? 'archive' : $asset->state); // Set story state to archive
                    $asset->save();

                    // Increment queue delay
                    $queue_delay = $queue_delay + 10;

                }
            }
        }

    }

    public function automateEmailReminders2() {

        $videos = Video::where([['state', 'accepted'], ['contact_id', '!=', 0], ['more_details', NULL], ['more_details_code', '!=', NULL], ['more_details_sent', '>', Carbon::now()->subDays(30)->toDateTimeString()]])
        ->where(function ($query) {
            $query->where('reminders', '<', 4)
                ->orWhereNull('reminders');
        })
        ->orderBy('more_details_sent', 'DESC')
        ->get();

        if(count($videos)>0) {
            // Loop through videos
            foreach ($videos as $video) {
                // Check previous reminders and whether the video fits within the range: 24 hours, 72 hours, 1 week
                $send_ok = false;
                switch (true) {
                    case ($video->reminders == NULL && $video->more_details_sent < Carbon::now()->subDays(1)->toDateTimeString()): // no reminders sent, this will be the first to be sent
                        $type = '24 hours';
                        $send_ok = true; //24 hours
                        break;
                    case ($video->reminders == 1 && $video->more_details_sent < Carbon::now()->subDays(1)->toDateTimeString() && $video->more_details_sent > Carbon::now()->subDays(3)->toDateTimeString()): // this will be the second to be sent
                        $type = '72 hours';
                        $send_ok = true; //72 hours
                        break;
                    case ($video->reminders == 2 && $video->more_details_sent < Carbon::now()->subDays(7)->toDateTimeString() && $video->more_details_sent > Carbon::now()->subDays(15)->toDateTimeString()): // this will be the third to be sent
                        $type = '1 week';
                        $send_ok = true; //1 week
                        break;
                }

                // Only send email reminder if within above range plus if video has a contact/email
                if(isset($video->contact) && $video->contact->email!=NULL && $send_ok == true){
                    echo $type.' : '.$video->alpha_id.' : '.$video->title.' : '.$video->more_details_sent.' : '.$video->reminders.'<br />';
                    // Need to update video reminder count and more details sent timestamp
                    // $video->more_details_sent = now();
                    // $video->reminders = $video->reminders ? $video->reminders+1 : 1;
                    // $video->save();

                    // Schedule email reminder to be sent via queue/job
                    // QueueEmail::dispatch($video->id, 'details_reminder')
                    //     ->delay(now()->addSeconds(10));
                }
            }
        }

    }
}
