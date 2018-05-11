@extends('admin.master')

@section('content')
<div id="admin-container">

	<ol class="breadcrumb">
		<li><a href="/admin/videos">All Videos</a></li>
		@if(isset($video))
		<li><a href="/admin/videos/{{ !empty($video->state) ? $video->state : 'new' }}">{{ !empty($video->state) ? ucfirst($video->state) : 'New' }}</a></li>
		<li class="active"><strong>{!! !empty($video->title) ? '<a href="/admin/videos/edit/'.$video->alpha_id.'">'.$video->title.'</a>' : 'No Title Provided' !!}</strong></li>
		@else
		<li class="active"><strong>Add New Video</strong></li>
		@endif
	</ol>

	<div class="row bottom-padding">
		<div class="col-sm-6">
			<div class="admin-section-title">
				@if(isset($video))
					<h3>{{ $video->title }}</h3>
				@else
					<h3><i class="fa fa-plus"></i> Add New Video</h3>
				@endif
			</div>
		</div>

		<div class="col-sm-6">
			<div class="row">

				<div class="col-sm-9">
					<form id="search-form" method="get" role="form" class="search-form-full" action="/admin/videos">
						<div class="form-group">
							<input type="text" class="form-control" name="s" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
						</div>
					</form>
				</div>

				<div class="col-sm-3">
					<div class="form-group pull-right top-padding-micro">
					@if(isset($previous))
						<a href="{{ url('admin/videos/edit/'.$previous->alpha_id ) }}" class="btn btn-primary">Previous</a>
					@endif
					@if(isset($next))
						<a href="{{ url('admin/videos/edit/'.$next->alpha_id ) }}" class="btn btn-primary">Next</a>
					@endif
					</div>
			    </div>

			</div>
		</div>
	</div>

	<div class="clear"></div>

	@if(isset($video))
	<div class="row">
		<div class="col-sm-6">
			<?php
			switch($video->state){
				case 'rejected':
				case 'problem':
					$panelColour = 'danger';
					break;
				case 'licensed':
					$panelColour = 'success';
					break;
				case 'restricted':
					$panelColour = 'warning';
					break;
				default:
					$panelColour = 'default';
			}
			?>
			<div class="panel panel-{{ $panelColour }}" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">
						{{ ucfirst($video->state) }}
						@if($video->state=='licensed')
						| {!! $video->rights === 'nonex' ? '<i class="fa fa-times-circle" title="Non-Exclusive"></i> Non-Exclusive' : '<i class="fa fa-check-circle" title="Exclusive"></i> Exclusive' !!} Video
						@endif
						@if($video->trashed())
						 - Deleted
						@endif
					</div>
					<div class="panel-options">
						<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
					</div>
				</div>

				<div class="panel-body" style="display: block;">
					<div class="text-center">
						{!! App\Libraries\VideoHelper::getVideoHTML($video, true, 'edit') !!}
					</div>
				</div>

				<div class="panel-footer">
					<div class="text-right">
						@if($video->state == 'pending'||$video->state == 'problem'||$video->state == 'licensed'||$video->state=='restricted')
							@if($video->state != 'licensed')
							<a href="{{ url('admin/videos/status/licensed/'.$video->alpha_id ) }}" class="btn btn-primary btn-success">License</a>
							@endif
				        	@if($video->state != 'restricted')
				        	<a href="{{ url('admin/videos/status/restricted/'.$video->alpha_id ) }}" class="btn btn-primary btn-warning">Restricted</a>
				        	@endif
				        	@if($video->state != 'problem')
				        	<a href="{{ url('admin/videos/status/problem/'.$video->alpha_id ) }}" class="btn btn-primary btn-danger">Problem</a>
				        	@endif
						@elseif($video->state == 'new')
							<a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}" class="btn btn-primary btn-success js-state-accept">Accept</a>
				        	<a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}" class="btn btn-primary btn-danger">Reject</a>
						@elseif($video->state == 'accepted')
							<div class="pull-left">
							@if($video->reminders)
							Reminder {{ $video->reminders }} Sent: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }} <a href="{{ url('admin/videos/remind/'.$video->alpha_id ) }}" class="btn btn-primary btn-danger">Send Reminder</a>
							@else
							More Details Requested: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }} <a href="{{ url('admin/videos/remind/'.$video->alpha_id ) }}" class="btn btn-primary btn-danger">Send Reminder</a>
							@endif
							</div>
							<a href="{{ url('admin/videos/status/rejected/'.$video->alpha_id ) }}" class="btn btn-primary btn-danger">Reject</a>
						@elseif($video->state == 'rejected')
							<a href="{{ url('admin/videos/status/accepted/'.$video->alpha_id ) }}" class="btn btn-primary btn-success">Accept</a>
						@endif

						@if($video->file)
							<a href="{{ url('/download/'.$video->alpha_id) }}" class="btn btn-primary{{ $video->file_watermark ? ' js-download' : '' }}" title="Download Video" download><i class="fa fa-download"></i></a>
						@endif
						<a href="{{ url('/admin/pdfview/'.$video->alpha_id) }}" class="btn btn-primary" title="Download License" download><i class="fa fa-print"></i></a>
						<a href="{{ url('/admin/nsfw/'.$video->alpha_id) }}" class="btn btn-primary" title="Flag NSFW"><i class="fa fa-flag"></i></a>
					</div>

					<div class="clearfix"></div>
				</div>
			</div>
		</div>

		<div class="col-sm-6">
			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Uploaded By</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
				</div>

				<div class="panel-body" style="display: block;">
					@if(isset($video->contact->id))
					<h3><a href="{{ url('admin/contacts/edit/'.$video->contact->id) }}">{{ $video->contact->full_name ? $video->contact->full_name : 'Not submitted' }}</a></h3>
                    <p><a href="mailto:{{ $video->contact->email }}">{{ $video->contact->email }}</a></p>
					@else
					<h3>No Contact Details</h3>
					@endif
				</div>
			</div>

			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Comments</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
				</div>

                <div class="panel-body" style="display: block;">
                    @if(!count($video->comments))
                        <p>No Comments</p>
                    @endif

                    @foreach($video->comments as $comment)
                        <p>
                            {{ $comment->comment }}
                        </p>
                        <div class="text-right">
                            {{ $comment->user->username }} |
                            {{ $comment->created_at->diffForHumans() }}
                            @if(Auth::user()->isAdmin() || ($comment->user_id == Auth::user()->id))
                                &nbsp
                                {!! Form::open([
                                    'route' => ['comment.destroy', $comment->id],
                                    'class' => 'pull-right',
                                    'method' => 'DELETE'
                                ]) !!}
                                <button class="fa fa-trash-o"></button>
                                {{ Form::hidden('alpha_id', $video->alpha_id) }}
                                {{ Form::hidden('video_id', $video->id) }}
                                {!! Form::close() !!}
                            @endif
                        </div>
                        <hr>
                    @endforeach
                </div>

                <div class="panel-footer">
                    <form method="POST" action="{{ route('comment.store') }}" id="comment-form"
                          name="comment-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                        <input type="hidden" name="video_id" value="{{ $video->id }}"/>
                        <input type="hidden" name="alpha_id" value="{{ $video->alpha_id }}"/>
                        <div class="form-group">
                            <label for="comment">Add a comment</label>
                            <textarea class="form-control" id="comment"
                                      name="comment">{{ old('comment') }}</textarea>
                        </div>

                        <input type="submit" value="Add Comment" class="btn btn-success pull-right"/>
                    </form>
                    <span class="clearfix"></span>
                </div>
            </div>


			@if($video->more_details)
			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Rights</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
				</div>

				<div class="panel-body" style="display: block;">
                    <p class="{{ $video->contact_is_owner ? 'text-success' : 'text-danger' }}"><strong>{!! $video->contact_is_owner ? '<i class="fa fa-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong></p>
                    @if($video->submitted_elsewhere&&$video->submitted_elsewhere!='NULL')
                    <p class="text-warning"><strong><i class="fa fa-exclamation"></i> Submitted to: {{ $video->submitted_where }}</strong></p>
                    @endif
                    <p class="{{ $video->allow_publish ? 'text-success' : 'text-danger' }}"><strong>{!! $video->allow_publish ? '<i class="fa fa-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}appy to publish</strong></p>
                    <p class="{{ $video->permission ? 'text-success' : 'text-danger' }}"><strong>{!! $video->permission ? '<i class="fa fa-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!} permission</strong></p>
                    <p class="{{ $video->is_exclusive ? 'text-success' : 'text-danger' }}"><strong>{!! $video->is_exclusive ? '<i class="fa fa-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!} exclusive</strong></p>
					{!! $video->file ? '' : '<p class="text-warning"><strong><i class="fa fa-exclamation"></i> Need to source video file</strong></p>' !!}
				</div>
			</div>
			@endif
		</div>
	</div>
	@endif

    <form method="POST" action="{{ $post_route }}" id="video-form" name="video-form" accept-charset="UTF-8" file="1" enctype="multipart/form-data">

		<!-- For non-exclusive videos -->
		@if(isset($video) && $video->rights == 'nonex')
		<div class="row">
			<div class="col-md-4">
				<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
					<div class="panel-title">Notes {{ $video->referrer ? 'for '.$video->referrer : '' }}</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
					<div class="panel-body" style="display: block;">
						<p>Notes for the video:</p>
						<textarea class="form-control" name="notes" id="notes">@if(!empty($video->notes)){{ htmlspecialchars($video->notes) }}@endif</textarea>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
					<div class="panel-title">Credit Link</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
					<div class="panel-body" style="display: block;">
						<p>Credit link for the video:</p>
						<input class="form-control" name="credit" id="credit" value="@if(!empty($video->credit)){{ htmlspecialchars($video->credit) }}@endif" />
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Referrer</div>
						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Referrer:</p>
						<input class="form-control" name="credit" id="credit" value="@if(!empty($video->referrer)){{ htmlspecialchars($video->referrer) }}@endif" />
					</div>
				</div>
			</div>
		</div>
		@endif
		<!-- End -->

		<div class="row">

			<div class="col-md-3">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Assigned To</div>
						<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select who this video is assigned to:</p>
						<select id="user_id" name="user_id">
							<option value="">Not assigned</option>
							@foreach($users as $user2)
								<option value="{{ $user2->id }}" @if(isset($video)) @if(!empty($user2->id == $video->user_id))selected="selected"@endif @endif>{{ $user2->username }}</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>

			<!-- <div class="col-md-3">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Used Status</div>
						<div class="panel-options"><a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a></div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select if the video has been used yet:</p>
						<select id="user_id" name="user_id">
							<option value="">Not assigned</option>

								<option value=""></option>

						</select>
					</div>
				</div>
			</div> -->

		</div>

		<div class="row">

			<div class="col-md-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Title</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Add the video title in the textbox below:</p>
						<input type="text" class="form-control" name="title" id="title" placeholder="Video Title" value="@if(!empty($video->title)){{ $video->title }}@endif" />
					</div>
				</div>
			</div>

			<div class="col-sm-3">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Filmed Date</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select Date/Time Below</p>
						<input type="date" class="form-control" name="date_filmed" id="date_filmed" placeholder="" value="@if(!empty($video->date_filmed)){{ $video->date_filmed }}@endif" />
					</div>
				</div>
			</div>

			<div class="col-sm-3">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Uploaded Date</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select Date/Time Below</p>
						<input type="text" class="form-control" name="created_at" id="created_at" disabled value="@if(!empty($video->created_at)){{ $video->created_at }}@endif" />
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Video Image Cover (16:9)</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if(!empty($video->image))
							<img src="{{ $video->image }}" class="video-img" width="200"/>
						@endif
						<p>Select the video image (1280x720 px or 16:9 ratio):</p>

						<input type="file" multiple="true" class="form-control" name="image" id="image" />
					</div>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Video Source</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body">
						<div class="new-video-file">
							<label for="file">File: {{ !empty($video->file) ? $video->file : '' }}</label>
							<input type="file" multiple="true" class="form-control" name="file" id="file" />
						</div>

						<hr />

						<div class="new-video-url">
							<label for="url">URL:</label>
							<input type="text" class="form-control" name="url" id="url" value="@if(!empty($video->url)){{ $video->url }}@endif" />
						</div>

						<hr />

						<div class="new-video-embed">
							<label for="embed_code">Embed Code:</label>
							<textarea class="form-control" name="embed_code" id="embed_code">{{ !empty($video->embed_code) ? $video->embed_code : '' }}</textarea>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-sm-8">

				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Short Description</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Add a short description of the video below:</p>
						<textarea class="form-control" name="description" id="description">@if(!empty($video->description)){{ htmlspecialchars($video->description) }}@endif</textarea>
					</div>
				</div>

			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Location</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Where was the video filmed?</p>
						<input type="text" class="form-control" name="location" id="location" placeholder="" value="@if(!empty($video->location)){{ $video->location }}@endif" />
					</div>
				</div>
			</div>

		</div>

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Video Details, Links, and Info</div>

				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
				</div>
			</div>

			<div class="panel-body" style="display: block; padding:0px;">
				<textarea class="form-control" name="details" id="details">@if(!empty($video->details)){{ htmlspecialchars($video->details) }}@endif</textarea>
			</div>
		</div>

		<div id="video-error" class="error"></div>

		<div class="row">
			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Vertical</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select a Vertical Below:</p>
						<select id="video_category_id" name="video_category_id">
							<option value="0">Please Select</option>
							@foreach($video_categories as $category)
								<option value="{{ $category->id }}" @if(!empty($video->video_category_id) && $video->video_category_id == $category->id)selected="selected"@endif>{{ $category->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Collection</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select a Video Collection Below:</p>
						<select id="video_collection_id" name="video_collection_id">
							<option value="0">Please Select</option>
							@foreach($video_collections as $collection)
								<option value="{{ $collection->id }}" @if(!empty($video->video_collection_id) && $video->video_collection_id == $collection->id)selected="selected"@endif>{{ $collection->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Shot Type</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<p>Select a Shot Type Below:</p>
						<select id="video_shottype_id" name="video_shottype_id">
							<option value="0">Please Select</option>
							@foreach($video_shottypes as $shottype)
								<option value="{{ $shottype->id }}" @if(!empty($video->video_shottype_id) && $video->video_shottype_id == $shottype->id)selected="selected"@endif>{{ $shottype->name }}</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>
		</div>

		@if(isset($video) && $video->rights == 'ex')
		<div class="row">
			<div class="col-sm-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Campaign</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						<select name="campaigns[]" id="campaigns" class="form-control" multiple>
							@if(!empty($video_campaigns))
								@foreach($video_campaigns as $campaign)
									<option value="{{ $campaign->id }}"{{ isset($video) && $video->campaigns()->get()->contains($campaign->id)  ? " selected" : "" }}>{{ $campaign->name }}</option>
								@endforeach
							@endif
						</select>
					</div>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Client Exclusivity</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if(isset($video) && count($video->campaigns)>0)
							@foreach($video->campaigns as $campaign)
								<?php
	                                $date1 = now();
	                                $date2 = new DateTime($campaign->pivot->created_at);

	                                $diff = $date2->diff($date1);

	                                $exclusivity = 48 - ($diff->h + ($diff->days*24));
	                            ?>
								{{ $campaign->name }} : {{ $exclusivity > 0 ? $exclusivity.' Hours left' : 'Exclusivity Expired' }}
							@endforeach
						@else
						<p>Not currently selected for any campaigns</p>
						@endif
					</div>
				</div>
			</div>
		</div>
		@endif

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Tags</div>

				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
				</div>
			</div>

			<div class="panel-body" style="display: block;">
				<div id="video-analysis"></div>
				<p>Add video tags below:</p>
				<input class="form-control" name="tags" id="tags" data-role="tagsinput" value="@if(!empty($video) && $video->tags->count() > 0)@foreach($video->tags as $tag){{ $tag->name . ', ' }}@endforeach @endif">
			</div>
		</div>

		<div class="row">
			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading"> <div class="panel-title"> Duration</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
					<div class="panel-body">
						<p>Enter the video duration in the following format (Hours : Minutes : Seconds)</p>
						<input class="form-control" name="duration" id="duration" value="@if(!empty($video->duration)){{ gmdate('H:i:s', $video->duration) }}@endif">
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading"> <div class="panel-title"> Rights Management</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a> </div></div>
					<div class="panel-body">
						<p>Select if the video is exclusive or non-exclusive</p>
						<select id="rights" name="rights">
							<option value="ex" @if(isset($video->rights)) @if($video->rights == 'ex') selected @endif @endif>Exclusive</option>
							<option value="nonex" @if(isset($video->rights)) @if($video->rights == 'nonex') selected @endif @endif>Non-Exclusive</option>
						</select>
					</div>
				</div>
			</div>

		</div><!-- row -->

		@if(isset($video))
			<input type="hidden" id="id" name="id" value="{{ $video->alpha_id }}" />
			<input type="hidden" id="temp_filename" name="temp_filename" value="{{ basename($video->file) }}" />
			<input type="hidden" id="temp_state" name="temp_state" value="{{ basename($video->state) }}" />
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />

		@if(isset($video))
			@if($video->trashed())
			<a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Restore Video" class="btn btn-warning">
				<i class="fa fa-fa-upload"></i> Restore
			</a>
			@else
			<a href="{{ url('admin/videos/delete/'.$video->alpha_id) }}" title="Delete Video" class="btn btn-danger">
				<i class="fa fa-trash-o"></i> Delete
			</a>
			@endif
		@endif

		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />
	</form>

	<div class="clear"></div>
</div>

@section('javascript')
	<script type="text/javascript">
		//video analysis function for labels from dynamodb API
		function videoAnalysis(tempFile) {

		   if(tempFile) {
			   //initialize video analysis + message
			   $("#video-analysis").html('<p>Analysing video<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></p>');

			   //copy over video file for analysis (this is now executed when video accepted)
			   // $.ajax({
				//    type: 'GET',
				//    url: '/admin/analyse/?f='+tempFile,
				//    data: { get_param: 'value' },
				//    dataType: 'json',
				//    success: function (data) {
				// 	   if(data.status=='success') {
				// 		   //do nothing at the moment
				// 	   }
				//    }
			   // });

			   //wait 2 seconds for analysis and then get the video labels (if available)
			   timeout = setTimeout(function(){
				   $.ajax({
					   type: 'GET',
					   url: '/admin/labels/?f='+tempFile,
					   data: { get_param: 'value' },
					   dataType: 'json',
					   success: function (data) {
						   if(data.status=='success') {
							   $("#video-analysis").html('<p>Suggested Tags: <span id="video-analysis-tag-added"></span> </p>');
							   for(var i=0;i<data.labels.length;i++) {
							   		var label_output='<a href="#" title="'+data.labels[i]['Name'].toLowerCase()+'" class="tag label label-info copy-tag">'+data.labels[i]['Name'].toLowerCase()+'</a> ';
							   		$("#video-analysis").append(label_output);
							   }
							   if(data.labels.length>0) {
								   $('.copy-tag').click(function(e){
									   e.preventDefault();
									   var tag = $(this).attr('title');
									   $('#tags').tagsinput('add', tag);
									   $('#video-analysis-tag-added').html(tag+' tag added. You can also add your own tags if you like.');
									   $(this).css('background', '#337ab7');
								   });
							   }
						   } else {
							   //$('#video-analysis').css('display','none');
							   $("#video-analysis").html('<p>No suggested tags found but you can still add your own <span id="video-analysis-tag-added"></span> </p>');
						   }
					   }
				   });
		   	   }, 2000);
	   	   }

		}

		(function($){
			var tagnames = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				prefetch: {
			    url: '/tags',
			    filter: function(list) {
			      return $.map(list, function(tagname) {
			        return { name: tagname }; });
			    }
			  }
			});
			tagnames.initialize();

			$('#tags').tagsinput({
					typeaheadjs: [{
								minLength: 1,
								highlight: true,
					},{
							minlength: 1,
							name: 'tagnames',
							displayKey: 'name',
							valueKey: 'name',
							source: tagnames.ttAdapter()
					}],
					freeInput: true,
					allowDuplicates: false
			});
			$('#tags').on('beforeItemAdd', function(event) {
				var tagsArray = $('#tags').val().split(",");
				var tagsCheck = false;
				event.item = event.item.toLowerCase();
				if(!event.item) {
					event.cancel = true;
				}
				for (i=0;i<tagsArray.length;i++){
					if(tagsArray[i].trim()==event.item){
						tagsCheck = true;
						$('.tt-input valid').val('');
						event.cancel = true;
					}
				}
			});
			$('#tags').on('itemRemoved', function(event) {
			   console.log(event.item);
			   if(event.item) {
				   $('a[title="'+event.item+'"]').css('background', '#666');
				   $('#video-analysis-tag-added').html('');
			   }
			});

			$('#duration').mask('00:00:00');

			$('#type').change(function(){
				if($(this).val() == 'file'){
					$('.new-video-file').show();
					$('.new-video-embed').hide();
					$('.new-video-url').hide();
				}else if($(this).val() == 'embed'){
					$('.new-video-embed').show();
					$('.new-video-file').hide();
					$('.new-video-url').hide();
				}else{
					$('.new-video-url').show();
					$('.new-video-embed').hide();
					$('.new-video-file').hide();
				}
			});

			tinymce.init({
				relative_urls: false,
			    selector: '#details',
			    toolbar: "styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor | code",
			    plugins: [
			         "advlist autolink link image code lists charmap print preview hr anchor pagebreak spellchecker code fullscreen",
			         "save table contextmenu directionality emoticons template paste textcolor code"
			   ],
			   menubar:false,
			 });

			 $('.js-state-accept').click(function(e){
				e.preventDefault();
 				var dataUrl = $(this).attr('href');
 				var parseUrl = dataUrl.split('/');
 				var state = parseUrl[6];
 				var videoId = parseUrl[7];
 				var alertType;

				$(this).removeAttr("href");

 				swal({  title: 'loading..', icon: 'info', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false });
 				$('.swal-button-container').css('display','none');

				if(dataUrl) {
					$.ajax({
					    type: 'GET',
					    url: dataUrl,
					    data: { get_param: 'value' },
					    dataType: 'json',
					    success: function (data) {
							if(data.status=='success') {
								swal({  title: data.message, icon: 'success', buttons: true, closeModal: true, closeOnClickOutside: false, closeOnEsc: false, buttons: { cancel: false, confirm: true } }).then(() => {
									//location.reload();
									window.location.href = '/admin/videos/edit/'+data.video_alpha_id+'/?previous_state='+data.previous_state;
								});
								$('.swal-button-container').css('display','inline-block');
							}
					    }
					});
				}
		     });

			 //js form validations >> Admin Create edit
	 		$('#video-form').validate({
	 			rules: {
	 				title: {
	         			required: true
	         		}
	 			},
	 			messages: {
	         		title: 'You must enter the video title',
	 				date_filmed: 'You must enter when the video was filmed',
	 				description: 'You must enter a short description or story behind the video'
	 	    	},
				errorPlacement: function (error, element) {
					error.insertAfter(element);
				}
	 		});

			//js form validations >> Admin Comment
		   $('#comment-form').validate({
			   rules: {
				   comment: {
					   required: true
				   }
			   },
			   messages: {
				   comment: 'You must enter a comment first'
			   }
		   });

		   //execute video analysis onload
		   var dataFile = $('#temp_filename').val();
		   var dataState = $('#temp_state').val();
		   // console.log(dataFile);
		   // console.log(dataState);
		   if(dataFile!=null&&dataState!='new'){
			   videoAnalysis(dataFile);
		   }

		})(jQuery);
	</script>
@stop

@stop
