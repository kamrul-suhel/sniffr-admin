<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Priority</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body">
        <select id="user_id" name="user_id" class="form-control">
            <option value="">Priority</option>
            @foreach(config('stories.priorities') as $priority)
                <option value="{{ $priority }}" @if($asset && $asset->priority == $priority) selected @endif>{{ ucwords(str_replace('-', ' ', $priority)) }}</option>
            @endforeach
        </select>
    </div>
</div>