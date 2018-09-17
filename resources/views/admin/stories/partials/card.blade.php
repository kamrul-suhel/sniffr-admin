<header class="album-info album-grey">
    <div class="row padded-bottom">
        <div class="col-sm-12">
            <h3><a href="{{ url('admin/stories/edit/'.$asset->alpha_id) }}" title="Edit Story on Sniffr">{{ $asset->title }}</a></h3>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            @include('admin.contacts.partials.link')

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
        </div>
    </div>
</header>

<section class="album-info album-grey">
    <div class="row">
        <div class="col-sm-8">
            <div class="content-thumb" style="background-image:url({{ ($asset->thumb ? $asset->thumb : '/assets/images/placeholder.png') }})"></div>
        </div>
        <div class="col-sm-4">
            <div class="options">
                <div class="form-group">
                    @include('admin.assets.partials.priority')
                </div>

                <div class="form-group">
                    @include('admin.assets.partials.assigned')
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
                    <a href="{{ url('admin/stories/reminder/'.$asset->alpha_id) }}" class="text-danger btn-mini">{{ $asset->contact->canAutoBump() ? ' Re-send' : ' Manually' }}</a>
                    <a href="{{ url('admin/stories/contact_made/'.$asset->alpha_id) }}" data-id="{{ $asset->alpha_id }}" class="text-success approved btn-mini btn-mini-border" title="Made Contact"><i class="fa fa-square-o"></i> Made Contact</a>
                @else
                    <i class="fa fa-question-circle-o" title="Not Contacted"></i>
                    <strong>Not Contacted</strong>
                    @if($asset->state != 'unapproved' && $asset->state != 'rejected')
                        <a href="{{ url('admin/stories/reminder/'.$asset->alpha_id) }}" class="text-danger btn-mini">{{ $asset->contact->canAutoBump() ? ' Send' : ' Manually' }}</a>
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
        @if(isset($chosenDecision))
            @foreach(config('stories.decisions.'.$chosenDecision) as $key => $state_values)
                @if($chosenState == $key)
                    @if($state_values['negative_label'])<a href="#" data-id="{{ $asset->alpha_id }}" class="{{ $state_values['negative_class'] }} btn-mini btn-mini-border left" title="{{ $state_values['negative_label'] }}"><i class="fa fa-times"></i></a>@endif
                    @if($state_values['positive_label'])<a href="{{ ($asset->state=='licensing' ? url('admin/stories/edit/'.$asset->alpha_id.'/?decision='.lcfirst($chosenDecision)) : '#') }}" data-id="{{ $asset->alpha_id }}" class="{{ $state_values['positive_class'] }} btn-mini btn-mini-border" title="{{ $state_values['positive_label'] }}"><i class="fa fa-check"></i> {{ $state_values['positive_label'] }}</a> @endif
                @endif
            @endforeach
        @endif
    </div>
</footer>