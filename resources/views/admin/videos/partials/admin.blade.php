<div class="row">
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
                    @foreach($users as $user)
                        <option value="{{ $user->id }}"
                                @if(($asset) && ($user->id == $asset->user_id)) selected="selected" @endif>
                            {{ $user->full_name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Be careful!</div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse">
                        <i class="fa fa-angle-down"></i>
                    </a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                @if($asset->trashed())
                    <a href="{{ url('admin/videos/restore/'.$asset->alpha_id) }}" title="Restore Video"
                       class="btn btn-warning">
                        <i class="fa fa-fa-upload"></i>
                        Restore
                    </a>
                @else
                    <a href="{{ url('admin/videos/delete/' . $asset->alpha_id) }}" title="Delete Video"
                       class="btn btn-danger">
                        <i class="fa fa-trash-o"></i>
                        Delete
                    </a>
                @endif
            </div>
        </div>
    </div>
</div>