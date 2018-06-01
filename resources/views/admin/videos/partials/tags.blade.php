<div class="row">
    <span class="col-md-6">
        <div id="video-analysis"></div>
        <span class="input-group">
            <span class="input-group-addon">
                Tags
            </span>
        <input class="form-control" name="tags" id="tags" data-role="tagsinput" value="@if($tags)
        @foreach($tags as $tag)
            {{ $tag->name . ',' }}
        @endforeach
        @endif" title="tags">
        </span>
    </span>
</div>
