<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">
                    <label for="description">Short Description</label>
                </div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>
            <div class="panel-body">
                <p>Add a short description of the video below:</p>

                <textarea class="form-control" name="description" id="description">{{
                            ($video) ? $video->description : ''
                            }}</textarea>
            </div>
        </div>
    </div>
</div>