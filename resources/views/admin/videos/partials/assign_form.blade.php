<div class="col-md-6">
    <div class="panel panel-primary" data-collapsed="0">
        <div class="panel-heading">
            <div class="panel-title">Assigned To</div>
            <div class="panel-options">
                <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
            </div>
        </div>

        <div class="panel-body" style="display: block;">
            <label for="user_id">Who is working on this story?</label>
            <select id="user_id" name="user_id">
                <option value="">Not assigned</option>
                @foreach($users as $user2)
                    <option value="{{ $user2->id }}"
                            @if(($video) && ($user2->id == $video->user_id)) selected="selected" @endif>
                        {{ $user2->username }}
                    </option>
                @endforeach
            </select>
        </div>
    </div>
</div>