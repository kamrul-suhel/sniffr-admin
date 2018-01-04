<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use Response;

use App\Download;
use App\Page;
use App\Menu;
use App\Video;
use App\Setting;
use App\Favorite;
use App\VideoCategory;
use App\PostCategory;

use App\Libraries\ThemeHelper;

use Illuminate\Support\Facades\Input;

class ThemeDownloadController extends Controller {

	public function __construct()
	{
		$this->middleware('auth');
	}

	// Add Media Like
	public function index($id){

        $authUser = Auth::user();
        if($authUser->role!='client'){
            return redirect()->home()->with(array('note' => 'Sorry but you do not have permission to download this video!', 'note_type' => 'error') );
        }

        $video = Video::where('alpha_id', $id)->first();

        if($video) {

        	$download = new Download;
        	$download->user_id = Auth::user()->id;
        	$download->video_id = $id;
        	$download->save();

            return Redirect::to($video->file);
        } else {
            return Redirect::to('/videos');
        }

    }

}
