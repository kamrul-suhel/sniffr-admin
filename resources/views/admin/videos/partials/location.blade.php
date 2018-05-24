<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Location
            </span>
            <input type="text" class="form-control" name="location" id="location" value="{{ ($video && $video->location != 'null') ? $video->location : '' }}"/>
        </span>
    </span>
</div>
