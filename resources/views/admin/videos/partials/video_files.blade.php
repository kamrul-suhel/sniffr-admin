<div class="row">
    <div class="col-md-12">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Video Source
            </span>

            <input type="file" multiple="true" class="form-control" name="file" id="file"/>
        </span>

        @if($video->file)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Original
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $video->file }}" disabled/>
        </span>
        @endif

        @if($video->file_watermark)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Watermark
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $video->file_watermark }}" disabled/>
        </span>
        @endif

        @if($video->file_watermark_dirty)
        <span class="form-group input-group">
            <span class="input-group-addon">
                Dirty
            </span>

            <input type="text" multiple="true" class="form-control" name="file" id="file" value="{{ $video->file_watermark_dirty }}" disabled/>
        </span>
        @endif
    </div>

    <div class="col-md-12">
        <span class="form-group input-group">
            <span class="input-group-addon">
                URL
            </span>

            <input type="text" class="form-control" name="url" id="url"
                   @if(is_null($video->url)) placeholder="Current video is an uploaded file" @endif value="{{ $video->url or null }}" title="URL"/>
        </span>
    </div>

    <div class="col-md-12">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Embed Code
            </span>

            <textarea class="form-control" name="embed_code" id="embed_code" title="Embed Code" rows="4">{{ !empty($video->embed_code) ? $video->embed_code : null }}</textarea>
        </span>
    </div>

    <div class="col-md-12">
        <span class="form-group input-group">
            <span class="input-group-addon">
                Youtube Id
            </span>

            <input type="text" class="form-control" name="youtube_id" id="youtube_id" value="{{ !empty($video->youtube_id) ? $video->youtube_id : '' }}" />
        </span>
    </div>
</div>
