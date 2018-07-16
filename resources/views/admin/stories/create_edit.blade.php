@extends('admin.master')

@section('content')

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li> <a href="{{ (isset($decision) ? '/admin/stories/?decision='.$decision : '/admin/stories') }}"><i class="fa fa-tasks"></i> Stories</a> </li>
		<li class="active">
			@if(!empty($story->id))
				<strong>Edit Story</strong>
			@else
				<strong>New Story</strong>
			@endif
		</li>
	</ol>

	<div class="admin-section-title">
		<p></p>
	</div>
	<div class="clear"></div>

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

		<div class="row">

			<div class="col-sm-12">

				<div class="panel panel-primary" data-collapsed="0">
					<input type="text" class="form-control story-title" name="title" id="title" placeholder="Story Title" value="@if(!empty($story->title)){{ $story->title }}@endif" />
				</div>

			</div>

		</div>

		<div class="row">

			<div class="col-sm-4"> <!-- first column -->

				<div class="row">

					<div class="col-sm-12">

						<!-- <div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Type</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<select name="type" id="type" class="form-control">
									@foreach(config('stories.story_type') as $type)
									<option value="{{ $type }}" {{ (isset($story)  &&  $story->type==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $type)) }}</option>
									@endforeach
								</select>
							</div>
						</div> -->

						@include('admin.stories.partials.assets')

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

				</div>

			</div>

			<div class="col-sm-4"> <!-- second column -->

				<div class="row">

					<div class="col-sm-12">

						@include('admin.stories.partials.licensing_information')

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Include Video Assets</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body">
								<div class="video-inputs-wrapper">

								</div>

                                <br>

								<button class="btn btn-default add-video-button pull-right">Add Video Asset</button>
							</div>
						</div>

						@include('admin.stories.partials.comments')

					</div>

				</div>

			</div>

			<div class="col-sm-4"> <!-- third column -->

				<div class="row">

					<div class="col-sm-12">

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


						@if(!empty($story))

						@include('admin.stories.partials.rights_status')

						@include('admin.stories.partials.contract')

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">License Notes</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<textarea class="form-control" name="notes" id="notes" rows="7">@if(isset($story)&&$story->notes) {{ $story->notes }} @endif</textarea>
							</div>
						</div>

						<!-- <div class="panel panel-primary" data-collapsed="0">
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
						</div> -->

						@endif

					</div>

				</div>

			</div>

		</div>

		@if(isset($story->id))
			<input type="hidden" id="id" name="id" value="{{ $story->id }}" />
			<input type="hidden" id="alpha_id" name="alpha_id" value="{{ $story->alpha_id }}" />
			<input type="hidden" name="decision" value="{{ (isset($decision) ? $decision : '') }}" />
			<a href="{{ url('admin/stories/delete/'.$story->alpha_id) }}" class="btn btn-danger">Delete Story</a>
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="hidden" name="decision" value="{{ (isset($decision) ? $decision : '') }}" />
		<input type="hidden" name="type" value="{{ (isset($story) ? $story->type : 'new') }}" />

		@if(isset($story->id)&&isset($decision)&&$decision=='licensing')
			@if($story->state=='licensing'||$story->state=='unlicensed'||$story->state=='unapproved'||$story->state=='rejected')
				<a href="{{ url('admin/stories/status/licensed/'.$story->alpha_id) }}" class="btn btn-primary pull-right" style="margin-left:10px;">License (without contract)</a>
			@endif
		@endif

		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		@if(isset($story) && isset($decision) && $decision!='content-sourced' && $story->url)
			<a href="{{ $story->url }}" class="btn btn-grey pull-right" target="_blank" style="margin-right:10px;">View Story in Wordpress</a>
		@endif

	</form>

	<div class="clear"></div>

	@if(isset($story))
        @include('admin.stories.partials.contract_modal')
    @endif
</div>

	@include('admin.modals.add_contact_modal')

	@include('admin.stories.partials.javascript')

@stop
