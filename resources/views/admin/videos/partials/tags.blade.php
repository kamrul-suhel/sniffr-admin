<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">
            Tags
        </div>
        <div class="panel-options">
            <a href="#" data-rel="collapse">
                <i class="fa fa-angle-down"></i>
            </a>
        </div>
    </div>

    <div class="panel-body" style="display: block;">
        <div id="video-analysis"></div>
        <label for="tags">Add video tags below:</label>
        <input class="form-control" name="tags" id="tags" data-role="tagsinput" value="@if($tags)
        @foreach($tags as $tag)
            {{ $tag->name }}
        @endforeach
        @endif">
    </div>
</div>