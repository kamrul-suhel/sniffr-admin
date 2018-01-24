<?php

namespace App\Libraries;

use App\Video;

use Illuminate\Support\Facades\Storage;

trait VideoHelper{

	public static function getVideoHTML($video, $embed = false) {

		// FB vertical is buggering everything, need to check for it
		$contain_vid = str_contains($video->url, 'facebook') && str_contains($video->url, 'posts') && $embed ? '' :  ' id="video_container" class="fitvid"';

		$sHTML = '';

		$sHTML .= '<div'.$contain_vid.'>';
		if($embed){
			$sHTML .= '<iframe src="https://www.youtube.com/embed/'.$video->youtube_id.'?playsinline=1&rel=0" type="text/html" frameborder="0" allowfullscreen></iframe>';
		}elseif($video->youtube_id){
		    $sHTML .= '<div class="youtube-player" data-id="'.$video->youtube_id.'"></div>';
		}elseif(!empty($video->url)){
		    if (str_contains($video->url, 'youtube')||str_contains($video->url, 'youtu')){
		        $sHTML .= '<div class="youtube-player" data-id="'.$video->getKey().'"></div>';
		    }elseif (str_contains($video->url, 'vimeo')){
		        $sHTML .= '<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" width="100%" style="width:100%;"
		        data-setup=\'{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "'.$video->url.'"}] }\'>
		        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
		        </video>';
		    }elseif(str_contains($video->url, 'facebook')){
		    	if(str_contains($video->url, 'videos')){
		    		$sHTML .= '<div class="fb-video" data-href="'.$video->url.'" data-allowfullscreen="true"></div>';
		    	}else{
		    		$sHTML .= '<div class="interactive interactive-fb-post" style="background:#000 !important;text-align:center;">
								<div id="fb-root"></div>
								<script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>
				<div class="fb-post" data-href="'.$video->url.'" data-width="165"></div>';
		    		//$sHTML .= '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fatomant99%2Fvideos%2F10213604653564605%2F&show_text=0&width=444" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';

		    	}
			}elseif(str_contains($video->url, 'instagram')){

					if (strpos($_SERVER['REQUEST_URI'],'admin/videos/edit') !== false) {
						$sHTML .= '<iframe src="'.(str_contains($video->url, '/embed') ? $video->url :  $video->url.'embed').'" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
						$sHTML .= '<style>#video_container iframe, #video_container object, #video_container embed { width:auto !important; height:500px; overflow:visible; } iframe { height:500px; }</style>';
					} else {
						$sHTML .= '<a href="/admin/videos/edit/'.$video->alpha_id.'"><img src="'.$video->url.'media/?size=l" border="0" onerror="this.src=\'/content/uploads/images/placeholder.gif\'"></a>';
					}

					// $sHTML .= '<blockquote class="instagram-media" data-instgrm-captioned="false" data-instgrm-version="7" style="margin-top:100px !important;"><a href="'.$video->url.'"></a></blockquote>';
					// $sHTML .= '<script async defer src="//platform.instagram.com/en_US/embeds.js"></script>';

		    }
		}elseif (!empty($video->file)){
			if($video->file_watermark_dirty) {
				$video->file = $video->file_watermark_dirty;
			} else {
				if($video->file_watermark) {
					$video->file = $video->file_watermark;
				}
			}
			if(strpos($video->image,'http') === false) {
				$video->image = config('site.uploads_url').'images/'.$video->image;
			}
		    $sHTML .= '<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="'.$video->image.'" data-setup="{}" width="100%" style="width:100%;">
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
