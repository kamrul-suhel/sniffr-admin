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
						<select id="decision" name="decision" class="form-control" title="Steps">
                            @foreach(config('stories.decisions') as $decision_state_key => $decision_state)
							<option value="{{ $decision_state_key }}" @if($decision==@$decision_state_key) selected @endif>{{ ucwords(str_replace('-', ' ', $decision_state_key)) }}</option>
                            @endforeach
						</select>
					</div>
				</div>

                <div class="col-md-2">
					<div class="form-group">
						<select id="state" name="state" class="form-control" title="State">
							@foreach(config('stories.decisions.'.$decision) as $current_state => $state_values)
							<option value="{{ $state_values['value'] }}" @if($state==$state_values['value']) selected @endif>{{ $state_values['dropdown'] }}</option>
							@endforeach
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

			@foreach($stories as $asset)

				@php
					$date = \Carbon\Carbon::parse($asset->updated_at)->isToday() ? 'Today' : date('jS M',strtotime($asset->updated_at));
					$panelColour = ($asset->priority=='high' ? 'danger' : ($asset->priority=='medium' ? 'warning' : '')); //config('stories.colors'); $panelColour[$asset->state]
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

				<div class="col-sm-6 col-md-4" id="story-{{ $asset->alpha_id }}">

					<article class="album {{ $panelColour }}">
                        <div class="album-story-update" id="story-update-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</div>
                        <div class="album-story-update-error" id="story-update-error-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</div>
						<section class="album-info album-grey">
                            <div class="row padded-bottom">
                                <div class="col-sm-12">
                                    <h3><a href="{{ url('admin/stories/edit/'.$asset->alpha_id.'/?decision='.$decision.'&page='.request()->get('page')) }}" title="Edit Story on Sniffr">{{ $asset->title }}</a></h3>
                                    <p>
										@if($asset->contact)
											@if($asset->contact->email)
												<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-envelope"></i> {{ $asset->contact->email }}
												</a>
											@elseif($asset->contact->twitter)
												<a href="https://twitter.com/{{ $asset->contact->twitter }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-twitter"></i> {{ $asset->contact->twitter }}
												</a>
											@elseif($asset->contact->reddit)
												<a href="https://www.reddit.com/user/{{ $asset->contact->reddit }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-reddit"></i> {{ $asset->contact->reddit }}
												</a>
											@elseif($asset->contact->imgur)
												<a href="https://imgur.com/user/{{ $asset->contact->imgur }}" class="btn btn-mini-info" title="View Contact" target="_blank">
													<i class="fa fa-italic"></i> {{ $asset->contact->imgur }}
												</a>
											@elseif($asset->contact->instagram)
												<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
													<i class="fa fa-instagram"></i> {{ $asset->contact->instagram }}
												</a>
											@elseif($asset->contact->youtube)
												<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="Edit Contact">
													<i class="fa fa-youtube"></i> {{ $asset->contact->youtube }}
												</a>
											@elseif($asset->contact->facebook)
												<a href="{{ url('admin/contacts/'.$asset->contact->id.'/edit/') }}" class="btn btn-mini-info" title="View Contact">
													<i class="fa fa-facebook"></i> {{ $asset->contact->facebook }}
												</a>
											@endif
										@else
											<span class="btn btn-mini-info"><i class="fa fa-address-book"></i> No Contact</span>
										@endif

										<button id="comments" class="btn btn-mini-info pull-right" type="button" @click="showModal({{ json_encode($asset) }})"><i class="fa fa-comments"></i> ({{$asset->comments->count()}})</button>

										@if($asset->source)
										<a href="{{ $asset->source }}" class="btn btn-mini-info pull-right" title="View Source" target="_blank">
											<i class="fa fa-info"></i>
										</a>
										@endif

										@if($asset->wp_id)
										<a href="{{ 'https://'.(env('APP_ENV') == 'prod' ? 'www' : 'testing').'.unilad.co.uk/?p='.$asset->wp_id.'&preview=true' }}" class="btn btn-mini-info pull-right" title="View on Wordpress" target="_blank">
											<i class="fa fa-wordpress"></i> @if($asset->author) {{ $asset->author }} @endif
										</a>
										@endif
									</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8">
                                    <div class="content-thumb" style="background-image:url({{ ($asset->thumb ? $asset->thumb : '/assets/images/placeholder.png') }})">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="options">
										<div class="form-group">
											<select id="priority" name="priority" data-id="{{ $asset->alpha_id }}" class="js-story-update" title="Priority">
												<option value="">Priority</option>
												@foreach(config('stories.priorities') as $priority)
													<option value="{{ $priority }}" @if($asset->priority==$priority) selected @endif>{{ ucwords(str_replace('-', ' ', $priority)) }}</option>
												@endforeach
											</select>
										</div>

										<div class="form-group">
											<!-- <strong>Assigned in Sniffr:</strong> -->
											<select id="assign_to" name="assign_to" data-id="{{ $asset->alpha_id }}" class="js-story-update" title="Assign To">
												<option value="">Select User</option>
												<?php $storyUserId = $asset->user()->first()->id; ?>
												@foreach($users as $user)
													<option value="{{ $user->id }}" @if($storyUserId == $user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
												@endforeach
											</select>
										</div>
                                    </div>
                                </div>
                            </div>
						</section>

                        <footer>
							<div class="album-images-count">
                                <div class="album-info-extra">
                                    <i class="fa fa-file-o" title="Created"></i> <strong>Created:</strong> {{ date('jS M Y h:i:s', strtotime($asset->created_at)) }} <br>

									@if(isset($asset->contact))
										@if($asset->contacted_at && $asset->contact_made)
											<i class="fa fa-check-circle-o" title="Made Contact"></i>
											<strong>Made Contact:</strong>
											<a href="#" class="btn-mini">{{ date('jS M H:i:s',strtotime($asset->contacted_at)) }}</a>
										@elseif($asset->contacted_at && !$asset->contact_made)
											<i class="fa fa-clock-o" title="Contacted"></i>
											<strong>@if($asset->reminders) {{ $asset->reminders }} Reminder{{ ($asset->reminders>1 ? 's' : '') }} : @else Contacted: @endif</strong>{{ $asset->contacted_at ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$asset->contacted_at)->diffForHumans() : 'Not yet' }}
											<a href="{{ url('admin/stories/reminder/'.$asset->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $asset->contact->canAutoBump() ? ' Re-send' : ' Manually' }}</a>
											<a href="{{ url('admin/stories/contact_made/'.$asset->alpha_id) }}" data-id="{{ $asset->alpha_id }}" class="text-success approved btn-mini btn-mini-border" title="Made Contact"><i class="fa fa-square-o"></i> Made Contact</a>
										@else
											<i class="fa fa-question-circle-o" title="Not Contacted"></i>
											<strong>Not Contacted</strong>
											@if($asset->state != 'unapproved' && $asset->state != 'rejected')
											<a href="{{ url('admin/stories/reminder/'.$asset->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $asset->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
											<a href="{{ url('admin/stories/contact_made/'.$asset->alpha_id) }}" data-id="{{ $asset->alpha_id }}" class="text-success approved btn-mini btn-mini-border" title="Made Contact"><i class="fa fa-square-o"></i> Made Contact</a>
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
									@if($state == $key)
										@if($state_values['negative_label'])<a href="#" data-id="{{ $asset->alpha_id }}" class="{{ $state_values['negative_class'] }} btn-mini btn-mini-border left" title="{{ $state_values['negative_label'] }}"><i class="fa fa-times"></i></a>@endif
										@if($state_values['positive_label'])<a href="{{ ($asset->state=='licensing' ? url('admin/stories/edit/'.$asset->alpha_id.'/?decision='.lcfirst($decision)) : '#') }}" data-id="{{ $asset->alpha_id }}" class="{{ $state_values['positive_class'] }} btn-mini btn-mini-border" title="{{ $state_values['positive_label'] }}"><i class="fa fa-check"></i> {{ $state_values['positive_label'] }}</a> @endif
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

		<modal v-if="modalVisible" @close="closeModal" asset-type="story"></modal>
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
