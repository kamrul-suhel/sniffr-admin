<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Licensing Information</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Source URL
            </span>

            <input type="text" class="form-control js-story-get-source" name="source" id="source" placeholder="" value="{{ isset($asset) ? $asset->source : '' }}" />
        </span>

        @include('admin.contacts.partials.select')

        @if(!empty($asset))

        <span class="form-group input-group has-feedback">
            <span class="input-group-addon">
                Date Sourced
            </span>

            <input type="text" class="form-control" name="sourced_at" id="sourced_at" />
            <i class="glyphicon glyphicon-calendar form-control-feedback"></i>
        </span>

        <span class="form-group input-group">
            <span class="input-group-addon">
                Problem Status
            </span>

            <select name="problem_status" id="problem_status" class="form-control js-problem-status">
                <option value="">No Problem</option>
                @foreach(config('stories.problem_status') as $problem)
                <option value="{{ $problem }}" {{ (isset($asset)  &&  $asset->problem_status==$problem) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $problem)) }}</option>
                @endforeach
            </select>
        </span>

        @endif
    </div>
</div>

<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">License Notes</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body" style="display: block;">
        <textarea class="form-control" name="notes" id="notes" rows="7">@if(isset($asset)&&$asset->notes) {{ $asset->notes }} @endif</textarea>
    </div>
</div>

@if(isset($activeLicenses) && count($activeLicenses) > 0)
<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Active Licenses</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <table class="table">
            <thead>
            <th>Name</th>
            <th>Company</th>
            <th>License Terms</th>
            <th>License End</th>
            </thead>
            <tbody>
            @foreach($activeLicenses as $license)
                <tr>
                    <td>{{ $license->collection->user->full_name }}</td>
                    <td>{{ $license->collection->user->client->name }}</td>
                    <td>
                        <small>Type: <b>{{ $license->type }}</b></small><br>
                        <small>Platform: <b>{{ $license->platform }}</b></small><br>
                        <small>Length: <b>{{ $license->length }}</b></small><br>
                    </td>
                    <td>
                        {{ date('dS M Y @ h:i', strtotime($license->license_ends_at)) }}<br>
                        <small>
                            {{ $license->licensed_at
                             ? Carbon\Carbon::parse($license->license_ends_at)->diffForHumans()
                             : '' }}
                        </small>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endif
