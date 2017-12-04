@extends('admin.master')

@section('css')
	<link rel="stylesheet" href="{{ '/application/assets/js/tagsinput/jquery.tagsinput.css' }}" />
	<link rel="stylesheet" href="{{ '/content/themes/default/assets/css/video-js.css' }}" />
@stop


@section('content')
<div id="admin-container">
<!-- This is where -->
	<div class="admin-section-title">
	@if(!empty($video->id))
		<h3>{{ $video->title }}</h3>
		<a href="{{ URL::to('video') . '/' . $video->id }}" target="_blank" class="btn btn-info">
			<i class="fa fa-eye"></i> Preview <i class="fa fa-external-link"></i>
		</a>
	@else
		<h3><i class="entypo-plus"></i> Add New Video</h3>
	@endif
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
				case 'restricted':
					$panelColour = 'success';
					break;
				default:
					$panelColour = 'default';
			}
			?>
			<div class="panel panel-{{ $panelColour }}" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">{{ ucfirst($video->state) }} Video</div>

					<div class="panel-options">
						<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
					</div>
				</div>

				<div class="panel-body" style="display: block;">
					<div class="text-center">
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
					</div>
				</div>

				<div class="panel-footer">
					@if($video->state == 'pending')
					<div class="text-right">
						<a href="{{ url('admin/videos/status/licensed/'.$video->id ) }}" class="btn btn-primary btn-success">License</a>
			        	<a href="{{ url('admin/videos/status/restricted/'.$video->id ) }}" class="btn btn-primary btn-warning">Restricted</a>
			        	<a href="{{ url('admin/videos/status/problem/'.$video->id ) }}" class="btn btn-primary btn-danger">Problem</a>
					</div>
					@elseif($video->state == 'new')
					<div class="text-right">
						<a href="{{ url('admin/videos/status/accepted/'.$video->id ) }}" class="btn btn-primary btn-success">Accept</a>
			        	<a href="{{ url('admin/videos/status/rejected/'.$video->id ) }}" class="btn btn-primary btn-danger">Reject</a>
					</div>
					@elseif($video->state == 'accepted')
					More Details Requested: {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$video->more_details_sent)->diffForHumans() }} <a href="{{ url('admin/videos/remind/'.$video->id ) }}" class="btn btn-primary btn-danger pull-right">Send Reminder</a>
					<div class="clearfix"></div>
					@endif
				</div>
			</div>
		</div>

		<div class="col-sm-6">
			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Uploaded By</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a></div>
				</div>

				<div class="panel-body" style="display: block;">
					<p>{{ $video->contact->first_name.' '.$video->contact->last_name }}</p>
                    <p>{{ $video->contact->email }}</p>
				</div>
			</div>


			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Comments</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a></div>
				</div>

				<div class="panel-body" style="display: block;">
					@if(count($video->comments))
						@foreach($video->comments as $comment)
	                    <p>{{ $comment->comment }}<br><br><strong class="pull-right">{{ $comment->user->username }} | {{ $comment->created_at->diffForHumans() }}</strong></p>
	                    <br>
	                    <hr>
	                    @endforeach
                    @else
                    	<p>No Comments</p>
                	@endif
				</div>

				<div class="panel-footer">
					<form method="POST" action="{{ url('/admin/videos/comment/'.$video->id) }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
						<input type="hidden" name="_token" value="<?= csrf_token() ?>" />

						<div class="form-group">
	                        <label for="comment">Add a comment</label>
	                        <textarea class="form-control" id="comment" name="comment">{{ old('comment') }}</textarea>
	                    </div>

	                    <input type="submit" value="Add Comment" class="btn btn-success pull-right" />
                    </form>
                    <span class="clearfix"></span>
                </div>
			</div>


			@if($video->more_details)
			<div class="panel panel-primary" data-collapsed="0">
				<div class="panel-heading">
					<div class="panel-title">Rights</div>
					<div class="panel-options"><a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a></div>
				</div>

				<div class="panel-body" style="display: block;">
                    <p class="{{ $video->contact_is_owner ? 'text-success' : 'text-danger' }}"><strong>{!! $video->contact_is_owner ? '<i class="entypo-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong></p>
                    @if($video->submitted_elsewhere)
                    <p class="text-warning"><strong><i class="fa fa-exclamation"></i> Submitted to: {{ $video->submitted_where }}</strong></p>
                    @endif
                    <p class="{{ $video->allow_publish ? 'text-success' : 'text-danger' }}"><strong>{!! $video->allow_publish ? '<i class="entypo-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}appy to publish</strong></p>
                    <p class="{{ $video->permission ? 'text-success' : 'text-danger' }}"><strong>{!! $video->permission ? '<i class="entypo-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!} permission</strong></p>
                    <p class="{{ $video->is_exclusive ? 'text-success' : 'text-danger' }}"><strong>{!! $video->is_exclusive ? '<i class="entypo-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!} exclusive</strong></p>
				</div>
			</div>
			@endif
		</div>
	</div>
	@endif

	<form method="POST" action="{{ $post_route }}" accept-charset="UTF-8" file="1" enctype="multipart/form-data">
		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading">
						<div class="panel-title">Title</div>

						<div class="panel-options">
							<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
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
							<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
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
							<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
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
							<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
						</div>
					</div>

					<div class="panel-body" style="display: block;">
						@if(!empty($video->image))
							@if(strpos($video->image,'http') === false)
							<img src="{{ Config::get('site.uploads_dir') . 'images/' . $video->image }}" class="video-img" width="200"/>
							@else
							<img src="{{ $video->image }}" class="video-img" width="200"/>
							@endif
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
							<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
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

		<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
			<div class="panel-title">Short Description</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
			<div class="panel-body" style="display: block;">
				<p>Add a short description of the video below:</p>
				<textarea class="form-control" name="description" id="description">@if(!empty($video->description)){{ htmlspecialchars($video->description) }}@endif</textarea>
			</div>
		</div>

		<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
			<div class="panel-title">Video Details, Links, and Info</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
			<div class="panel-body" style="display: block; padding:0px;">
				<textarea class="form-control" name="details" id="details">@if(!empty($video->details)){{ htmlspecialchars($video->details) }}@endif</textarea>
			</div>
		</div>

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Category</div>

				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
				</div>
			</div>

			<div class="panel-body" style="display: block;">
				<p>Select a Video Category Below:</p>
				<select id="video_category_id" name="video_category_id">
					<option value="0">Uncategorized</option>
					@foreach($video_categories as $category)
						<option value="{{ $category->id }}" @if(!empty($video->video_category_id) && $video->video_category_id == $category->id)selected="selected"@endif>{{ $category->name }}</option>
					@endforeach
				</select>
			</div>
		</div>

		<div class="panel panel-primary" data-collapsed="0">
			<div class="panel-heading">
				<div class="panel-title">Campaign</div>

				<div class="panel-options">
					<a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a>
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

		<div class="panel panel-primary" data-collapsed="0"> <div class="panel-heading">
			<div class="panel-title">Tags</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
			<div class="panel-body" style="display: block;">
				<p>Add video tags below:</p>
				<input class="form-control" name="tags" id="tags" value="@if(!empty($video) && $video->tags->count() > 0)@foreach($video->tags as $tag){{ $tag->name . ', ' }}@endforeach @endif">
			</div>
		</div>

		<div class="clear"></div>


		<div class="row">

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading"> <div class="panel-title"> Duration</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
					<div class="panel-body">
						<p>Enter the video duration in the following format (Hours : Minutes : Seconds)</p>
						<input class="form-control" name="duration" id="duration" value="@if(!empty($video->duration)){{ gmdate('H:i:s', $video->duration) }}@endif">
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading"> <div class="panel-title"> User Access</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
					<div class="panel-body">
						<label for="access" style="float:left; margin-right:10px;">Who is allowed to view this video?</label>
						<select id="access" name="access">
							<option value="guest" @if(!empty($video->access) && $video->access == 'guest'){{ 'selected' }}@endif>Guest (everyone)</option>
							<!--option value="registered" @if(!empty($video->access) && $video->access == 'registered'){{ 'selected' }}@endif>Registered Users (free registration must be enabled)</option>
							<option value="subscriber" @if(!empty($video->access) && $video->access == 'subscriber'){{ 'selected' }}@endif>Subscriber (only paid subscription users)</option-->
						</select>
						<div class="clear"></div>
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="panel panel-primary" data-collapsed="0">
					<div class="panel-heading"> <div class="panel-title"> Status Settings</div> <div class="panel-options"> <a href="#" data-rel="collapse"><i class="entypo-down-open"></i></a> </div></div>
					<div class="panel-body">
						<div>
							<label for="featured" style="float:left; display:block; margin-right:10px;">Is this video Featured:</label>
							<input type="checkbox" @if(!empty($video->featured) && $video->featured == 1){{ 'checked="checked"' }}@endif name="featured" value="1" id="featured" />
						</div>
						<div class="clear"></div>
						<div>
							<label for="active" style="float:left; display:block; margin-right:10px;">Is this video Active:</label>
							<input type="checkbox" @if(!empty($video->active) && $video->active == 1){{ 'checked="checked"' }}@elseif(!isset($video->active)){{ 'checked="checked"' }}@endif name="active" value="1" id="active" />
						</div>
					</div>
				</div>
			</div>

		</div><!-- row -->

		@if(!isset($video->user_id))
			<input type="hidden" name="user_id" id="user_id" value="{{ Auth::user()->id }}" />
		@endif

		@if(isset($video->id))
			<input type="hidden" id="id" name="id" value="{{ $video->id }}" />
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />
		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

	</form>

	<div class="clear"></div>
</div>

@section('javascript')
	<script type="text/javascript" src="{{ '/application/assets/admin/js/tinymce/tinymce.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/application/assets/js/tagsinput/jquery.tagsinput.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/application/assets/js/jquery.mask.min.js' }}"></script>
	<script type="text/javascript" src="{{ '/content/themes/default/assets/js/video.js' }}"></script>

	<!-- RESIZING FLUID VIDEO for VIDEO JS -->
	<script type="text/javascript">
	  // Once the video is ready
	  videojs("video_player").ready(function(){

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

	<script type="text/javascript">
		$ = jQuery;

		$(document).ready(function(){
			console.log($(this).val());

			$('#duration').mask('00:00:00');
			$('#tags').tagsInput();

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

		});
	</script>
@stop

@stop
