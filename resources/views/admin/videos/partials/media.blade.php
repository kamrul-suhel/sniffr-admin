<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Media</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Video Image Cover (16:9)
            </span>

            <input type="file" multiple="true" class="form-control" name="image" id="image"/>
        </span>

        @if($asset && $asset->image != 'placeholder.gif')
            <img src="{{ $asset->image }}" class="video-img" width="200"/>
        @endif

        <span class="form-group input-group">
            <span class="input-group-addon">
                Video Source
            </span>

            <input type="file" multiple="true" class="form-control" name="file" id="file"/>
        </span>

        @if($asset && $asset->file)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Original
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $asset->file }}" disabled/>
        </span>
        @endif

        @if($asset && $asset->file_watermark)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Watermark
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $asset->file_watermark }}" disabled/>
        </span>
        @endif

        @if($asset && $asset->file_watermark_dirty)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Dirty
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $asset->file_watermark_dirty }}" disabled/>
        </span>
        @endif

        <span class="form-group input-group">
            <span class="input-group-addon">
                URL
            </span>

            <input type="text" class="form-control" name="url" id="url"
                   @if($asset && is_null($asset->url)) placeholder="Current video is an uploaded file" @endif value="{{ $asset->url or null }}" title="URL"/>
        </span>

        <span class="form-group input-group">
            <span class="input-group-addon">
                Embed Code
            </span>

            <textarea class="form-control" name="embed_code" id="embed_code" title="Embed Code" rows="4">{{ !empty($asset->embed_code) ? $asset->embed_code : null }}</textarea>
        </span>
    </div>
</div>
