<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Details</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display:none">
        <div class="col-md-12">
            <span class="form-group input-group">
                <p>Video Details, Links, and Info</p>

                <textarea class="form-control" name="details" id="details" rows="10">{!! $asset ? $asset->details : '' !!}</textarea>
            </span>
        </div>
    </div>
</div>