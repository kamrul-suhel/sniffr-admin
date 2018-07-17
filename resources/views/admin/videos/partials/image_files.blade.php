<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Video Image Cover (16:9)
            </span>
            <input type="file" multiple="true" class="form-control" name="image" id="image"/>
        </span>
    </span>
    <span class="col-md-6">
        @if($asset->image != 'placeholder.gif')
            <img src="{{ $asset->image }}" class="video-img" width="200"/>
        @endif
    </span>
</div>