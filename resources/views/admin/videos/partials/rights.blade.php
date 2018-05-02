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

    <div class="row">
        <div class="col-sm-4">
            <div class="panel panel-primary" data-collapsed="0">
                <div class="panel-heading">
                    <div class="panel-title">Rights Management</div>
                    <div class="panel-options">
                        <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                    </div>
                </div>
                <div class="panel-body">
                    <label for="rights">Select if the video is exclusive or non-exclusive</label>
                    <select id="rights" name="rights">
                        <option value="ex" {{ (($video) && ($video->rights == 'ex')) ? 'selected' : '' }}>
                            Exclusive
                        </option>
                        <option value="nonex" {{ (($video) && ($video->rights == 'nonex')) ? 'selected' : '' }}>
                            Non-Exclusive
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
@endif