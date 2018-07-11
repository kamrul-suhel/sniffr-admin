@extends('admin.master')

@section('content')

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

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Story Assets</div>

								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>

							<div class="panel-body" style="display: block;">
								<div id="story_image_source" style="background-image:url('{{ (!empty($story->thumb) ? $story->thumb : '/assets/frontend/images/placeholder.png') }}');">
									<div class="story_image_asset_icon">
										<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
									</div>
								</div>
								@if(isset($story)&&$story->assets()->count()>0)
								<div class="row">
									@foreach($story->assets()->get() as $asset)
										<div class="col-md-4">
											<a id="story_image_asset_{{ $asset->alpha_id }}" href="#">
												<div class="story_image_asset" style="background:url('{{ (!empty($asset->thumbnail) ? $asset->thumbnail : ($asset->url ? $asset->url : '/assets/frontend/images/placeholder.png')) }}');">
													<div class="story_image_asset_icon">
														@if(!$asset->jw_player_code)
														<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACHklEQVR4Ae3agWYcURTG8aMVW7WU0gJJg6F01rbzHehTVEELENAnSJ4hFiiobkq6T5C8QGkoqsAuBCgUpUBsbVslmUYFI1+7IXdy71y+/wXMLH7rHAbXlFJKqcs0WMUWDvzI6ys+RzjA1mDV2qzs+z5OvI53cOL7Zd/aqehh5nX8g1nRszbCjtdpDnYsPBQ4TgY4RmGh+bbXCc+2hYZpSgBmFpr/TAnwRTigTnsEEEAAAa72CMA/aB8ggAACCCCAAAIIIIAAAggggAAC4DXGOQM++Yqv4GOugK/VHTtteBffMgTg18PKzsJj/901wARvLwA8t0Z40SkADv3m+g0cLnnjpZ0Lu90BLKoHdhoKX/znjQ923c7Fy5wMgA07C8/++caX8rZxvMyJABNr5G/o+Y/hwCha5ngAnn5rxJvgT42iZY4J4OlvRJuAkXG8zKkA2DCusQl4Z9eM4mWOC6Dp5/zV3+ef/ZZRS5Y5HoCmn//VKb4P7xu1ZJkjAmj6uUfr1ROjli1zXABNf3jYjQmYWAvxMkcA0PQHxcscA8DTHx4vc3uA8OkPW+ZwwNzrhGceDEh/5SwUMEoKGAUDqnspr136WjDADOP0F1+DAEUP0w5fPWYAV/axF/vyN/bKvlkgoJmv+Wac6/f+3jd59oMB8RNAAAEEiJIA88xv5mKaO2CUHYC/97MCcBhnB+Dv/QwB/L2fMYC/97sJUEoppf4AxF4KMk77RSYAAAAASUVORK5CYII=);"></div>
														@else
														<div style="display:inline-block;width:25px;height:25px;background-repeat:no-repeat;background-size: contain;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAABm0lEQVR4Ae3aAWYDARAF0AVWK0doUlioBDpzm4IeIjlD7BEaaKEAyRGaI+xCzxFLW5BsoT5AdWe74/P/AIh4/MgkO4WiKIqiDMlqbhs7+sn7f56THW2zmhdjZjnzg128n27s4oflrBgnVWmt99OPtVU5CsB23ueM7Yp4rLJzGuBsVRjgW+8TZxsGWJMJsDYM8K9MgH/EAX3uCCCAAH+LAPbon9SAorA7e58Q8NsLhrzhzZW/8gJ+giqxAlAlXgCqxAtAlZgBqBIvAFXiBaBKzABUiReAKvECUCVmAKrEC0CVeAGoEjMAVeIFoErUgBdVKAvgD8QfYr+2Z32RZQFQHUYAqqN1OgGA6jACUB39qE8AoDqMAFRHfy0mAFAdRgCqwwkgf8CB6jAAJhgBBBBAgC4V0AUB+SdncUCdCqjDgPvbzLNLXwwHIPaUevgaB1SlNVmnx1EAjr9tP/Xxt+1x/B0CIL7w9TTn9/7ma3Q/AGCJAAIIIEAsAnTkp8XWsANqcgD2fVYA9n1eAPZ9VgD2fQ5AYN9PByiKoijKN3P3T8TyoBKRAAAAAElFTkSuQmCC);"></div>
														@endif
													</div>
												</div>
											</a>
										</div>
									@endforeach
							    </div>
								<hr />
								@endif
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
									<input type="text" class="form-control js-story-get-source drop-75" name="source" id="source" placeholder="" value="{{ isset($story) ? $story->source : '' }}" />
						        </span>

								<br />

								<span class="input-group">
									<div class="input-group" id="selectpicker-creator">
										<span class="input-group-addon">Contact</span>
										{{ Form::text('js-autocomplete-contact', '', ['id' =>  'js-autocomplete-contact', 'placeholder' =>  'Search contacts', 'class' => 'form-control'])}}
									</div>

									<span class="input-group-btn">
										<button id="contact-add" class="btn btn-default js-contact" type="button" data-toggle="modal" data-target="#add_contact_modal">New</button>
									</span>

									<input type="hidden" id="contact-id" name="contact_id" value="{{ isset($story) ? $story->contact_id : ''  }}" />
						        </span>

								@if(!empty($story))

								<br />

								<div class="input-group">
									<label class="checkbox-inline" for="contact_is_owner">
										<input type="checkbox" name="contact_is_owner" id="contact_is_owner" class="js-contact-is-owner" value="1" {{ (isset($story)  &&  $story->contact_is_owner==1) ? 'checked' : '' }}>
										Contact is owner
									</label>
									<label class="checkbox-inline" for="allow_publish">
										<input type="checkbox" name="allow_publish" id="allow_publish" class="js-allow-publish" value="1" {{ (isset($story)  &&  $story->allow_publish==1) ? 'checked' : '' }}>
										Happy to publish
									</label>
									<label class="checkbox-inline" for="permission">
										<input type="checkbox" name="permission" id="permission" class="js-permission" value="1" {{ (isset($story)  &&  $story->permission==1) ? 'checked' : '' }}>
										Has permission
									</label>
								</div>

								<br />

								<span class="input-group has-feedback">
									<span class="input-group-addon">
						                Date Sourced
						            </span>
				                    <input type="text" class="form-control" name="sourced_at" id="sourced_at" />
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
										<option value="{{ $from }}" {{ (isset($story)  &&  $story->removed_from_social==$type) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $from)) }}</option>
										@endforeach
									</select>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Problem Status
						            </span>
									<select name="problem_status" id="problem_status" class="form-control js-problem-status">
										<option value="">No Problem</option>
										@foreach(config('stories.problem_status') as $problem)
										<option value="{{ $problem }}" {{ (isset($story)  &&  $story->problem_status==$problem) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $problem)) }}</option>
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
										<option value="{{ $category->id }}" {{ (isset($story)  &&  $story->story_category_id==$category->id) ? 'selected' : '' }}>{{ $category->name }}</option>
										@endforeach
									</select>
									<select name="collection" id="collection" class="form-control drop-5050">
										<option value="">Select collection</option>
										@foreach($video_collections as $collection)
										<option value="{{ $collection->id }}" {{ (isset($story)  &&  $story->story_collection_id==$collection->id) ? 'selected' : '' }}>{{ $collection->name }}</option>
										@endforeach
									</select>
						        </span>
								<br />
								<span class="input-group">
						            <span class="input-group-addon">
						                Submitted to
						            </span>
									<select name="submitted_to[]" id="submitted_to" class="selectpicker js-submitted-to" data-width="100%" title="Select who you submitted to" multiple>
										@foreach(config('stories.submitted_to') as $site)
										<option value="{{ $site }}" {{ (isset($story) && (in_array($site, explode(',', $story->submitted_to)))) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $site)) }}</option>
										@endforeach
									</select>
						        </span>

								@endif
							</div>
						</div>

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

						<div class="panel panel-primary" data-collapsed="0">
							<div class="panel-heading">
								<div class="panel-title">Rights Status</div>
								<div class="panel-options">
									<a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
								</div>
							</div>
							<div class="panel-body" style="display: block; background: #fcfcfc;">
								<div class="status-box">
									@if(isset($story) && $story->rights=='exclusive')
									<div class="status-box-inner success" id="rights-box-status">Exclusive</div>
									@elseif(isset($story) && $story->rights=='non-exclusive')
									<div class="status-box-inner danger" id="rights-box-status">Non-Exclusive</div>
									@else
									<div class="status-box-inner" id="rights-box-status">Pending</div>
									@endif

									@if(isset($story))
									<div class="status-box-inner @if(!$story->problem_status) hidden @else warning @endif" id="problem-box-status">{{ ucwords(str_replace('-', ' ', $story->problem_status)) }}</div>
									@endif
								</div>
								<span class="input-group">
						            <span class="input-group-addon">
						                License Type
						            </span>
									<select name="rights" id="rights" class="form-control js-rights-status">
										<option value="">Set status</option>
										@foreach(config('stories.rights') as $status)
										<option value="{{ $status }}" {{ (isset($story)  &&  $story->rights==$status) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $status)) }}</option>
										@endforeach
									</select>
									<select name="rights_type" id="rights_type" class="form-control">
										<option value="">Set rights type</option>
										@foreach(config('stories.rights_type') as $rights)
										<option value="{{ $rights }}" {{ (isset($story)  &&  $story->rights_type==$rights) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $rights)) }}</option>
										@endforeach
									</select>
						        </span>
								<div class="story-dividers">
									<div id="owner-status">
										@if(isset($story) && $story->contact_is_owner)
										<h5 class="text-success"><i class="fa fa-check-square-o"></i> Contact is owner </h5>
										@else
										<h5 class="text-danger"><i class="fa fa-square-o"></i> Owner pending </h5>
										@endif
									</div>
									<div id="submitted-status">
										@if(isset($story) && $story->submitted_to)
										<h5 class="text-success"><i class="fa fa-check-square-o"></i> Submitted to {{ ((isset($story->submitted_to) && count(explode(',', $story->submitted_to)))>1) ? 'multiple' : ucwords(str_replace('-', ' ', $story->submitted_to)) }}</h5>
										@else
										<h5 class="text-danger"><i class="fa fa-square-o"></i> Submitted to pending</h5>
										@endif
									</div>
									<div id="publish-status">
										@if(isset($story) && $story->allow_publish)
										<h5 class="text-success"><i class="fa fa-check-square-o"></i> Happy to publish </h5>
										@else
										<h5 class="text-danger"><i class="fa fa-square-o"></i> Publication status pending </h5>
										@endif
									</div>
									<div id="permission-status">
										@if(isset($story) && $story->permission)
										<h5 class="text-success"><i class="fa fa-check-square-o"></i> Has permission </h5>
										@else
										<h5 class="text-danger"><i class="fa fa-square-o"></i> Permission pending </h5>
										@endif
									</div>
									<div id="rights-status">
										@if(isset($story) && $story->rights)
										<h5 class="@if($story->rights=='exclusive') text-success @else text-warning @endif"><i class="fa fa-check-square-o"></i> {{ ucwords(str_replace('-', ' ', $story->rights)) }} rights </h5>
										@else
										<h5 class="text-danger"><i class="fa fa-square-o"></i> Rights status pending </h5>
										@endif
									</div>
								</div>
							</div>
						</div>

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
