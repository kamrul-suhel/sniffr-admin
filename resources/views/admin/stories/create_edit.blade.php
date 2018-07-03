@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb"> <li> <a href="/admin/stories"><i class="fa fa-tasks"></i> Stories</a> </li> <li class="active">@if(!empty($story->id)) <strong>{{ $story->title }}</strong> @else <strong>New Story</strong> @endif</li> </ol>

	<!-- <div class="admin-section-title" style="background:#1976d2;color:#fff;">
		<p>This feature is currently in development (please be gentle).</p>
	</div> -->

	<div class="admin-section-title">
	@if(empty($story->id))
		<h3><i class="fa fa-plus"></i> Add New Story</h3>
	@endif
	</div>
	<div class="admin-section-title" style="color">
		<p></p>
	</div>
	<div class="clear"></div>

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

		<div class="row">

			<div class="col-sm-6">

				<div class="row">

					<div class="col-sm-12">

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

								<input type="text" class="form-control" name="title" id="title" placeholder="Story Title" value="@if(!empty($story->title)){{ $story->title }}@endif" @if(isset($story)) @if(in_array($story->state, config('stories.decisions.writing'))||in_array($story->state, config('stories.decisions.subbing'))) disabled @endif @endif />
							</div>
						</div>

					</div>

					<div class="col-sm-12">

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Description</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<textarea class="form-control" name="description" id="description">@if(!empty($story->description)){{ htmlspecialchars($story->description) }}@endif</textarea>
							</div>
						</div>

					</div>

					<div class="col-sm-12">

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Notes</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<textarea class="form-control" name="excerpt" id="excerpt">@if(!empty($story->excerpt)){{ htmlspecialchars($story->excerpt) }}@endif</textarea>
							</div>
						</div>

					</div>

					<div class="col-sm-6">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">State</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<select name="state" id="state" class="form-control">
									@foreach(config('stories.states') as $state)
									<option value="{{ $state }}" @if (isset($story) && $story->state == $state) {{ 'selected' }} @endif>{{ ucwords(str_replace('-', ' ', $state)) }}</option>
									@endforeach
								</select>
							</div>
						</div>
					</div>

					<div class="col-sm-6">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Assigned to</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<select id="user_id" name="user_id" class="form-control">
									<option value="">Not assigned</option>
									@foreach($users as $user2)
										<option value="{{ $user2->id }}" @if(isset($story)) @if(!empty($user2->id == $story->user_id))selected="selected"@endif @endif>{{ $user2->username }}</option>
									@endforeach
								</select>
							</div>
						</div>
					</div>

				</div>

			</div>

			<div class="col-sm-6">

				<div class="row">

					<div class="col-sm-12">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Source URL</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<input type="text" class="form-control js-story-get-source" name="source" id="source" placeholder="http://" value="@if(!empty($story->source)){{ $story->source }}@endif" />
							</div>
						</div>
					</div>

					<div class="col-sm-12">
						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Thumbnail</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<img id="story_image_source" src="@if(!empty($story->thumb)){{ $story->thumb }}@endif" border="0">
								<span class="input-group">
						            <span class="input-group-addon">
						                Upload Image
						            </span>
									<input type="text" class="form-control" name="story_image_source_url" id="story_image_source_url" placeholder="" value="@if(!empty($story->thumb)){{ $story->thumb }}@endif" />
						            <input type="file" multiple="true" class="form-control" name="story_image" id="story_image"/>
						        </span>
							</div>
						</div>

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Video Assets</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<select name="videos[]" id="videos" class="selectpicker" data-live-search="true" data-width="100%" title="Search and attach videos..." multiple>
									@if(!empty($videos))
										@foreach($videos as $video)
											<option value="{{ $video->id }}"{{ isset($story) && $story->videos()->get()->contains($video->id)  ? " selected" : "" }}>{{ $video->title }}</option>
										@endforeach
									@endif
								</select>

							</div>
						</div>
					</div>

				</div>

			</div>

		</div>

		@if(isset($story->id))
			<input type="hidden" id="id" name="id" value="{{ $story->id }}" />
			<input type="hidden" id="alpha_id" name="alpha_id" value="{{ $story->alpha_id }}" />
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		@if(isset($story->id))
			<a href="{{ url('admin/stories/status/licensed/'.$story->alpha_id) }}" class="btn btn-primary pull-right" style="margin-right:10px;">License</a>
	    @endif
	</form>

	<div class="clear"></div>
</div>


	@section('javascript')

	<script type="text/javascript">

	$ = jQuery;

	$(document).ready(function(){

		tinymce.init({
			relative_urls: false,
		    selector: '#description',
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
