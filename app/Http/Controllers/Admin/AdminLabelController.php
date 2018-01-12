<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use FFMpeg;
use Dumpk\Elastcoder\ElastcoderAWS;

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

use App\Http\Controllers\Controller;

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
         $files = Label::whereIn('frame', $search)
         ->get();

         // create array with all labels obtained through image analysis
         $labels = array();
         $count = 0;
         foreach ($files as $file) {
             $temps = $file->labels;
             foreach ($temps as $temp){
                 if (!in_array($temp['Name'], $blacklist)) {
                     if($temp['Confidence']>92) {
                         $labels[$count]['Name'] = $temp['Name'];
                         $labels[$count]['Confidence'] = $temp['Confidence'];
                         $count++;
                     }
                 }
             }
         }

         // remove duplicates and order labels array by confidence
         $labels = super_unique($labels,'Name');

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

         //NOT CURRENTLY USED (moves video file to folder for analysis)
         $video_value = Input::get('f');
         $disk = Storage::disk('s3_sourcebucket');
         if($disk->has($video_value)==1){
             $disk->move(''.$video_value, 'videos/a83d0c57-605a-4957-bebc-36f598556b59/'.$video_value);
             return response()->json(['status' => 'success', 'message' => 'Successfully copied the file.']);
         } else {
             return response()->json(['status' => 'fail', 'message' => 'No file found.']);
         }

     }

     public function makeWatermark() {

         $fileName = '1515692707-annoying-drunks.MOV';
         $ext = pathinfo($fileName, PATHINFO_EXTENSION);
         $watermark_file = substr($fileName, 0, strrpos($fileName, '.')).'-watermark.'.$ext;

         $config = [
                'PresetId' => '1515758587625-jyon3x',
                'width'  => 1920,
                'height' => 1080,
                'aspect' => '16:9',
            	'ext'	 => 'mp4',
            	'PipelineId' => '1515757750300-4fybrt',
                'Watermarks' => [[
                        'PresetWatermarkId' => 'TopRight',
                        'InputKey'          => 'logo-unilad-white.png'
                ]],
            ];

         $elastcoder = new ElastcoderAWS();
         $job = $elastcoder->transcodeVideo($fileName, $watermark_file, $config);

         //$temp = Storage::disk('s3')->setVisibility($watermark_file, 'public');

         dd($job);

     }

     public function makeWatermark2() {

         // FFMpeg
         $file = '1515606869-ian_phone.mp4';
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

         if($video_width>700) {
             $logo_watermark = 'logo-unilad-watermark.png';
         } else {
             $logo_watermark = 'logo-unilad-watermark-small.png';
         }

         $watermark_filter = new \FFMpeg\Filters\Video\WatermarkFilter(public_path('content/uploads/settings/'.$logo_watermark), array(
            'position' => 'relative',
            'bottom' => 35,
            'right' => 30,
         ));

         $watermark->addFilter($watermark_filter)
             ->export()
             ->inFormat(new \FFMpeg\Format\Video\X264('libmp3lame'))
             ->save($watermark_file);

         // $watermark->gif(FFMpeg\Coordinate\TimeCode::fromSeconds(2), new FFMpeg\Coordinate\Dimension(360, 200), 3)
         //     ->save('assets/img/tmp/'.$gif_file);

         // $url = Storage::disk('s3')->temporaryUrl( //used for making public for set period
         //     $watermark_file, now()->addMinutes(25)
         // );

         if(Storage::disk('s3')->exists($watermark_file)) {
             echo $watermark_file;
         } else {
             echo 'No found.';
         }

     }

}
