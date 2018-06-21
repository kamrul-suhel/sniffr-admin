@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb"> <li> <a href="/admin/stories"><i class="fa fa-newspaper-o"></i>All Stories</a> </li> <li class="active">@if(!empty($story->id)) <strong>{{ $story->title }}</strong> @else <strong>New Story</strong> @endif</li> </ol>

	<div class="admin-section-title" style="background:#1976d2;color:#fff;">
		<p>This feature is currently in development to push new stories to Wordpress.</p>
	</div>

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

								<input type="text" class="form-control" name="title" id="title" placeholder="Story Title" value="@if(!empty($story->title)){{ $story->title }}@endif" />
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
									<option value="sourced" @if (isset($story) && $story->state == 'sourced') {{ 'selected' }} @endif>Sourced</option>
									<option value="approved" @if (isset($story) && $story->state == 'approved') {{ 'selected' }} @endif>Approved</option>
									<option value="contacted" @if (isset($story) && $story->state == 'contacted') {{ 'selected' }} @endif>Contacted</option>
									<option value="conversation" @if (isset($story) && $story->state == 'conversation') {{ 'selected' }} @endif>Conversation</option>
									<option value="bumping" @if (isset($story) && $story->state == 'bumping') {{ 'selected' }} @endif>Bumping</option>
									<option value="bump1" @if (isset($story) && $story->state == 'bump1') {{ 'selected' }} @endif>Bump1</option>
									<option value="bump2" @if (isset($story) && $story->state == 'bump2') {{ 'selected' }} @endif>Bump2</option>
									<option value="licensed" @if (isset($story) && $story->state == 'licensed') {{ 'selected' }} @endif>Licensed</option>
									<option value="writing" @if (isset($story) && $story->state == 'writing') {{ 'selected' }} @endif>Writing</option>
									<option value="subbing" @if (isset($story) && $story->state == 'subbing') {{ 'selected' }} @endif>Subbing</option>
									<option value="ready" @if (isset($story) && $story->state == 'ready') {{ 'selected' }} @endif>Ready</option>
									<option value="pushed" @if (isset($story) && $story->state == 'pushed') {{ 'selected' }} @endif>Pushed</option>
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
								<div class="panel-title">Story Thumbnail (not yet working)</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<span class="input-group">
						            <span class="input-group-addon">
						                Upload Image
						            </span>
						            <input type="file" multiple="true" class="form-control" name="image" id="image"/>
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
								<select name="videos[]" id="videos" class="form-control" multiple style="height:200px;">
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
