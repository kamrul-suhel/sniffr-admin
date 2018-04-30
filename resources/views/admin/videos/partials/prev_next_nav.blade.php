<div class="col-sm-12">
    <div class="form-group pull-right top-padding-micro">
        @if(isset($previous))
            <a href="{{ url('admin/videos/edit/'.$previous->alpha_id ) }}" class="btn btn-primary">Previous</a>
        @endif
        @if(isset($next))
            <a href="{{ url('admin/videos/edit/'.$next->alpha_id ) }}"
               class="btn btn-primary">Next</a>
        @endif
    </div>
</div>