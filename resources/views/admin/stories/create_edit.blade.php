@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb"> <li> <a href="/admin/stories"><i class="fa fa-newspaper-o"></i>All Stories</a> </li> <li class="active">@if(!empty($story->id)) <strong>{{ $story->title }}</strong> @else <strong>New Story</strong> @endif</li> </ol>

	<div class="admin-section-title">
	@if(!empty($story->id))
		<h3>{{ $story->title }}</h3>
	@else
		<h3><i class="fa fa-plus"></i> Add New Story</h3>
	@endif
	</div>
	<div class="clear"></div>

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

		<div class="row">

			<div class="@if(!empty($story->created_at)) col-sm-6 @else col-sm-8 @endif">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Story Title</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>
					<div class="panel-body" style="display: block;">
						<?php if($errors->first('title')): ?>
						<div class="alert alert-danger">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> <strong>Oh snap!</strong>
							<?= $errors->first('title'); ?>
						</div>
						<?php endif; ?>

						<p>Add the story title in the textbox below:</p>
						<input type="text" class="form-control" name="title" id="title" placeholder="Story Title" value="@if(!empty($story->title)){{ $story->title }}@endif" />
					</div>
				</div>

			</div>

			<div class="col-sm-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Assets</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<select name="assets[]" id="assets" class="form-control" multiple>
							@if(!empty($videos))
								@foreach($videos as $video)
									<option value="{{ $video->id }}">{{ $video->title }}</option>
								@endforeach
							@endif
						</select>

					</div>
				</div>
			</div>

		</div>

		@if(isset($story->id))
			<input type="hidden" id="id" name="id" value="{{ $story->id }}" />
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />
	</form>

	<div class="clear"></div>
</div>




	@section('javascript')

	<script type="text/javascript">

	$ = jQuery;

	$(document).ready(function(){

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
