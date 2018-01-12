<?php

namespace App\Libraries;

use App\Video;

use Illuminate\Support\Facades\Storage;

trait VideoHelper{

	public static function getVideoHTML($video, $embed = false) {
		$sHTML = '';

		$sHTML .= '<div id="video_container" class="fitvid">';
		if($embed){
			$sHTML .= '<iframe src="https://www.youtube.com/embed/'.$video->youtube_id.'?playsinline=1&rel=0" type="text/html" frameborder="0" allowfullscreen></iframe>';
		}elseif($video->youtube_id){
		    $sHTML .= '<div class="youtube-player" data-id="'.$video->youtube_id.'"></div>';
		}elseif(!empty($video->url)){
		    if (str_contains($video->url, 'youtube')){
		        $sHTML .= '<div class="youtube-player" data-id="'.$video->getKey().'"></div>';
		    }elseif (str_contains($video->url, 'vimeo')){
		        $sHTML .= '<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" width="100%" style="width:100%;"
		        data-setup=\'{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "{{ $video->url }}"}] }\'>
		        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
		        </video>';
		    }elseif (str_contains($video->url, 'facebook')){
		      	$sHTML .= '<div class="fb-video" data-href="'.$video->url.'" data-allowfullscreen="true"></div>';
		    }
		}elseif (!empty($video->file)){
			if($video->file_watermark) {
				$video->file = $video->file_watermark;
			}
		    $sHTML .= '<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="'.config('site.uploads_url').'images/'.$video->image.'" data-setup="{}" width="100%" style="width:100%;">
		        <source src="'.$video->file.'" type="video/mp4">
		        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
		    </video>';
		}elseif(!empty($video->embed_code)){
		    if (str_contains($video->embed_code, 'youtube')){
		        $sHTML .= '<div class="youtube-player" data-id="'.$video->getKey().'"></div>';
		    }else{
		        $sHTML .= $video->embed_code;
		    }
		}elseif(!empty($video->image)){
		    if(str_contains($video->image,'http')){
		        $sHTML .= '<img src="'.config('site.uploads_dir').'images/'.$video->image.'" />';
		    }else{
		        $sHTML .= '<img src="'.url('content/uploads/images/'.$video->image).'" class="video-img" />';
		    }
		}else{
		    $sHTML .= '<p>There seems to be an issue with this video</p>';
		}
		$sHTML .= '</div>';

		return $sHTML;
	}

	/**
	 * Generate a "random" alpha-numeric string.
	 *
	 * Should not be considered sufficient for cryptography, etc.
	 *
	 * @param  int  $length
	 * @return string
	 */
	public static function quickRandom($length = 10)
	{
	    $pool = '123456789bcdefghijklmnpqrstvwxyzBCDEFGHIJKLMNPQRSTVWXYZ';

	    $unique = substr(str_shuffle(str_repeat($pool, $length)), 0, $length);

	    // Check it doesn't exist
	    $result = Video::where('alpha_id', $unique)->get();

	    if(count($result)){
	    	return VideoHelper::quickRandom(10, true);
	    }else{
	    	return $unique;
	    }
	}
}
