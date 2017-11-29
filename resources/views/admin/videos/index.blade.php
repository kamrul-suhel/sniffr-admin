@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/admin/css/sweetalert.css' }}">
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
				
				<article class="album">
					
					<header>
						
						<!--a href="{{ URL::to('video/') . '/' . $video->id }}" target="_blank"-->
							@if($key = $video->getKey())
							<div class="youtube-player" data-id="{{ $key }}"></div>
							@elseif(strpos($video->image,'http') === false)
							<img src="{{ Config::get('site.uploads_dir') . 'images/' . $video->image }}" />
							@else
							<img src="{{ $video->image }}" class="video-img" />
							@endif
						<!--/a>
						
						<a href="{{ URL::to('admin/videos/edit') . '/' . $video->id }}" class="album-options">
							<i class="entypo-pencil"></i>
							Edit
						</a-->
					</header>
					
					<section class="album-info">
						<h3><a href="{{ URL::to('admin/videos/edit') . '/' . $video->id }}"><?php if(strlen($video->title) > 25){ echo substr($video->title, 0, 25) . '...'; } else { echo $video->title; } ?></a></h3>
						
						<p>{{ $video->description }}</p>

						@if($video->state == 'new')
						<a href="{{ url('admin/videos/status/accepted/'.$video->id ) }}" class="btn btn-primary btn-success">Accept</a>
                    	<a href="{{ url('admin/videos/status/rejected/'.$video->id ) }}" class="btn btn-primary btn-danger">Reject</a>
						@elseif($video->state == 'pending')
						<a href="{{ url('admin/videos/status/licensed/'.$video->id ) }}" class="btn btn-primary btn-success">License</a>
                    	<a href="{{ url('admin/videos/status/restricted/'.$video->id ) }}" class="btn btn-primary btn-warning">Restricted</a>
                    	<a href="{{ url('admin/videos/status/problem/'.$video->id ) }}" class="btn btn-primary btn-danger">Problem</a>
                    	@endif
					</section>
					
					<footer>
						
						<div class="album-images-count">
							<i class="entypo-video"></i>
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

