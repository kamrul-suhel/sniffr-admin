<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Video Description</div>

        <div class="panel-options">
            <a href="#" data-rel="collapse">
                <i class="fa fa-angle-down"></i>
            </a>
        </div>
    </div>

    <div class="panel-body">
        <textarea class="form-control" name="description" id="description" rows="6">{!! $asset ? $asset->description : '' !!}</textarea>
    </div>
</div>