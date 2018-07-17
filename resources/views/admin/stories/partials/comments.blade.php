<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Comments</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>
    <div class="panel-body" style="display: block;">
        <textarea class="form-control" name="excerpt" id="excerpt">@if(!empty($asset->excerpt)){{ htmlspecialchars($asset->excerpt) }}@endif</textarea>
    </div>
</div>
