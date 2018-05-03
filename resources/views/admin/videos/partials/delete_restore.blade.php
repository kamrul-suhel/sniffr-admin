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
            @if($video->trashed())
                <a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Restore Video"
                   class="btn btn-warning">
                    <i class="fa fa-fa-upload"></i>
                    Restore
                </a>
            @else
                <a href="{{ url('admin/videos/delete/' . $video->alpha_id) }}" title="Delete Video"
                   class="btn btn-danger">
                    <i class="fa fa-trash-o"></i>
                    Delete
                </a>
            @endif

        </div>
    </div>
</div>
