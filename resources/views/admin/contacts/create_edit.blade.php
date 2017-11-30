@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/js/tagsinput/jquery.tagsinput.css' }}" />
@stop


@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li><a href="/admin/contacts"><i class="fa fa-newspaper-o"></i>All Contacts</a></li>
		<li class="active"><strong><{{ !empty($contact->id) ? $contact->first_name : 'New Contact' }}</strong></li>
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

				<div class="col-sm-3">

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

				<div class="col-sm-3">

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
							<div class="panel-title">Video Name</div>
							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">

							<select name="video_id" id="video_id" class="form-control">
								<option value="">Please select</option>
								@foreach($videos as $video)
									<option value="{{ $video->id }}"{{ isset($contact) && $contact->id == $video->contact_id ? " selected" : "" }}>{{ $video->title }}</option>
								@endforeach
							</select>
						</div>

					</div>

				</div>

			</div>

			<div class="row">

				<div class="col-sm-3">

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

				<div class="col-sm-3">

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

				<!-- <div class="col-sm-3">

					<div class="panel panel-primary" data-collapsed="0">

						<div class="panel-heading">
							<div class="panel-title">Video Name</div>
							<div class="panel-options">
								<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
							</div>
						</div>

						<div class="panel-body" style="display: block;">
							<p>Select a video in the dropdown below:</p>
							<select name="video_id" id="video_id" class="form-control">
								<option value="">Please select</option>
								@foreach($videos as $video)
									<option value="{{ $video->id }}"{{ isset($contact) && $contact->id == $video->contact_id ? " selected" : "" }}>{{ $video->title }}</option>
								@endforeach
							</select>
						</div>

				</div> -->

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
