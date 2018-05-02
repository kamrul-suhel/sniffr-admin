<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">
                    <label for="location">Location</label>
                </div>

                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <p>Where was the video filmed?</p>
                <input type="text" class="form-control" name="location" id="location" value="{{ ($video) ? $video->location : '' }}"/>
            </div>
        </div>
    </div>
</div>