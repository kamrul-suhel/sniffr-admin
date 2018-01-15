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
use Illuminate\Support\Facades\Storage;

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

        if($video && $video->file) {
        	$download = new Download;
        	$download->user_id = Auth::user()->id;
            $download->client_id = Auth::user()->client_id;
        	$download->video_id = $video->id;
        	$download->save();

            $file = $video->file_watermark ? $video->file_watermark : $video->file;

            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=" . basename($file));
            header("Content-Type: " . $video->mime);

            return readfile($file);
        } else {
            return Redirect::to('/videos');
        }
    }
}
