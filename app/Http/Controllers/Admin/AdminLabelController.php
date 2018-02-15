<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use FFMpeg;
//

use App\Page;
use App\Menu;
use App\Label;

use App\Libraries\ThemeHelper;

use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

use App\Http\Controllers\Controller;
use Dumpk\Elastcoder\ElastcoderAWS;

class AdminLabelController extends Controller {

    /**
     * constructor.
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

    /**
     * Display a listing of videos
     *
     * @return Response
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
             for ($i = 1; $i < 15; ++$i) {
                 $search[] = $search_value.'-'.sprintf("%04s", $i).'.png';
             }
         } else {
            $search = '';
         }

         //search database for labels associated with search index
         $files = Label::whereIn('frame', $search)->get();

         // create array with all labels obtained through image analysis
         $labels = array();
         $count = 0;
         foreach ($files as $file) {
             $temps = $file->labels;
             if(count($temps)) {
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

         //dd($labels);

         // if array exists then display labels
         if (!empty($labels)) {
             // foreach ($labels as $label){
             //     echo $label['Name'].'['.round($label['Confidence'],0).']<br />';
             // }
             return response()->json(['status' => 'success', 'message' => 'Labels found.', 'labels' => $labels]);
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
             dd($job['JobId']);
         } elseif($type=='get') {
             $config = [
                    'JobId' => '6333130c01cb42d2659c69d0f233ef6d046eecd7a2fd7fd341b5c3bed3423b3c',
                    'SortBy' => 'NAME',
                ];
             $job = \Rekognition::getLabelDetection($config);
             dd($job['Labels']);
             // if($job['JobStatus']=='SUCCEEDED'){
             //     $labels = $job['Labels'];
             //     $blacklist = array('Human', 'Person', 'People', 'Furniture', 'Chair');
             //     if(count($labels)) {
             //         usort($labels, function($a, $b) {
             //             return $b['Label']['Confidence'] <=> $a['Label']['Confidence'];
             //         });
             //
             //         foreach ($labels as $label){
             //             if (!in_array($label['Label']['Name'], $blacklist)) {
             //                 if(round($label['Label']['Confidence'],0)>85){
             //                     echo $label['Label']['Name'].'['.round($label['Label']['Confidence'],0).']<br />';
             //                 }
             //             }
             //         }
             //     }
             // }
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
             dd($job['JobId']);
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
                     dd($uniques);
                 }
             } else {
                 echo $job['JobStatus'];
             }
         }
     }

     public function analyseVideo_2() {

         //NOT CURRENTLY USED (moves video file to folder for analysis)
         // $video_value = Input::get('f');
         // $disk = Storage::disk('s3_sourcebucket');
         // if($disk->has($video_value)==1){
         //     $disk->move(''.$video_value, 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.$video_value);
         //     return response()->json(['status' => 'success', 'message' => 'Successfully copied the file.']);
         // } else {
         //     return response()->json(['status' => 'fail', 'message' => 'No file found.']);
         // }

         $found = 0;

         $thumbnail_file = Input::get('f');
         $thumbnail_file_alt = substr($thumbnail_file, 0, strrpos($thumbnail_file, '.')).'.png';

         if(Storage::disk('s3')->exists(basename($thumbnail_file))) {
             Storage::disk('s3')->setVisibility(basename($thumbnail_file), 'public');
             $found = 1;
         }

         if(Storage::disk('s3')->exists(basename($thumbnail_file_alt))) {
             //Storage::disk('s3')->setVisibility(basename($thumbnail_file_alt), 'public');
             $found = 2;
         }

         dd($found);

     }

     public function checkWatermark() {


        $elastcoder = new ElastcoderAWS();

        dd('moo');
         // $job = $elastcoder->getJob('1515772266459-6vkk7l');
         //
         // if(strtolower($job['Status']) == 'complete') {
         //     echo "complete";
         // } else {
         //     echo "error";
         // }

         $fileName = '1514976319-new-video.mp4';
         $ext = pathinfo($fileName, PATHINFO_EXTENSION);
         $watermark_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark.'.$ext;

         $config = [
                'PresetId' => '1516201655942-vaq9mu', //'1515758587625-jyon3x',
                'width'  => 1920,
                'height' => 1080,
                'aspect' => '16:9',
             'ext'	 => 'mp4',
             'PipelineId' => '1515757750300-4fybrt',
                'Watermarks' => [[
                        'PresetWatermarkId' => 'TopRight',
                        'InputKey'          => 'logo-sniffr-white.png'
                ]],
            ];

         $elastcoder = new ElastcoderAWS();
         $job = $elastcoder->transcodeVideo($fileName, $watermark_file, $config);

         echo $job['Id'];

         // if($job['Id']) {
         //     QueueVideoCheck::dispatch($job['Id'], $video->id);
         //         ->delay(now()->addMinutes(2));
         // }

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
}
