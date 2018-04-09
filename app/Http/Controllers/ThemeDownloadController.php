<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\Download;
use App\Video;

class ThemeDownloadController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

    public function index($id, $type = 'watermark')
    {
        $authUser = Auth::user();
        if ($authUser->role == 'client' && $type == 'regular') {
            return redirect()->home()->with(array('note' => 'Sorry but you do not have permission to download this video!', 'note_type' => 'error'));
        }

        $video = Video::where('alpha_id', $id)->first();

        if($video && $video->file) {
        	$download = new Download;
        	$download->user_id = Auth::user()->id;
            $download->client_id = (Auth::user()->client_id ? Auth::user()->client_id : 0);
        	$download->video_id = $video->id;
			$download->type = $type;
        	$download->save();

			if($type=='regular'){
				$file = $video->file;
			} else {
				$file = $video->file_watermark;
			}

            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=" . basename($file));
            header("Content-Type: " . $video->mime);

            return readfile($file);
        }
        return Redirect::to('/videos');
    }
}
