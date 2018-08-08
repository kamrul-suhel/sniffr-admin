@extends('admin.master')

@section('content')
<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li> <a href="{{ (isset($decision) ? '/admin/stories/?decision='.$decision : '/admin/stories') }}"><i class="fa fa-tasks"></i> Stories</a> </li>
		<li class="active">
			@if(!empty($asset->id))
				<strong>Edit Story</strong>
			@else
				<strong>New Story</strong>
			@endif
		</li>
	</ol>

	<div class="clear"></div>

	<form method="POST" action="{{ $post_route }}" id="js-story-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

	<div class="row">
		<div class="col-sm-12">
			@if(isset($asset))
				@if(\App\CollectionStory::isOffered($asset->id)->count() > 0
					|| \App\CollectionStory::isRequested($asset->id)->count() > 0)
					<div class="col-lg-12 label label-warning">
						{{ \App\CollectionStory::isOffered($asset->id)->count() > 0 ? "Offered: ".\App\CollectionStory::isOffered($asset->id)->count() : '' }}
						{{ \App\CollectionStory::isRequested($asset->id)->count() > 0 ? "Requested: ".\App\CollectionStory::isRequested($asset->id)->count() : '' }}
					</div>
				@endif
			@endif
			<div class="form-group">
				<div>
					<input type="text" class="form-control story-title" name="title" id="title" placeholder="Story Title" value="@if(!empty($asset->title)){{ $asset->title }}@endif" />
				</div>
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
								<option value="{{ $type }}" {{ (isset($asset)  &&  $asset->type==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $type)) }}</option>
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
							<textarea class="form-control" name="description" id="description">@if(!empty($asset->description)){{ htmlspecialchars($asset->description) }}@endif</textarea>
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
								@if(isset($asset))
									@foreach($asset->videos as $video)
										<div class="form-group input-group">
											<input type="text" class="form-control" value="{{ $video->title }}" disabled />
											<input type="hidden" name="videos[]" value="{{ $video->id }}" />
											<span class="input-group-btn">
												<button class="js-remove-input btn btn-default"><i class="fa fa-times" aria-hidden="true"></i></button>
											</span>
										</div>
									@endforeach
								@endif
							</div>

                            <br>

							<button class="btn btn-default add-video-button pull-right">Add Video Asset</button>
						</div>
					</div>

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
									<option value="{{ $user2->id }}" @if(isset($asset)) @if(!empty($user2->id == $asset->user_id))selected="selected"@endif @endif>{{ $user2->username }}</option>
								@endforeach
							</select>
						</div>
					</div>

					@if(isset($asset->id))

						@include('admin.stories.partials.rights_status')

						@include('admin.contracts.partials.form')

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
									<option value="{{ $state }}" @if (isset($asset) && $asset->state == $state) {{ 'selected' }} @endif>{{ ucwords(str_replace('-', ' ', $state)) }}</option>
									@endforeach
								</select>
							</div>
						</div> -->

						<input type="hidden" id="id" name="id" value="{{ $asset->id }}" />
						<input type="hidden" id="alpha_id" name="alpha_id" value="{{ $asset->alpha_id }}" />
						<input type="hidden" name="decision" value="{{ (isset($decision) ? $decision : '') }}" />

					@endif

					<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
					<input type="hidden" name="decision" value="{{ (isset($decision) ? $decision : '') }}" />
					<input type="hidden" name="type" value="{{ (isset($asset) ? $asset->type : 'new') }}" />

				</div>
			</div>
		</div>
	</div>

	</form>

	@if(isset($asset->id))
		@include('admin.comments.partials.form')
	@endif

	<hr>

	@if(isset($asset->id))
		<a href="{{ url('admin/stories/delete/'.$asset->alpha_id) }}" class="btn btn-danger">Delete Story</a>
	@endif

	@if(isset($asset->id)&&isset($decision)&&$decision=='licensing')
		@if($asset->state=='licensing'||$asset->state=='unlicensed'||$asset->state=='unapproved'||$asset->state=='rejected')
			<a href="{{ url('admin/stories/status/licensed/'.$asset->alpha_id.'/?decision='.(isset($decision) ? $decision : '')) }}" class="btn btn-primary pull-right" style="margin-left:10px;">License (without contract)</a>
		@endif
	@endif

	<a href="#" id="saveStory" class="btn btn-success pull-right">{{ $button_text }}</a>

	@if(isset($asset) && isset($decision) && $decision!='content-sourced' && $asset->url)
		<a href="{{ $asset->url }}" class="btn btn-grey pull-right" target="_blank" style="margin-right:10px;">View Story in Wordpress</a>
	@endif

	<a href="{{ url('admin/stories/?decision='.(isset($decision) ? $decision : '').'&state='.(isset($asset->state) ? $asset->state : '')) }}" class="btn btn-grey pull-right" style="margin-right:10px;">Close</a>

	<div class="clear"></div>

</div>

@if(isset($asset))
	@include('admin.contracts.partials.contract_modal')
@endif

@include('admin.contacts.partials.modal')

@stop

@section('javascript')
	@include('admin.stories.partials.js')
	@include('admin.contacts.partials.js')
@stop
