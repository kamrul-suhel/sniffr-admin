<div class="row">
    <span class="col-md-6">
        <span class="input-group">
            <span class="input-group-addon">
                Duration (Hours : Minutes : Seconds)
            </span>
            <input class="form-control" name="duration" id="duration" value="{{
            ($video) ? gmdate('H:i:s', $video->duration) : ''
            }}" placeholder="Enter the video duration in the following format (Hours : Minutes : Seconds)">
        </span>
    </span>
</div>
