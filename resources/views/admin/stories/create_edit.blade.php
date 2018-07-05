@extends('admin.master')

@section('content')

<style>
.placepicker-map {
  min-height: 250px;
}
</style>

<div id="admin-container">
<!-- This is where -->

	<ol class="breadcrumb">
		<li> <a href="/admin/stories"><i class="fa fa-tasks"></i> Stories</a> </li>
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

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Type</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<select name="type" id="type" class="form-control">
									@foreach(config('stories.story_type') as $type)
									<option value="{{ $type }}" {{ (isset($story) && $story->type==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $type)) }}</option>
									@endforeach
								</select>
							</div>
						</div>

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Assets</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<img id="story_image_source" src="{{ (!empty($story->thumb) ? $story->thumb : '/assets/frontend/images/placeholder.png') }}" border="0">
								<span class="input-group">
						            <span class="input-group-addon">
						                Upload Image
						            </span>
									<input type="text" class="form-control" id="story_image_source_url" name="story_image_source_url" placeholder="" value="" />
						            <input type="file" multiple="true" class="form-control" name="story_image" id="story_image"/>
						        </span>
							</div>
						</div>

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

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Licensing Information</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<span class="input-group">
						            <span class="input-group-addon">
						                Source URL
						            </span>
									<select name="source_type" id="source_type" class="form-control drop-25">
										<option value="other">Other</option>
								    </select>
									<input type="text" class="form-control js-story-get-source drop-75" name="source" id="source" placeholder="" value="@if(!empty($story->source)){{ $story->source }}@endif" />
						        </span>
								<br />
								<span class="input-group has-feedback">
									<span class="input-group-addon">
						                Contact
						            </span>
									<input type="button" class="form-control btn-clear" name="contact_add" id="contact_add" value="Add New Contact" />
						        </span>
								<div class="js-contact-add">
									<input type="text" class="form-control" name="contact_full_name" id="contact_full_name" placeholder="Enter contact full name" value="" />
									<input type="text" class="form-control" name="contact_email" id="contact_email" placeholder="Enter contact email" value="" />
									<input type="text" class="form-control" name="contact_tel" id="contact_tel" placeholder="Enter contact telephone" value="" />
								</div>
								<div class="js-contact-search">
									<select name="contact_id" id="contact_id" class="selectpicker" data-live-search="true" data-width="100%" title="Search and attach contact...">
										@if(!empty($contacts))
											@foreach($contacts as $contact)
												<option value="{{ $contact->id }}"{{ (isset($story) && $story->contact_id==$contact->id) ? ' selected' : '' }}>{{ $contact->full_name }}</option>
											@endforeach
										@endif
									</select>
						        </div>
								<br />
								<div class="input-group">
									<label class="checkbox-inline" for="contact_is_owner">
										<input type="checkbox" name="contact_is_owner" id="contact_is_owner" value="1" {{ (isset($story) && $story->contact_is_owner==1) ? 'checked' : '' }}>
										Contact is owner
									</label>
									<label class="checkbox-inline" for="allow_publish">
										<input type="checkbox" name="allow_publish" id="allow_publish" value="1" {{ (isset($story) && $story->allow_publish==1) ? 'checked' : '' }}>
										Happy to publish
									</label>
									<label class="checkbox-inline" for="has_permission">
										<input type="checkbox" name="permission" id="permission" value="1" {{ (isset($story) && $story->permission==1) ? 'checked' : '' }}>
										Has permission
									</label>
								</div>
								<br />
								<span class="input-group has-feedback">
									<span class="input-group-addon">
						                Date Sourced
						            </span>
				                    <input type="text" class="form-control" name="sourced_at" id="sourced_at" value="@if(!empty($story->sourced_at)){{ $story->sourced_at }}@endif" />
				                    <i class="glyphicon glyphicon-calendar form-control-feedback"></i>
						        </span>
								<br />
								<span class="input-group">
									<span class="input-group-addon">
						                Location
						            </span>
				                    <input type="text" class="form-control placepicker" data-map-container-id="locationCollapse" name="location" id="location" value="@if(!empty($story->location)){{ $story->location }}@endif" />
									<div id="locationCollapse" class="collapse">
										<div class="placepicker-map thumbnail"></div>
									</div>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Removed from Social for
						            </span>
									<select name="removed_from_social" id="removed_from_social" class="form-control">
										@foreach(config('stories.removed_from_social') as $from)
										<option value="{{ $from }}" {{ (isset($story) && $story->removed_from_social==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $from)) }}</option>
										@endforeach
									</select>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Problem Status
						            </span>
									<select name="problem_status" id="problem_status" class="form-control">
										@foreach(config('stories.problem_status') as $problem)
										<option value="{{ $problem }}" {{ (isset($story) && $story->problem_status==$problem) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $problem)) }}</option>
										@endforeach
									</select>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Categorisation
						            </span>
									<select name="category" id="category" class="form-control drop-5050">
										<option value="">Select vertical</option>
										@foreach($video_categories as $category)
										<option value="{{ $category->id }}" {{ (isset($story) && $story->vertical==$category) ? 'selected' : '' }}>{{ $category->name }}</option>
										@endforeach
									</select>
									<select name="collection" id="collection" class="form-control drop-5050">
										<option value="">Select collection</option>
										@foreach($video_collections as $collection)
										<option value="{{ $collection->id }}" {{ (isset($story) && $story->collection==$collection) ? 'selected' : '' }}>{{ $collection->name }}</option>
										@endforeach
									</select>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Submitted to
						            </span>
									<select name="submitted_to" id="submitted_to" class="selectpicker" data-width="100%" title="Select who you submitted to" multiple>
										@foreach(config('stories.submitted_to') as $site)
										<option value="{{ $site }}" {{ (isset($story) && (in_array($site, explode(',', $story->submitted_to, 0)))) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $site)) }}</option>
										@endforeach
									</select>
						        </span>
							</div>
						</div>

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Comments</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block;">
								<textarea class="form-control" name="excerpt" id="excerpt">@if(!empty($story->excerpt)){{ htmlspecialchars($story->excerpt) }}@endif</textarea>
							</div>
						</div>

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Include Video Assets</div>

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

			<div class="col-sm-4"> <!-- third column -->

				<div class="row">

					<div class="col-sm-12">

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Rights Status</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block; background: #fcfcfc;">
								<span class="input-group">
						            <span class="input-group-addon">
						                License Type
						            </span>
									<select name="rights" id="rights" class="form-control">
										<option value="">Set status</option>
										@foreach(config('stories.rights') as $status)
										<option value="{{ $status }}">{{ ucwords(str_replace('-', ' ', $status)) }}</option>
										@endforeach
									</select>
									<select name="rights_type" id="rights_type" class="form-control">
										<option value="">Set rights type</option>
										@foreach(config('stories.rights_type') as $rights)
										<option value="{{ $rights }}">{{ ucwords(str_replace('-', ' ', $rights)) }}</option>
										@endforeach
									</select>
						        </span>
								<div class="story-dividers">
									<h5 class="text-success"><i class="fa fa-check-square-o"></i> Owner pending</h5>
									<h5 class="text-danger"><i class="fa fa-square-o"></i> Submitted to pending</h5>
									<h5 class="text-danger"><i class="fa fa-square-o"></i> Publication status pending</h5>
									<h5 class="text-danger"><i class="fa fa-square-o"></i> Permission pending</h5>
									<h5 class="text-danger"><i class="fa fa-square-o"></i> Rights status pending</h5>
								</div>
								<span class="input-group">
						            <span class="input-group-addon">
						                License Notes
						            </span>
									<textarea class="form-control" name="notes" id="notes" rows="7"></textarea>
						        </span>
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

			</div>

		</div>

		@if(isset($story->id))
			<input type="hidden" id="id" name="id" value="{{ $story->id }}" />
			<input type="hidden" id="alpha_id" name="alpha_id" value="{{ $story->alpha_id }}" />
			<a href="{{ url('admin/stories/delete/'.$story->alpha_id) }}" class="btn btn-danger">Delete Story</a>
		@endif

		<input type="hidden" name="_token" value="<?= csrf_token() ?>" />

		@if(isset($story->id)&&isset($decision)&&$decision=='licensing')
			<a href="{{ url('admin/stories/status/licensed/'.$story->alpha_id) }}" class="btn btn-primary pull-right" style="margin-left:10px;">License Story</a>
	    @endif

		<input type="submit" value="{{ $button_text }}" class="btn btn-success pull-right" />

		@if(isset($story)&&isset($decision)&&$decision!='content-sourced')
			<a href="{{ $story->url }}" class="btn btn-grey pull-right" target="_blank" style="margin-right:10px;">View Story in Wordpress</a>
		@endif

	</form>

	<div class="clear"></div>
