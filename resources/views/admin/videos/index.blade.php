@extends('admin.master')

@section('content')
	<div class="admin-section-title">
		<div class="row">
			<div class="col-md-4">
				<h3><i class="fa fa-youtube-play"></i> {{ ucfirst($state) }} Videos</h3><a href="{{ url('admin/videos/create') }}" class="btn btn-success"><i class="fa fa-plus-circle"></i> Add New</a>
			</div>

			<form method="get" role="form" class="search-form-full">
				<div class="col-md-4">
					<div class="form-group">
						<select id="video_shottype_id" name="video_shottype_id">
							<option value="0">Shot Type</option>
							@foreach($video_shottypes as $shottype)
								<option value="{{ $shottype->id }}" @if(!empty($video->video_shottype_id) && $video->video_shottype_id == $shottype->id)selected="selected"@endif>{{ $shottype->name }}</option>
							@endforeach
						</select>
					</div> 
				</div>

				<div class="col-md-4">
					<div class="form-group"> 
						<input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i> 
					</div> 
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($videos))

		<p>Sorry, there are no videos to show.</p>

	@else

	<div class="gallery-env">
		<div class="row">

			@foreach($videos as $video)
			<div class="col-sm-6 col-md-4" id="video-{{ $video->id }}">
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
						{!! App\Libraries\VideoHelper::getVideoHTML($video) !!}

						<a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}" class="album-options">
							<i class="fa fa-pencil"></i>
							Edit
						</a>
					</header>

					<section class="album-info">
						<h3><a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}"><?php if(strlen($video->title) > 25){ echo substr($video->title, 0, 25) . '...'; } else { echo $video->title; } ?></a></h3>

						<p>{{ $video->description }}</p>
					</section>

					<footer>
						<div class="album-images-count">
							@if(!$video->trashed())
								@if($video->state == 'new')
								<a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}" class="text-success state" title="Accept Video"><i class="fa fa-check"></i></a>
		                    	<a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}" class="text-danger state" title="Reject Video"><i class="fa fa-times"></i></a>
								@elseif($video->state == 'pending')
								<a href="{{ url('admin/videos/status/licensed/'.$video->alpha_id ) }}" class="text-success state" title="License Video"><i class="fa fa-check"></i></a>
		                    	<a href="{{ url('admin/videos/status/restricted/'.$video->alpha_id ) }}" class="text-warning state" title="Restricted License Video"><i class="fa fa-exclamation-triangle"></i></a>
		                    	<a href="{{ url('admin/videos/status/problem/'.$video->alpha_id ) }}" class="text-danger state" title="Problem Video"><i class="fa fa-times"></i></a>
								@elseif($video->state == 'licensed')
								<i class="fa fa-check"></i> Licensed
								@elseif($video->state == 'accepted')
								<i class="fa fa-clock-o"></i> More details sent: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }}
								@elseif($video->state == 'rejected')
								<i class="fa fa-times"></i> Rejected
								@elseif($video->state == 'problem')
								<i class="fa fa-exclamation"></i> Problem
								@elseif($video->state == 'restricted')
									@if($video->type == 'nonex')
									<i class="fa fa-exclamation-triangle"></i> Restricted
									<i class="fa fa-times-circle"></i> Non-Exclusive
									@else
									<i class="fa fa-exclamation-triangle"></i> Restricted
									@endif
								@else
								<i class="fa fa-youtube-play"></i> {{ ucfirst($video->state) }}
								@endif
							@endif
						</div>

						<div class="album-options">
							@if($video->trashed())
							<a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Remove from trash" class="undelete">
								<i class="fa fa-upload"></i>
							</a>
							@else
							<a href="{{ url('admin/videos/edit/'.$video->alpha_id) }}">
								<i class="fa fa-pencil"></i>
							</a>
							<a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video" class="delete">
								<i class="fa fa-trash-o"></i>
							</a>
							@endif
						</div>
					</footer>
				</article>
			</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $videos->appends(Request::only('s'))->render(); ?></div>

		</div>
	</div>

	@endif

	@section('javascript')
	<script>

		(function($){
			$('.delete').click(function(e){
				e.preventDefault();
				var delete_link = $(this).attr('href');
				swal({   title: "Are you sure?",   text: "Do you want to permanantly delete this video?",   icon: "warning",   buttons: true,  closeModal: false });

				if(delete_link) {
					$.ajax({
					    type: 'GET',
					    url: delete_link,
					    dataType: 'json',
					    success: function (data) {
							if(data.status=='success') {
								$('#video-'+data.video_id).fadeOut();
								swal({  title: data.message, icon: 'success', buttons: true, closeModal: true });
								$('.swal-button-container').css('display','inline-block');
							} else {
								$('.swal-button-container').css('display','inline-block');
							}
					    }
					});
				}
			});

			$('.state').click(function(e){
				e.preventDefault();
				var dataUrl = $(this).attr('href');
				var parseUrl = dataUrl.split('/');
				var state = parseUrl[6];
				var videoId = parseUrl[7];
				var alertType;

				swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true });
				$('.swal-button-container').css('display','none');

				if(dataUrl) {
					$.ajax({
					    type: 'GET',
					    url: dataUrl,
					    data: { get_param: 'value' },
					    dataType: 'json',
					    success: function (data) {
							console.log(data);
							if(data.status=='success') {
								$('#video-'+videoId).fadeOut();
								switch(state) {
									case 'accepted':
										alertType = 'success';
										break;
									case 'rejected':
										alertType = 'error';
										break;
									case 'licensed':
										alertType = 'success';
										break;
									case 'restricted':
										alertType = 'warning';
										break;
									case 'problem':
										alertType = 'error';
										break;
									default:
										alertType = 'success';
								}
								swal({  title: data.message, icon: alertType, buttons: true, closeModal: true });
								$('.swal-button-container').css('display','inline-block');
							} else {
								$('.swal-button-container').css('display','inline-block');
							}
					    }
					});
				}
			});

		})(jQuery);

	</script>
	@stop
	@include ('partials.videojs')

@stop
