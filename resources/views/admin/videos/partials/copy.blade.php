<div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon">Description</span>
                <textarea class="form-control" name="description" id="video-description" rows="9" title="description">{{ $asset->description or old('description') }}</textarea>
            </div>
        </div>
    </div>
</div>
