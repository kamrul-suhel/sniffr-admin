<?php

namespace App\Libraries;

use App\Video;
use Thujohn\Twitter\Facades\Twitter;

use Illuminate\Support\Facades\Storage;

trait VideoHelper{

	public static function getVideoHTML($video, $embed = false) {
		$sHTML = '';

		$sHTML .= '<div class="fitvid video-container'.(  $embed && !$video->youtube_id ? ' embedded' : '').'">';
		
		if($video->youtube_id){ // Youtube
			if($embed){
				$sHTML .= '<iframe src="https://www.youtube.com/embed/'.$video->youtube_id.'?playsinline=1&rel=0" class="youtube-iframe" type="text/html" frameborder="0" allowfullscreen></iframe>';
			}else{
				$sHTML .= '<div class="youtube-player" data-id="'.$video->youtube_id.'"></div>';
			}
		}else if(!empty($video->file)){
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
		}else if(!empty($video->url)){
		   	if(str_contains($video->url, 'facebook')){
				if(str_contains($video->url, 'posts') && $embed){
		    		$sHTML .= '<div class="interactive interactive-fb-post" style="background:#000 !important;text-align:center;">
							<div id="fb-root"></div>
							<script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>
		               	<div class="fb-post" data-href="'.$video->url.'" data-width="165"></div>';
		    	}else if(str_contains($video->url, 'videos')){
					if($video->vertical === 0 || $embed) {
						$sHTML .= '<div class="fb-video" data-href="'.$video->url.'" data-allowfullscreen="true"></div>';
					} else if($video->image && str_contains($video->image,'http')){
						$sHTML .= '<div class="video-thumb" style="background-image:url('.$video->image.')"></div>';
					} else {
						$sHTML .= '<p><a href="'.$video->url.'" target="_new">'.$video->url.'</a></p>';
					}
		    	}else{
					$sHTML .= '<p><a href="'.$video->url.'" target="_new">'.$video->url.'</a></p>';
				}		
			}else if(str_contains($video->url, 'twitter')){
				if($embed){
					preg_match('#status\/([\d^]+)#', $video->url, $matches);

					if(isset($matches[1])){
						$sHTML .= '<div class="tweet" id="'.$matches[1].'"></div>';
					} else {
						$sHTML .= '<p align="center">Cannot find a valid Tweet</p>';
					}
				}else{
					$sHTML .= '<div class="video-thumb" style="background-image:url('.$video->image.')"></div>';
				}
			}else if(str_contains($video->url, 'instagram')){
				if($embed){
					$sHTML .= $video->embed_code;
				}else{
					$sHTML .= '<div class="video-thumb" style="background-image:url('.$video->image.')"></div>';
				}
			}else if(str_contains($video->url, 'vimeo')){
		        $sHTML .= '<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" width="100%" style="width:100%;"
		        data-setup=\'{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "'.$video->url.'"}] }\'>
		        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
		        </video>';
		    }else if(str_contains($video->url, 'imgur')){
				$sHTML .= '<img src="'.$video->url.'">';
			}else if($embed && str_contains($video->url, 'vine.co')){
				$sHTML .= '<iframe src="'.$video->url.'embed/simple" class="vine-embed" type="text/html" width="600" height="600" frameborder="0" allowfullscreen></iframe>
				<script async src="//platform.vine.co/static/scripts/embed.js"></script>';
			}else if($embed && str_contains($video->url, 'streamable')){
				$sHTML .= '<blockquote class="embedly-card"><h4><a href="'.$video->url.'"></a></h4></blockquote>
				<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>';
			}else{
				$sHTML .= '<p><a href="'.$video->url.'" target="_new">'.$video->url.'</a></p>';
			}
		}else if(!empty($video->embed_code)){
		    if (str_contains($video->embed_code, 'youtube')){
		        $sHTML .= '<div class="youtube-player" data-id="'.$video->getKey().'"></div>';
		    }else{
		        $sHTML .= $video->embed_code;
		    }
		}else if(!empty($video->image)){
		    if(str_contains($video->image,'http')){
		    	$sHTML .= '<div class="video-thumb" style="background-image:url('.$video->image.')"></div>';
		    }else{
		        $sHTML .= '<img src="'.url('content/uploads/images/'.$video->image).'" class="video-img" />';
		    }
		}else{
		    $sHTML .= '<p>There seems to be an issue with this video</p>';
		}
		$sHTML .= '</div>';

		return $sHTML;
	}

