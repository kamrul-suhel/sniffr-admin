@if($asset->more_details)
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
        <p class="{{ $asset->contact_is_owner ? 'text-success' : 'text-danger' }}"><strong>{!! $asset->contact_is_owner ? '<i class="fa fa-check"></i> Contact is owner' : '<i class="fa fa-times"></i> Does not own video' !!}</strong></p>
        @if($asset->submitted_elsewhere&&$asset->submitted_where!=NULL)
            <p class="text-warning"><strong><i class="fa fa-exclamation"></i> Submitted to: {{ $asset->submitted_where }}</strong></p>
        @endif
        <p class="{{ $asset->allow_publish ? 'text-success' : 'text-danger' }}"><strong>{!! $asset->allow_publish ? '<i class="fa fa-check"></i> H' : '<i class="fa fa-times"></i> Not h' !!}appy to publish</strong></p>
        <p class="{{ $asset->permission ? 'text-success' : 'text-danger' }}"><strong>{!! $asset->permission ? '<i class="fa fa-check"></i> Has' : '<i class="fa fa-times"></i> Does not have' !!} permission</strong></p>
        <p class="{{ $asset->is_exclusive ? 'text-success' : 'text-danger' }}"><strong>{!! $asset->is_exclusive ? '<i class="fa fa-check"></i> Is' : '<i class="fa fa-times"></i> Is not' !!} exclusive</strong></p>
        {!! $asset->file ? '' : '<p class="text-warning"><strong><i class="fa fa-exclamation"></i> Need to source video file</strong></p>' !!}
    </div>
</div>
@endif

@if($asset->rights == 'nonexc')
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
        ($asset->notes) ? $asset->notes : ''
        }}</textarea>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Credit link for the video:</p>
        <input class="form-control" name="credit" id="credit" value="{{
        ($asset->credit) ? $asset->credit : ''
        }}"/>
    </div>

    <div class="panel-body" style="display: block;">
        <p>Referrer:</p>
        <input class="form-control" name="credit" id="credit" value="{{ ($asset->referrer) ? $asset->referrer : '' }}"/>
    </div>
</div>
@endif