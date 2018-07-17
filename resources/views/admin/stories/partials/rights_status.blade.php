<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Rights Status</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body" style="display: block; background: #fcfcfc;">
        <div class="status-box">
            @if(isset($asset) && $asset->rights=='exclusive')
            <div class="status-box-inner success" id="rights-box-status">Exclusive</div>
            @elseif(isset($asset) && $asset->rights=='non-exclusive')
            <div class="status-box-inner danger" id="rights-box-status">Non-Exclusive</div>
            @else
            <div class="status-box-inner" id="rights-box-status">Pending</div>
            @endif

            @if(isset($asset))
            <div class="status-box-inner @if(!$asset->problem_status) hidden @else warning @endif" id="problem-box-status">{{ ucwords(str_replace('-', ' ', $asset->problem_status)) }}</div>
            @endif
        </div>
        <span class="input-group">
            <span class="input-group-addon">
                License Type
            </span>
            <select name="rights" id="rights" class="form-control js-rights-status">
                <option value="">Set status</option>
                @foreach(config('stories.rights') as $status)
                <option value="{{ $status }}" {{ (isset($asset)  &&  $asset->rights==$status) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $status)) }}</option>
                @endforeach
            </select>
            <select name="rights_type" id="rights_type" class="form-control">
                <option value="">Set rights type</option>
                @foreach(config('stories.rights_type') as $rights)
                <option value="{{ $rights }}" {{ (isset($asset)  &&  $asset->rights_type==$rights) ? 'selected' : '' }}>{{ ucwords(str_replace('-', ' ', $rights)) }}</option>
                @endforeach
            </select>
        </span>
        <div class="story-dividers">
            <div id="owner-status">
                @if(isset($asset) && $asset->contact_is_owner)
                <h5 class="text-success"><i class="fa fa-check-square-o"></i> Contact is owner </h5>
                @else
                <h5 class="text-danger"><i class="fa fa-square-o"></i> Owner pending </h5>
                @endif
            </div>
            <div id="submitted-status">
                @if(isset($asset) && $asset->submitted_to)
                <h5 class="text-success"><i class="fa fa-check-square-o"></i> Submitted to {{ ((isset($asset->submitted_to) && count(explode(',', $asset->submitted_to)))>1) ? 'multiple' : ucwords(str_replace('-', ' ', $asset->submitted_to)) }}</h5>
                @else
                <h5 class="text-danger"><i class="fa fa-square-o"></i> Submitted to pending</h5>
                @endif
            </div>
            <div id="publish-status">
                @if(isset($asset) && $asset->allow_publish)
                <h5 class="text-success"><i class="fa fa-check-square-o"></i> Happy to publish </h5>
                @else
                <h5 class="text-danger"><i class="fa fa-square-o"></i> Publication status pending </h5>
                @endif
            </div>
            <div id="permission-status">
                @if(isset($asset) && $asset->permission)
                <h5 class="text-success"><i class="fa fa-check-square-o"></i> Has permission </h5>
                @else
                <h5 class="text-danger"><i class="fa fa-square-o"></i> Permission pending </h5>
                @endif
            </div>
            <div id="rights-status">
                @if(isset($asset) && $asset->rights)
                <h5 class="@if($asset->rights=='exclusive') text-success @else text-warning @endif"><i class="fa fa-check-square-o"></i> {{ ucwords(str_replace('-', ' ', $asset->rights)) }} rights </h5>
                @else
                <h5 class="text-danger"><i class="fa fa-square-o"></i> Rights status pending </h5>
                @endif
            </div>
        </div>
    </div>
</div>
