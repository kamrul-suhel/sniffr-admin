@if($video->more_details)
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
        <p class="{{ $video->contact_is_owner ? 'text-success' : 'text-danger' }}"><strong>{!! $video->contact_is_owner ? '<i class="fa fa-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong></p>
        @if($video->submitted_elsewhere&&$video->submitted_where!=NULL)
            <p class="text-warning"><strong><i class="fa fa-exclamation"></i> Submitted to: {{ $video->submitted_where }}</strong></p>
        @endif
        <p class="{{ $video->allow_publish ? 'text-success' : 'text-danger' }}"><strong>{!! $video->allow_publish ? '<i class="fa fa-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}appy to publish</strong></p>
        <p class="{{ $video->permission ? 'text-success' : 'text-danger' }}"><strong>{!! $video->permission ? '<i class="fa fa-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!} permission</strong></p>
        <p class="{{ $video->is_exclusive ? 'text-success' : 'text-danger' }}"><strong>{!! $video->is_exclusive ? '<i class="fa fa-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!} exclusive</strong></p>
        {!! $video->file ? '' : '<p class="text-warning"><strong><i class="fa fa-exclamation"></i> Need to source video file</strong></p>' !!}
    </div>
</div>
@endif

@if($video->rights == 'nonexc')
<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">
            Non Exclusive Information
        </div>
        <div class="panel-options">
            <a href="#" data-rel="collapse">
                <i class="fa fa-angle-down"></i>
            </a>
        </div>
    </div>
    <div class="panel-body" style="display: block;">
        <p>Notes for the video:</p>
        <textarea class="form-control" name="notes" id="notes">{{
        ($video->notes) ? $video->notes : ''
        }}</textarea>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Credit link for the video:</p>
        <input class="form-control" name="credit" id="credit" value="{{
        ($video->credit) ? $video->credit : ''
        }}"/>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Referrer:</p>
        <input class="form-control" name="credit" id="credit" value="{{ ($video->referrer) ? $video->referrer : '' }}"/>
    </div>
</div>
@endif