	public static function videoLinkChecker($url){
		$url = rtrim($url);
		$linkVars = ['image' => false,'thumb' => false,'vertical' => NULL, 'youtube_id' => '', 'url' => $url, 'embed_code' => ''];
		$youtubeId = false;

		if(str_contains($url, 'facebook')){ // Is Facebook
			if(str_contains($url, 'videos')){
				$fb_vertical = NULL;
				preg_match('#videos\/([\d^]+)#', $url, $matches);

				if(isset($matches[1])) {
					if ($data = @getimagesize('https://graph.facebook.com/'.$matches[1].'/picture')) { //check if facebook image file exists
						if ($data[0] <= $data[1]) { //if orientation is landscape/portrait
							$fb_vertical = 1;
						}else{
							$fb_vertical = 0;
						}

						$linkVars['image'] = 'https://graph.facebook.com/'.$matches[1].'/picture';
						$linkVars['thumb'] = 'https://graph.facebook.com/'.$matches[1].'/picture';
					}
				}

				$linkVars['vertical'] = $fb_vertical;
			}
		}else if(str_contains($url, 'twitter.com')){
			preg_match('#status\/([\d^]+)#', $url, $matches);

			if(isset($matches[1])){
				try{
					$tweet = Twitter::getTweet($matches[1]);

					if(isset($tweet->entities->media[0])){
						$linkVars['image'] = $tweet->entities->media[0]->media_url_https;
						$linkVars['thumb'] = $tweet->entities->media[0]->media_url_https;
					}
				}catch(Exception $e){
					return $e->getMessage();
				}
			}
		}else if(str_contains($url, 'youtu')){
			$youtubeId = VideoHelper::getYoutubeID($url); 

			if($youtubeId){
				$linkVars['youtube_id'] = $youtubeId;
				$linkVars['image'] = 'https://img.youtube.com/vi/'.$youtubeId.'/hqdefault.jpg';
				$linkVars['thumb'] = 'https://img.youtube.com/vi/'.$youtubeId.'/default.jpg';
			}
		}else if(str_contains($url, 'instagram')){
			$url = 'https://api.instagram.com/oembed/?url='.$url;

			try {
				$curl_connection = curl_init($url);
				curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
				curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
				
				//Data are stored in $data
				$data = json_decode(curl_exec($curl_connection), true);
				curl_close($curl_connection);

				if($data){
					$linkVars['image'] = $data['thumbnail_url'];
					$linkVars['thumb'] = $data['thumbnail_url'];
					$linkVars['embed_code'] = $data['html'];
				}
			}catch(Exception $e){
				return $e->getMessage();
			}
		}else if(str_contains($url, 'imgur') && str_contains($url, '.gifv')){
			$withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $url);
			$linkVars['image'] = $withoutExt.'.jpg';
			$linkVars['thumb'] = $withoutExt.'.jpg';
			$linkVars['url'] = '';
			$linkVars['embed_code'] = '<video poster="'.$withoutExt.'.jpg" preload="auto" autoplay="autoplay" muted="muted" loop="loop" webkit-playsinline="">
                <source src="'.$withoutExt.'.mp4" type="video/mp4">
            </video>';
		}

		$linkVars['image'] = $linkVars['image'] ? $linkVars['image'] : '/assets/img/placeholder.png';
		$linkVars['thumb'] = $linkVars['thumb'] ? $linkVars['thumb'] : '/assets/img/placeholder.png';

		return $linkVars;
	}

    public static function getYoutubeID($url)
    {
    	$key = false;

        if(!empty($url)){
        	preg_match('#\?v\=([^\&]+)#', $url, $matches);

        	$key = isset($matches[1]) ? $matches[1] : false;

    		if(!$key){
        		$bits = explode('/', rtrim($url, '/'));
        		$key = array_pop($bits);
        	}
        }

        return $key;
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
