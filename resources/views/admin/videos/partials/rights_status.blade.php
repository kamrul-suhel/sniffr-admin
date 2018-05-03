<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Rights</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse">
                <i class="fa fa-angle-down"></i>
            </a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <p class="{{ $video->contact_is_owner ? 'text-success' : 'text-danger' }}">
            <strong>{!! $video->contact_is_owner ? '<i class="fa fa-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong>
        </p>
        @if($video->submitted_elsewhere)
            <p class="text-warning">
                <strong>
                    <i class="fa fa-exclamation"></i>
                    Submitted to: {{ $video->submitted_where }}
                </strong>
            </p>
        @endif
        <p class="{{ $video->allow_publish ? 'text-success' : 'text-danger' }}">
            <strong>
                {!! $video->allow_publish ? '<i class="fa fa-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}
                Apply to publish
            </strong>
        </p>
        <p class="{{ $video->permission ? 'text-success' : 'text-danger' }}">
            <strong>
                {!! $video->permission ? '<i class="fa fa-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!}
                Permission
            </strong>
        </p>
        <p class="{{ $video->is_exclusive ? 'text-success' : 'text-danger' }}">
            <strong>
                {!! $video->is_exclusive ? '<i class="fa fa-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!}
                Exclusive
            </strong>
        </p>
        {!! $video->file ? '' : '<p class="text-warning"><strong><i class="fa fa-exclamation"></i> Need to source video file</strong></p>' !!}
    </div>
</div>