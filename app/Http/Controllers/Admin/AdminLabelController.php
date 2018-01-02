<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\Label;

use App\Libraries\ThemeHelper;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
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

         // get file name of video, strip out and create search index
         $search_value = Input::get('f');
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
             foreach ($labels as $label){
                 echo $label['Name'].'['.round($label['Confidence'],0).']<br />';
             }
         }
     }

}
