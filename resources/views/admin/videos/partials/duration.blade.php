<div class="row">
    <div class="col-sm-4">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">
                    Duration
                </div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse">
                        <i class="fa fa-angle-down"></i>
                    </a>
                </div>
            </div>
            <div class="panel-body">
                <label for="duration">
                    Enter the video duration in the following format (Hours : Minutes : Seconds)
                </label>
                <input class="form-control" name="duration" id="duration"
                       value="{{ ($video) ? gmdate('H:i:s', $video->duration) : '' }}">
            </div>
        </div>
    </div>
</div>
