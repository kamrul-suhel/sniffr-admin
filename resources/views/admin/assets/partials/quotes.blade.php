@if(isset($asset))
    @if(\App\CollectionVideo::isOffered($asset->id)->count() > 0
    || \App\CollectionVideo::isRequested($asset->id)->count() > 0)
        <div class="col-lg-12 label label-warning">
            {{ \App\CollectionVideo::isOffered($asset->id)->count() > 0 ? "Offered: ".\App\CollectionVideo::isOffered($asset->id)->count() : '' }}
            {{ \App\CollectionVideo::isRequested($asset->id)->count() > 0 ? "Requested: ".\App\CollectionVideo::isRequested($asset->id)->count() : '' }}
        </div>
    @endif
@endif