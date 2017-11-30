@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/js/tagsinput/jquery.tagsinput.css' }}" />
	<link rel="stylesheet" href="{{ '/content/themes/default/assets/css/video-js.css' }}" />
@stop


@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li> <a href="/admin/contacts"><i class="fa fa-newspaper-o"></i>All Contacts</a></li>
		<li class="active">@if(!empty($contact->id)) <strong>{{ $contact->first_name.' '.$contact->last_name }}</strong> @else <strong>New Contact</strong> @endif</li>
	</ol>

	<div class="admin-section-title">
	@if(!empty($contact->id))
		<h3>{{ $contact->first_name.' '.$contact->last_name }}</h3>
	@else
		<h3><i class="entypo-plus"></i> Add New Contact</h3>
	@endif
	</div>

	<div class="clear"></div>

		<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

			<div class="row">

				<div class="col-sm-6">

					<div class="row">

						<div class="col-sm-6">

							<div class="panel panel-primary" data-collapsed="0">
								<div class="panel-heading">
									<div class="panel-title">First Name</div>
									<div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div>
								</div>
								<div class="panel-body" style="display: block;">
									<p>Add first name in the textbox below:</p>
									<input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" value="@if(!empty($contact->first_name)){{ $contact->first_name }}@endif" />
								</div>
							</div>

						</div>

						<div class="col-sm-6">

							<div class="panel panel-primary" data-collapsed="0">
								<div class="panel-heading">
									<div class="panel-title">Last Name</div>
									<div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div>
								</div>
								<div class="panel-body" style="display: block;">
									<p>Add last name in the textbox below:</p>
									<input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" value="@if(!empty($contact->last_name)){{ $contact->last_name }}@endif" />
								</div>
							</div>

						</div>

						<div class="col-sm-6">

							<div class="panel panel-primary" data-collapsed="0">
								<div class="panel-heading">
									<div class="panel-title">Email Address</div>
									<div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div>
								</div>
								<div class="panel-body" style="display: block;">
									<p>Add email address in the textbox below:</p>
									<input type="text" class="form-control" name="email" id="email" placeholder="Email Address" value="@if(!empty($contact->email)){{ $contact->email }}@endif" />
								</div>
							</div>

						</div>

						<div class="col-sm-6">

							<div class="panel panel-primary" data-collapsed="0">
								<div class="panel-heading">
									<div class="panel-title">Telephone Number</div>
									<div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div>
								</div>
								<div class="panel-body" style="display: block;">
									<p>Add telephone number in the textbox below:</p>
									<input type="text" class="form-control" name="tel" id="tel" placeholder="Telephone Number" value="@if(!empty($contact->tel)){{ $contact->tel }}@endif" />
								</div>
							</div>

						</div>

					</div>

				</div>

				<div class="col-sm-6">

					<div class="row">

						<div class="col-sm-12">

							@if(isset($contact->videos))
							<div class="panel panel-primary" data-collapsed="0">

								<div class="panel-heading">
									<div class="panel-title">Video Name</div>
									<div class="panel-options">
										<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
									</div>
								</div>

								<div class="panel-body" style="display: block;">

										@foreach ($videos as $video)
										<p>{{ $video->title }}</p>
										<div id="video_container" class="fitvid">
										<?php if($key = $video->getKey()): ?>
											<iframe width="560" height="315" src="https://www.youtube.com/embed/<?php echo $key; ?>" frameborder="0" allowfullscreen></iframe>
										<?php elseif($video->url): ?>
											<h1>We need to handle videoi urls (that aren't youtube)</h1>
										<?php elseif($video->embed_code): ?>
											<?= $video->embed_code ?>
										<?php elseif($video->file): ?>
											<video id="video_player" class="video-js vjs-default-skin" controls preload="auto" poster="<?= Config::get('site.uploads_url') . 'images/' . $video->image ?>" data-setup="{}" width="100%" style="width:100%;">
												<source src="<?php echo $video->file; ?>" type='video/mp4'>
												<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
											</video>
										<?php endif; ?>
										</div>
										@endforeach

								</div>

							</div>
							@endif

						</div>

					</div>

				</div>

			</div>


			@if(isset($contact->id))
				<input type="hidden" id="id" name="id" value="{{ $contact->id }}" />
			@endif

			<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
			<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		</form>

		<div class="clear"></div>
<!-- This is where now -->
</div>




	@section('javascript')


	<script type="text/javascript" src="{{ '/application/assets/admin/js/tinymce/tinymce.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/application/assets/js/jquery.mask.min.js' }}"></script>

	@if(isset($contact->videos))
	<script type="text/javascript" src="{{ '/content/themes/default/assets/js/video.js' }}"></script>

	<!-- RESIZING FLUID VIDEO for VIDEO JS -->
	<script type="text/javascript">
	  // Once the video is ready
	  _V_("video_player").ready(function(){

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
	</script>
	@endif

	<script type="text/javascript">

	$ = jQuery;

	$(document).ready(function(){

		function slugify(text) {
		  return text.toString().toLowerCase()
		    .replace(/\s+/g, '-')           // Replace spaces with -
		    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
		    .replace(/^-+/, '')             // Trim - from start of text
		    .replace(/-+$/, '');            // Trim - from end of text
		}

		$('#name').on('input', function() {
		    $('#slug').val(slugify($('#name').val()));
		});

		$('#duration').mask('00:00:00');

		$('input[type="checkbox"]').change(function() {
			if($(this).is(":checked")) {
		    	$(this).val(1);
		    } else {
		    	$(this).val(0);
		    }
		    console.log('test ' + $(this).is( ':checked' ));
		});

		tinymce.init({
			relative_urls: false,
		    selector: '#body',
		    toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor | code",
		    plugins: [
		         "advlist autolink link image code lists charmap print preview hr anchor pagebreak spellchecker code fullscreen",
		         "save table contextmenu directionality emoticons template paste textcolor code"
		   ],
		   menubar:false,
		 });

	});



	</script>

	@stop

@stop
