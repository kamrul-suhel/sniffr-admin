@php
    if(!isset($asset)){
        $asset = $contact;
        $asset_type = 'contact';
    }
@endphp
<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Comments</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: block; background: #fcfcfc;">
        <comments-component :asset="{{ json_encode($asset) }}" asset-type="{{ $asset_type }}"></comments-component>
    </div>
</div>