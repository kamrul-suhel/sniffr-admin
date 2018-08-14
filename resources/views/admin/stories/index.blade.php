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

						<a href="{{ url('admin/stories/'.lcfirst($chosenState)) }}">
							- {!! ($chosenState ? ucwords(str_replace('-', ' ', $chosenState)) : 'All') !!} ({{$stories->count()}})
						</a>
					</a>
                    @endif
					<a href="{{ url('admin/stories/create/?decision='.(isset($decision) ? $decision : '')) }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New Story
					</a>
					@if($user->username == 'ianlainchbury' || $user->username == 'mikewright' || $user->username == 'hemmitkerrai')
                    <a href="#" class="btn btn-primary js-story-refresh pull-right" style="margin-right:10px;">
						<i class="fa fa-refresh"></i>
						Refresh Stories
					</a>
					@endif
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
                <div class="col-md-2">
					<div class="form-group">
						<select id="state" name="state" class="form-control" title="Steps">
                            @foreach(config('stories.decisions') as $decision_state_key => $decision_state)
							<optgroup label="{{ ucwords(str_replace('-', ' ', $decision_state_key)) }}">
								@foreach(config('stories.decisions.'.$decision_state_key) as $current_state => $state_values)
                                    <option value="{{ $decision_state_key.'--'.$state_values['value'] }}" @if($state==$decision_state_key.'--'.$state_values['value']) selected @endif>
										{{ $state_values['dropdown'] }}
									</option>
                                @endforeach
							</optgroup>
                            @endforeach
						</select>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<select id="assignee" name="assignee" class="form-control" title="Assign To">
							<option value="">Assignee</option>
							@foreach($users as $user)
							<option value="{{ $user->id }}" @if($assignee==$user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
							@endforeach
						</select>
					</div>
				</div>

				<!-- <div class="col-md-2">
					Reserved space for more filters
				</div> -->

				<div class="col-md-6">
					<div class="form-group">
						<input type="text" class="form-control" name="term" id="search-input" placeholder="Search..." value="{{ Request::get('term') }}"> <i class="fa fa-search"></i>
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

				@php
					$date = \Carbon\Carbon::parse($story->updated_at)->isToday() ? 'Today' : date('jS M',strtotime($story->updated_at));
					$panelColour = ($story->priority=='high' ? 'danger' : ($story->priority=='medium' ? 'warning' : '')); //config('stories.colors'); $panelColour[$story->state]
				@endphp

				@if($currentDay != $date)
					@php
						$currentDay = $date;
					@endphp
					<div class="col-xs-12 date-header">
						<h2>
							{{ $date }}
						</h2>
					</div>
				@endif

				<div class="col-sm-6 col-md-4" id="story-{{ $story->alpha_id }}">

					<article class="album {{ $panelColour }}">
                        <div class="album-story-update" id="story-update-{{ $story->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</div>
                        <div class="album-story-update-error" id="story-update-error-{{ $story->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</div>
						<section class="album-info album-grey">
                            <div class="row padded-bottom">
                                <div class="col-sm-12">
                                    <h3><a href="{{ url('admin/stories/edit/'.$story->alpha_id.'/?decision='.$decision) }}" title="Edit Story on Sniffr">{{ $story->title }}</a></h3>
                                    <p>
										@if($story->contact)
											@if($story->contact->email)
												<a href="{{ url('admin/contacts/'.$story->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-envelope"></i> {{ $story->contact->email }}
												</a>
											@elseif($story->contact->twitter)
												<a href="https://twitter.com/{{ $story->contact->twitter }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-twitter"></i> {{ $story->contact->twitter }}
												</a>
											@elseif($story->contact->reddit)
												<a href="https://www.reddit.com/user/{{ $story->contact->reddit }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-reddit"></i> {{ $story->contact->reddit }}
												</a>
											@elseif($story->contact->imgur)
												<a href="https://imgur.com/user/{{ $story->contact->imgur }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-italic"></i> {{ $story->contact->imgur }}
												</a>
											@elseif($story->contact->instagram)
												<a href="{{ url('admin/contacts/'.$story->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
													<i class="fa fa-instagram"></i> {{ $story->contact->instagram }}
												</a>
											@elseif($story->contact->youtube)
												<a href="{{ url('admin/contacts/'.$story->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
													<i class="fa fa-youtube"></i> {{ $story->contact->youtube }}
												</a>
											@elseif($story->contact->facebook)
												<a href="{{ url('admin/contacts/'.$story->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact">
													<i class="fa fa-facebook"></i> {{ $story->contact->facebook }}
												</a>
											@endif
										@else
											<span class="btn btn-mini-info"><i class="fa fa-address-book"></i> No Contact</span>
										@endif


										@if($story->source)
										<a href="{{ $story->source }}" class="btn btn-mini-info pull-right" title="View Source" target="_blank">
											<i class="fa fa-info"></i>
										</a>
										@endif

										@if($story->wp_id)
										<a href="{{ 'https://'.(env('APP_ENV') == 'prod' ? 'www' : 'testing').'.unilad.co.uk/?p='.$story->wp_id.'&preview=true' }}" class="btn btn-mini-info pull-right" title="View on Wordpress" target="_blank">
											<i class="fa fa-wordpress"></i> @if($story->author) {{ $story->author }} @endif
										</a>
										@endif
									</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="content-thumb" style="background-image:url({{ ($story->thumb ? $story->thumb : '/assets/images/placeholder.png') }})">
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
												@if($decision == 'all')
													<option>{{ $story->state }}</option>
												@else
													@foreach(config('stories.decisions.'.$decision) as $key => $state_values)
														<option value="{{ $key }}" @if($key == $chosenState) selected @endif>{{ $state_values['dropdown'] }}</option>
													@endforeach
												@endif
											</select>
                                        </div>

                                        <hr>

                                        <div class="options-body">
											<!-- <strong>Assigned in Sniffr:</strong> -->
                                            <select id="assign_to" name="assign_to" data-id="{{ $story->alpha_id }}" class="btn btn-mini js-story-update" title="Assign To">
                                                <option value="">Select User</option>
												<?php $storyUserId = $story->user()->first()->id; ?>
                                                @foreach($users as $user)
                    								<option value="{{ $user->id }}" @if($storyUserId == $user->id) selected @endif>
														@if($user->full_name) {{ $user->full_name }}
														@else {{ $user->username }}
														@endif
													</option>
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
											<a href="#" class="btn-mini">{{ date('jS M H:i:s',strtotime($story->contacted_at)) }}</a>
										@elseif($story->contacted_at && !$story->contact_made)
											<i class="fa fa-clock-o" title="Contacted"></i>
											<strong>@if($story->reminders) {{ $story->reminders }} Reminder{{ ($story->reminders>1 ? 's' : '') }} : @else Contacted: @endif</strong>{{ $story->contacted_at ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$story->contacted_at)->diffForHumans() : 'Not yet' }}
											<a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $story->contact->canAutoBump() ? ' Re-send' : ' Manually' }}</a>
											<a href="{{ url('admin/stories/contact_made/'.$story->alpha_id) }}" data-id="{{ $story->alpha_id }}" class="text-success approved btn-mini btn-mini-border" title="Made Contact"><i class="fa fa-square-o"></i> Made Contact</a>
										@else
											<i class="fa fa-question-circle-o" title="Not Contacted"></i>
											<strong>Not Contacted</strong>
											@if($story->state != 'unapproved' && $story->state != 'rejected')
											<a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $story->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
											<a href="{{ url('admin/stories/contact_made/'.$story->alpha_id) }}" data-id="{{ $story->alpha_id }}" class="text-success approved btn-mini btn-mini-border" title="Made Contact"><i class="fa fa-square-o"></i> Made Contact</a>
											@endif
										@endif
									@else
										<i class="fa fa-exclamation-circle" title="No Contact"></i>
										<strong>No Contact</strong>
									@endif
                                </div>
                            </div>

                            <div class="album-options no-border">
								@foreach(config('stories.decisions.'.$decision) as $key => $state_values)
									@if($chosenState == $key)
										@if($state_values['negative_label'])<a href="#" data-id="{{ $story->alpha_id }}" class="{{ $state_values['negative_class'] }} btn-mini btn-mini-border left" title="{{ $state_values['negative_label'] }}"><i class="fa fa-times"></i></a>@endif
										@if($state_values['positive_label'])<a href="{{ ($story->state=='licensing' ? url('admin/stories/edit/'.$story->alpha_id.'/?decision='.lcfirst($decision)) : '#') }}" data-id="{{ $story->alpha_id }}" class="{{ $state_values['positive_class'] }} btn-mini btn-mini-border" title="{{ $state_values['positive_label'] }}"><i class="fa fa-check"></i> {{ $state_values['positive_label'] }}</a> @endif
									@endif
								@endforeach
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
@stop

@section('javascript')
	@include('admin.stories.partials.js')
@stop
