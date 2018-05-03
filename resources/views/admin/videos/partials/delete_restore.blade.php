@if($video->trashed())
    <a href="{{ url('admin/videos/restore/'.$video->alpha_id) }}" title="Restore Video" class="btn btn-warning">
        <i class="fa fa-fa-upload"></i>
        Restore
    </a>
@else
    <a href="{{ url('admin/videos/delete/' . $video->alpha_id) }}" title="Delete Video" class="btn btn-danger">
        <i class="fa fa-trash-o"></i>
        Delete
    </a>
@endif
