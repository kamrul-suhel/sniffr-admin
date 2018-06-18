<div class="col-sm-12 ">
    <div class="row">
        <div class="form-group clearfix">
            @if($previous)
                <a href="{{ url('admin/videos/edit/' . $previous->alpha_id) }}" class="btn btn-primary">
                    < Previous
                </a>
            @endif
            @if($next)
                <a href="{{ url('admin/videos/edit/' . $next->alpha_id) }}" class="btn btn-primary pull-right">
                    Next >
                </a>
            @endif
        </div>
    </div>

    {{--@include('admin.videos.partials.search')--}}
</div>
