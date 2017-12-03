@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/admin/css/sweetalert.css' }}">
	<link rel="stylesheet" href="{{ '/content/themes/default/assets/css/video-js.css' }}" />
	<style>
	.gallery-env article.album header {
		padding-bottom: 0;
	}
	</style>
@endsection

@section('content')

	<div class="admin-section-title">
		<div class="row">
			<div class="col-md-8">
				<h3><i class="entypo-video"></i> {{ ucfirst($state) }} Videos</h3><a href="{{ URL::to('admin/videos/create') }}" class="btn btn-success"><i class="fa fa-plus-circle"></i> Add New</a>
			</div>
			<div class="col-md-4">
				<form method="get" role="form" class="search-form-full"> <div class="form-group"> <input type="text" class="form-control" value="<?= old('s'); ?>" name="s" id="search-input" placeholder="Search..."> <i class="entypo-search"></i> </div> </form>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<div class="gallery-env">

		<div class="row">

		@foreach($videos as $video)

			<div class="col-sm-6 col-md-4">
				<?php
				switch($video->state){
					case 'rejected':
					case 'problem':
						$panelColour = 'danger';
						break;
					case 'licensed':
					case 'restricted':
						$panelColour = 'success';
						break;
					default:
						$panelColour = 'default';
				}
				?>
				<article class="album {{ $panelColour }}">

					<header>

						@if(!empty($video->url))
							@if (str_contains($video->url, 'youtube'))
								<div id="video_container" class="fitvid" style="padding-top:0px;">
									<div class="youtube-player" data-id="{{ $key = $video->getKey() }}"></div>
								</div>
							@elseif (str_contains($video->url, 'vimeo'))
								<div id="video_container" class="fitvid" style="padding-top:0px;">
									<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" width="100%" style="width:100%;"
								    data-setup='{ "techOrder": ["vimeo"], "sources": [{ "type": "video/vimeo", "src": "{{ $video->url }}"}] }'>
										<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
								  </video>
								</div>
							@endif
						@elseif (!empty($video->file))
							<div id="video_container" class="fitvid" style="padding-top:0px;">
								<video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" poster="<?= Config::get('site.uploads_url') . 'images/' . $video->image ?>" data-setup="{}" width="100%" style="width:100%;">
									<source src="{{ $video->file }}" type='video/mp4'>
									<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
								</video>
							</div>
						@elseif (!empty($video->embed_code))
							<div id="video_container" class="fitvid" style="padding-top:0px;">
              @if(strpos($video->image,'http') === false)
              <img src="{{ Config::get('site.uploads_dir') . 'images/' . $video->image }}" />
              @else
              <img src="{{ $video->image }}" class="video-img" />
              @endif
							</div>
						@else
							<div id="video_container" class="fitvid" style="padding-top:0px;">
								<p>There seems to be an issue with this video</p>
							</div>
						@endif

						<a href="{{ URL::to('admin/videos/edit') . '/' . $video->id }}" class="album-options">
							<i class="entypo-pencil"></i>
							Edit
						</a-->
					</header>

					<section class="album-info">
						<h3><a href="{{ URL::to('admin/videos/edit') . '/' . $video->id }}"><?php if(strlen($video->title) > 25){ echo substr($video->title, 0, 25) . '...'; } else { echo $video->title; } ?></a></h3>

						<p>{{ $video->description }}</p>
					</section>

					<footer>

						<div class="album-images-count">
							@if($video->state == 'new')
							<a href="{{ url('admin/videos/status/accepted/'.$video->id ) }}" class="text-success" title="Accept Video"><i class="entypo-check"></i></a>
	                    	<a href="{{ url('admin/videos/status/rejected/'.$video->id ) }}" class="text-danger" title="Reject Video"><i class="fa fa-times"></i></a>
							@elseif($video->state == 'pending')
							<a href="{{ url('admin/videos/status/licensed/'.$video->id ) }}" class="text-success" title="License Video"><i class="entypo-check"></i></a>
	                    	<a href="{{ url('admin/videos/status/restricted/'.$video->id ) }}" class="text-warning" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
	                    	<a href="{{ url('admin/videos/status/problem/'.$video->id ) }}" class="text-danger" title="Problem Video"><i class="fa fa-times"></i></a>
							@else
							<i class="entypo-video"></i> {{ $video->state == 'accepted' ? 'More details sent: '.\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->created_at)->diffForHumans() : ucfirst($video->state) }}
							@endif
						</div>

						<div class="album-options">
							<a href="{{ URL::to('admin/videos/edit') . '/' . $video->id }}">
								<i class="entypo-pencil"></i>
							</a>

							<a href="{{ URL::to('admin/videos/delete') . '/' . $video->id }}" class="delete">
								<i class="entypo-trash"></i>
							</a>
						</div>

					</footer>

				</article>

			</div>

		@endforeach

		<div class="clear"></div>

		<div class="pagination-outter"><?= $videos->appends(Request::only('s'))->render(); ?></div>

		</div>

	</div>


	@section('javascript')
	<script src="{{ '/application/assets/admin/js/sweetalert.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/content/themes/default/assets/js/video.js' }}"></script>
	<script type="text/javascript" src="{{ '/content/themes/default/assets/js/videojs-vimeo.js' }}"></script>

	<!-- RESIZING FLUID VIDEO for VIDEO JS -->
	<script type="text/javascript">
	  // Once the video is ready

		var massVideo = $('.video-js');
		for(var i = 0; i < massVideo.length; i++){
		  videojs(massVideo[i]).ready(function(){

		    var myPlayer = this;    // Store the video object
		    var aspectRatio = 9/16; // Make up an aspect ratio

		    function resizeVideoJS(){
		    	console.log(myPlayer.id);
		      // Get the parent element's actual width
		      var width = document.getElementById('video_container').offsetWidth;
		      // Set width to fill parent element, Set height
		      myPlayer.width(width).height( width * aspectRatio );
		    }

		    resizeVideoJS(); // Initialize the function
		    window.onresize = resizeVideoJS; // Call the function on resize
		  });
		}
	</script>
	<script>

		$(document).ready(function(){
			var delete_link = '';

			$('.delete').click(function(e){
				e.preventDefault();
				delete_link = $(this).attr('href');
				swal({   title: "Are you sure?",   text: "Do you want to permanantly delete this video?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){    window.location = delete_link });
			    return false;
			});
		});

	</script>

	@stop

@stop
