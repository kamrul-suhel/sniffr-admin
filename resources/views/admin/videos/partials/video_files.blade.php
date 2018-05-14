<div class="row">
    <span class="col-md-12">
        <span class="input-group">
            <span class="input-group-addon">
                Video Source
            </span>
            <input type="file" multiple="true" class="form-control" name="file" id="file"/>
        </span>
    </span>
    <span class="col-md-12">
        <span class="input-group">
            <span class="input-group-addon">
                URL
            </span>
            <input type="text" class="form-control" name="url" id="url" value="{{
            $video->url or null
            }}" title="URL"/>
        </span>
    </span>

    <span class="col-md-12">
        <span class="input-group">
            <span class="input-group-addon">
                Embed Code
            </span>

            <textarea class="form-control" name="embed_code" id="embed_code" title="Embed Code" rows="4">{{
                !empty($video->embed_code) ? $video->embed_code : null
            }}</textarea>
        </span>
    </span>
</div>