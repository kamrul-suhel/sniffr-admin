<div class="gallery-env">
    <div class="col-md-12">
            @php
                $currentDay = '';
            @endphp
            <div class="col-lg-12">
                @foreach($contact->stories as $story)

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
                                            <a href="@if(isset($story->contact->id)) {{ url('admin/contacts/'.$story->contact->id.'/edit/') }} @else # @endif" class="btn btn-mini-info" title="View Contact">
                                                <i class="fa fa-address-book"></i> @if(isset($story->contact->id)) {{ $story->contact->full_name }} @else No Contact @endif
                                            </a>

                                            @if($story->source)
                                                <a href="{{ $story->source }}" class="btn btn-mini-info pull-right" title="View Source" target="_blank">
                                                    <i class="fa fa-info"></i>
                                                </a>
                                            @endif

                                            @if($story->url)
                                                <a href="{{ $story->url }}" class="btn btn-mini-info pull-right" title="View on Wordpress" target="_blank">
                                                    <i class="fa fa-wordpress"></i> @if($story->author) {{ $story->author }} @endif
                                                </a>
                                            @endif
                                        </p>
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
                                                    @foreach(config('stories.decisions.'.$decision) as $key => $state_values)
                                                        <option value="{{ $key }}" @if($key == $story->state) selected @endif>{{ $state_values['dropdown'] }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <hr>
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
                                                <a href="#" class="btn-mini">{{ date('jS M h:i:s',strtotime($story->contacted_at)) }}</a>
                                            @elseif($story->contacted_at && !$story->contact_made)
                                                <i class="fa fa-clock-o" title="Contacted"></i>
                                                <strong>@if($story->reminders) {{ $story->reminders }} Reminder{{ ($story->reminders>1 ? 's' : '') }} : @else Contacted: @endif</strong>{{ $story->contacted_at ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$story->contacted_at)->diffForHumans() : 'Not yet' }}
                                                <a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $story->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
                                            @else
                                                <i class="fa fa-question-circle-o" title="Not Contacted"></i>
                                                <strong>Not Contacted</strong>
                                                @if($story->state != 'unapproved')
                                                    <a href="{{ url('admin/stories/reminder/'.$story->alpha_id.'/?decision='.$decision) }}" class="text-danger btn-mini">{{ $story->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
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
                                        @if($story->state == $key)
                                            @if($state_values['negative_label'])<a href="#" data-id="{{ $story->alpha_id }}" class="{{ $state_values['negative_class'] }} btn-mini btn-mini-border left" title="{{ $state_values['negative_label'] }}"><i class="fa fa-times"></i></a>@endif
                                            @if($state_values['positive_label'])<a href="{{ ($story->state=='licensing' ? url('admin/stories/edit/'.$story->alpha_id.'/?decision='.lcfirst($decision)) : '#') }}" data-id="{{ $story->alpha_id }}" class="{{ $state_values['positive_class'] }} btn-mini btn-mini-border" title="{{ $state_values['positive_label'] }}"><i class="fa fa-check"></i> {{ $state_values['positive_label'] }}</a> @endif
                                        @endif
                                    @endforeach
                                </div>
                            </footer>

                        </article>
                    </div>
                @endforeach
            </div>
    </div>
</div>
