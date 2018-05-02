<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <label for="details" class="panel-title">
            Video Details, Links, and Info
        </label>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block; padding:0px;">
        <textarea class="form-control" name="details" id="details" rows="10">{!! ($video) ? $video->details : '' !!}</textarea>
    </div>
</div>