<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Assigned to</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body">
        <select id="user_id" name="user_id" class="form-control">
            <option value="">Not assigned</option>
            @foreach($users as $user)
                <option value="{{ $user->id }}"
                        @if(isset($asset)) @if(!empty($user->id == $asset->user_id))selected="selected"@endif @endif>{{ $user->username }}</option>
            @endforeach
        </select>
    </div>
</div>