@extends('admin.master')


@section('content')

@php use App\Http\Controllers\Admin\AdminStoryController @endphp

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
                <div class="col-md-2">
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

                <div class="col-md-2">
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

				<div class="col-md-2">
					<div class="form-group">
						<select id="assigned_to" name="assigned_to" class="form-control" title="Assign To">
							<option value="">Assigned To</option>
							@foreach($users as $user)
							<option value="{{ $user->id }}" @if($assigned_to==$user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
							@endforeach
						</select>
					</div>
				</div>

				<!-- <div class="col-md-2">
					Reserved space for more filters
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
                                    <h3><a href="{{ url('admin/stories/edit/'.$story->alpha_id.'/?decision='.$decision) }}" title="Edit Story on Sniffr">{{ $story->title }}</a></h3>
                                    <p>
										<a href="@if($story->source) {{ $story->source }} @else # @endif" class="js-story-show-source btn btn-mini-info" title="Preview Source">
											<i class="fa fa-info"></i>
										</a>

										@if($story->url)
										<a href="{{ $story->url }}" class="btn btn-mini-info" title="View on Wordpress" target="_blank">
											<i class="fa fa-wordpress"></i>
										</a>
										@endif

										@if($story->author)
										<a href="#" class="btn btn-mini-info pull-right" title="Author on Wordpress">
											<i class="fa fa-id-badge"></i> <strong>{{ $story->author }}</strong>
										</a>
										@endif
									</p>
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
                                                <option value="">Priority</option>
                                                @foreach(config('stories.priorities') as $priority)
                    							<option value="{{ $priority }}" @if($story->priority==$priority) selected @endif>{{ ucwords(str_replace('-', ' ', $priority)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                        <div class="options-body">
                                            <select id="destination" name="destination" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Destination">
                                                <option value="">Destination</option>
                                                @foreach(config('stories.destinations') as $destination)
                    							<option value="{{ $destination }}" @if($story->destination==$destination) selected @endif>{{ ucwords(str_replace('-', ' ', $destination)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                        <div class="options-body">
											<select id="statex" name="statex" class="btn btn-mini no-caret">
												<option>{{ AdminStoryController::getStateValue($story->state)['dropdown'] }}</option>
											</select>
                                        </div>
                                        <hr>
                                        <div class="options-body">
											<!-- <strong>Assigned in Sniffr:</strong> -->
                                            <select id="assign_to" name="assign_to" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Assign To">
                                                <option value="">Select User</option>
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
                                <div class="album-info-extra">
                                    <i class="fa fa-file-o" title="Created"></i> <strong>Created:</strong> {{ date('jS M Y h:i:s', strtotime($story->updated_at)) }} <br>

									@if(isset($story->contact))
										@if($story->contacted_at && $story->contact_made)
											<i class="fa fa-check-circle-o" title="Made Contact"></i>
											<strong>Made Contact:</strong>
											<a href="#">{{ date('jS M h:i:s',strtotime($story->contacted_at)) }}</a>
										@elseif($story->contacted_at && !$story->contact_made)
											<i class="fa fa-clock-o" title="Contacted"></i>
											<strong>@if($story->reminders) {{ $story->reminders }} Reminder{{ ($story->reminders>1 ? 's' : '') }} : @else Contacted: @endif</strong>{{ $story->contacted_at ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$story->contacted_at)->diffForHumans() : 'Not yet' }}
											<a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger">{{ $story->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
										@else
											<i class="fa fa-question-circle-o" title="Not Contacted"></i>
											<strong>Not Contacted</strong>
											@if($story->state != 'unapproved')
											<a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger">{{ $story->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
											@endif
										@endif
									@else
										<i class="fa fa-exclamation-circle" title="No Contact"></i>
										<strong>No Contact</strong>
									@endif
                                </div>
                            </div>

                            <div class="album-options no-border">

								@php
									$stateValues = AdminStoryController::getStateValue($story->state);
								@endphp

								@if($stateValues['negative_label']) <a href="#" data-id="{{ $story->alpha_id }}" class="{{ $stateValues['negative_class'] }} btn-mini btn-mini-border left" title="{{ $stateValues['negative_label'] }}"><i class="fa fa-times"></i></a> @endif
								@if($stateValues['positive_label']) <a href="{{ ($story->state=='licensing' ? url('admin/stories/edit/'.$story->alpha_id.'/?decision='.lcfirst($decision)) : '#') }}" data-id="{{ $story->alpha_id }}" class="{{ $stateValues['positive_class'] }} btn-mini btn-mini-border" title="{{ $stateValues['positive_label'] }}"><i class="fa fa-check"></i> {{ $stateValues['positive_label'] }}</a> @endif

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