</div>


	@section('javascript')

	<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuut3P8ipXPBhj93RZiymyThtzovaswws&libraries=places"></script>
	<script type="text/javascript" src="https://benignware.github.io/jquery-placepicker/js/jquery.placepicker.min.js"></script> -->

	<script type="text/javascript">

	$ = jQuery;

	$(document).ready(function(){

		$('#contact_add').click(function(e){
			e.preventDefault();
			if($(this).val()=='Add Contact') {
				$(this).val('clear x');
				$('.js-contact-search').hide();
				$('.js-contact-add').show();
			} else {
				$(this).val('Add Contact');
				$('#contact_full_name').val('');
				$('#contact_email').val('');
				$('#contact_tel').val('');
				$('.js-contact-search').show();
				$('.js-contact-add').hide();
			}
		});

		$('#sourced_at').datetimepicker({
			// format: 'YYYY-MM-DD HH:MM:SS',
			defaultDate: $.now()
		});

		// var mapPlacepicker = $(".placepicker").placepicker({placeChanged: function(place) {
		// 	var location_value = place.formatted_address +" Latitude" +this.getLocation().latitude + " Longitude" + this.getLocation().longitude;
		//
		// }});
		//
		// $(".placepicker").each(function() {
		// 	var target = this;
		// 	var $collapse = $(this).parents('.form-group').next('.collapse');
		// 	var $map = $collapse.find('.another-map-class');
		// 	var placepicker = $(this).placepicker({
		// 		map: $map.get(0),
		//
		// 	}).data('placepicker');
		// });

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
