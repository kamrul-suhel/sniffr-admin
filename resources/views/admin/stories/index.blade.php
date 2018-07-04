@extends('admin.master')


@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-tasks"></i>
                    @if($decision)
                    <a href="{{ url('admin/stories/?decision='.lcfirst($decision)) }}">
						Stories: {{ ucwords(str_replace('-', ' ', $decision)) }}
					</a>
                    @else
                    <a href="{{ url('admin/stories/'.lcfirst($state)) }}">
						Stories: {!! ($state ? ucfirst($state) : 'All') !!}
					</a>
                    @endif
					<a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New Story
					</a>
                    <a href="#" class="btn btn-primary js-story-refresh pull-right" style="margin-right:10px;">
						<i class="fa fa-refresh"></i>
						Refresh Stories
					</a>
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
                <div class="col-md-3">
					<div class="form-group">
						<select id="decision" name="decision" class="form-control" title="Steps">
							@if(!$decision)
							<option value="">Steps</option>
							@endif
                            @foreach(config('stories.decisions') as $decision_state_key => $decision_state)
							<option value="{{ $decision_state_key }}" @if($decision==@$decision_state_key) selected @endif>{{ ucwords(str_replace('-', ' ', $decision_state_key)) }}</option>
                            @endforeach
						</select>
					</div>
				</div>

                <div class="col-md-3">
					<div class="form-group">
						<select id="state" name="state" class="form-control" title="State">
                            @if($decision)
								@if(!$state)
								<option value="">States</option>
								@endif
                                @foreach(config('stories.decisions.'.$decision) as $current_state => $state_values)
							    <option value="{{ $state_values['value'] }}" @if($state==$state_values['value']) selected @endif>{{ $state_values['dropdown'] }}</option>
                                @endforeach
                            @else
								<option value="">Select a Step first</option>
                            @endif
						</select>
					</div>
				</div>

				<!-- <div class="col-md-3">
					<div class="form-group">
						<select id="state" name="state" class="selectpicker form-control" title="State">
                            @foreach(config('stories.states') as $current_state)
							<option value="{{ $current_state }}" @if($state==@$current_state) selected @endif>{{ ucwords(str_replace('-', ' ', $current_state)) }}</option>
                            @endforeach
						</select>
					</div>
				</div> -->

				<div class="col-md-6">
					<div class="form-group">
						<input type="text" class="form-control" name="search_value" id="search-input" placeholder="Search..." value="{{ Request::get('search_value') }}"> <i class="fa fa-search"></i>
					</div>
				</div>

			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($stories))
		<p>Sorry, there are no stories to show.</p>
	@else

	<div class="gallery-env">
		<div class="row">
			@php
				$currentDay = '';
			@endphp

			@foreach($stories as $story)

				<div class="col-sm-6 col-md-4" id="story-{{ $story->alpha_id }}">

                    @php
        				$panelColour = config('stories.colors');
        			@endphp

					<article class="album {{ $panelColour[$story->state] }}">
                        <div class="album-story-update" id="story-update-{{ $story->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</div>
                        <div class="album-story-update-error" id="story-update-error-{{ $story->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</div>
						<section class="album-info album-grey">
                            <div class="row padded-bottom">
                                <div class="col-sm-12">
                                    <h3><a href="{{ url('admin/stories/edit/'.$story->alpha_id.'/?decision='.$decision) }}">{{ $story->title }}</a></h3>
                                    <p><a href="@if($story->source) {{ $story->source }} @else # @endif" class="js-story-show-source btn btn-mini-info" title="Preview Source"><i class="fa fa-info"></i></a> <strong>Source:</strong> @if($story->source) {{ $story->source }} @else N/A @endif</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="content-thumb" style="background-image:url({{ ($story->thumb ? $story->thumb : '/assets/frontend/images/placeholder.png') }})">
                                    </div>
                                </div>
                                <div class="col-sm-4 no-padding">
                                    <div class="options">
                                        <div class="options-body">
                                            <select id="priority" name="priority" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Priority">
                                                <option value"">Priority</option>
                                                @foreach(config('stories.priorities') as $priority)
                    							<option value="{{ $priority }}" @if($story->priority==$priority) selected @endif>{{ ucwords(str_replace('-', ' ', $priority)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                        <div class="options-body">
                                            <select id="destination" name="destination" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Destination">
                                                <option value"">Destination</option>
                                                @foreach(config('stories.destinations') as $destination)
                    							<option value="{{ $destination }}" @if($story->destination==$destination) selected @endif>{{ ucwords(str_replace('-', ' ', $destination)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                        <div class="options-body">
                                            <select id="state" name="state" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="State">
												@foreach(config('stories.states') as $current_state)
                    							<option value="{{ $current_state }}" @if($story->state==$current_state) selected @endif>{{ ucwords(str_replace('-', ' ', $current_state)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                        <hr>
                                        <div class="options-body">
                                            <select id="assign_to" name="assign_to" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Assign To">
                                                <option value"">Assign To</option>
                                                @foreach($users as $user)
                    							<option value="{{ $user->id }}" @if($story->user()->first()->id==$user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</section>

                        <footer>
							<div class="album-images-count">
                                <p style="margin-top:10px;">
                                    <strong>Created:</strong> {{ date('jS M Y h:i:s',strtotime($story->updated_at)) }}<br />
                                    <strong>Assign to:</strong> @if($story->user()->first()->full_name) {{ $story->user()->first()->full_name }} @else {{ $story->user()->first()->username }} @endif
                                </p>
                            </div>
                            <div class="album-options">
                                @if($story->state == 'unapproved')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state rejected btn-mini btn-mini-border left" title="Reject"><i class="fa fa-times"></i></a>
                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state approved btn-mini btn-mini-border" title="Approve"><i class="fa fa-check"></i> Approve</a>

                                @elseif($story->state == 'approved')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state rejected btn-mini btn-mini-border left" title="Reject"><i class="fa fa-times"></i></a>
                                    @if($decision=='content-sourced')
                                        <a href="#" data-id="{{ $story->alpha_id }}" class="btn-mini btn-mini-border" title="Approved"><i class="fa fa-thumbs-up"></i> Approved</a>
                                    @else
                                        <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state licensing btn-mini btn-mini-border" title="License Story"><i class="fa fa-check"></i> License</a>
                                    @endif

                                @elseif($story->state == 'unlicensed')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state rejected btn-mini btn-mini-border left" title="Reject"><i class="fa fa-times"></i></a>
                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state licensing btn-mini btn-mini-border" title="License Story"><i class="fa fa-check"></i> License</a>

                                @elseif($story->state == 'licensing')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state approved btn-mini btn-mini-border left" title="Back to Sourced"><i class="fa fa-times"></i></a>
                                    <a href="{{ url('admin/stories/edit/'.$story->alpha_id.'/?decision='.lcfirst($decision)) }}" class="text-success btn-mini btn-mini-border" title="Edit License"> Edit License</a>

                                @elseif($story->state == 'licensed'||$story->state == 'hacks-unassigned')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state unlicensed btn-mini btn-mini-border left" title="Unlicensed"><i class="fa fa-times"></i></a>
                                    @if($decision=='licensing-in-progress')
                                        <a href="#" data-id="{{ $story->alpha_id }}" class="btn-mini btn-mini-border" title="Licensed"><i class="fa fa-thumbs-up"></i> Licensed</a>
                                    @else
                                        <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state writing-inprogress btn-mini btn-mini-border" title="Write Story"><i class="fa fa-check"></i> Write</a>
                                    @endif

                                @elseif($story->state == 'writing-inprogress'||$story->state == 'subs-rejected')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state writing-completed btn-mini btn-mini-border" title="Submit to Sub"><i class="fa fa-check"></i> Submit to Sub</a>

                                @elseif($story->state == 'subs-unassigned'||$story->state == 'writing-completed')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state writing-inprogress btn-mini btn-mini-border left" title="Back to Writing"><i class="fa fa-times"></i></a>
                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state subs-inprogress btn-mini btn-mini-border left" title="Sub Story"><i class="fa fa-check"></i> Sub Story</a>

                                @elseif($story->state == 'subs-inprogress')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state subs-unassigned btn-mini btn-mini-border left" title="Back to Subs"><i class="fa fa-times"></i></a>
                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state subs-approved btn-mini btn-mini-border left" title="Story Ready"><i class="fa fa-check"></i> Sub Ready</a>

                                @elseif($story->state == 'subs-approved')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state published btn-mini btn-mini-border left" title="Ready to Publish"> Ready to Publish</a>

                                @elseif($story->state == 'published')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state subs-inprogress btn-mini btn-mini-border left" title="Back to Subbing"><i class="fa fa-times"></i></a>
                                    <a href="{{ ($story->url ? $story->url : '#') }}" target="_blank" class="btn-mini btn-mini-border" title="View Story"> View Story</a>

                                @elseif($story->state == 'rejected')

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="js-story-state unapproved btn-mini btn-mini-border left" title="Rejected"><i class="fa fa-times"></i> Rejected</a>

                                @else

                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-story-state unlicensed btn-mini btn-mini-border left" title="Unlicensed"><i class="fa fa-times"></i></a>
                                    <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-story-state writing-inprogress btn-mini btn-mini-border left" title="Next State"><i class="fa fa-check"></i> Pick Up</a>

                                @endif
                            </div>
                        </footer>

					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $stories->appends(request()->except('page'))->render(); ?></div>
		</div>
	</div>
	@endif

    <!-- Modal -->
    <div class="modal fade" id="sourceModal" tabindex="-1" role="dialog" aria-labelledby="sourceModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <iframe id="sourceFrame" width="100%" height="550"></iframe>
            </div>
        </div>
    </div>

    @section('javascript')

	<script type="text/javascript">
	$ = jQuery;

	$(document).ready(function(){

		// $('#decision').change(function(e) {
        //     e.preventDefault();
		// 	var decision = $(this).val();
		// 	var search = $.url('?search_value')
		// 	console.log(search);
        //     window.location.href = 'http://example.com';
		// });

	});
	</script>

	@stop

@stop
