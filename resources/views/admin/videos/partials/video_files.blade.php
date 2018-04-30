<div class="row">
    <div class="col-sm-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Video Image Cover (16:9)</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                @if(!empty($video->image))
                    <img src="{{ $video->image }}" class="video-img" width="200"/>
                @endif
                <p>Select the video image (1280x720 px or 16:9 ratio):</p>

                <input type="file" multiple="true" class="form-control" name="image" id="image"/>
            </div>
        </div>
    </div>

    <div class="col-sm-6">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Video Source</div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body">
                <div class="new-video-file">
                    <label for="file">File: {{ !empty($video->file) ? $video->file : '' }}</label>
                    <input type="file" multiple="true" class="form-control" name="file" id="file"/>
                </div>

                <hr/>

                <div class="new-video-url">
                    <label for="url">URL:</label>
                    <input type="text" class="form-control" name="url" id="url" value="@if(!empty($video->url)){{ $video->url }}@endif"/>
                </div>

                <hr/>

                <div class="new-video-embed">
                    <label for="embed_code">Embed Code:</label>
                    <textarea class="form-control" name="embed_code" id="embed_code">{{ !empty($video->embed_code) ? $video->embed_code : '' }}</textarea>
                </div>
            </div>
        </div>
    </div>
</div>