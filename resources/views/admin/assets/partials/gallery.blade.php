<div class="gallery-env">
    <div class="row">
        @php
            $currentDay = '';
        @endphp

        @foreach($assets as $asset)
            @php
                $order_column = $asset->state == 'licensed' ? 'licensed_at' : 'created_at';
                $date = \Carbon\Carbon::parse($asset->{$order_column})->isToday() ? 'Today' : date('D jS F Y',strtotime($asset->{$order_column}));
                $panelColour = ($asset->priority=='high' ? 'danger' : ($asset->priority=='medium' ? 'warning' : ''));
            @endphp

            @if($currentDay != $date)
                @php
                    $currentDay = $date;
                @endphp
                <div class="col-xs-12 date-header">
                    <h2>{{ $date }}</h2>
                </div>
            @endif

            <div class="col-sm-6 col-md-4" id="asset-{{ $asset->alpha_id }}">
                <article class="album {{ $panelColour }}">
                    <div class="album-asset-update" id="asset-update-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</div>
                    <div class="album-asset-update-error" id="asset-update-error-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</div>
                    @include('admin.'.str_plural($asset_type).'.partials.card')
                </article>
            </div>
        @endforeach

        <div class="clear"></div>

        <modal v-if="modalVisible" @close="closeModal" asset-type="{{ $asset_type }}"></modal>
    </div>

    <div class="text-center">
		<?= $assets->appends(request()->except('page'))->render(); ?>
    </div>
</div>