@extends('admin.master')

@section('content')
    <div id="admin-container">
        <ol class="breadcrumb">
            <li>
                <a href="/admin/clients"><i class="fa fa-newspaper-o"></i>All Clients</a>
            </li>

            <li class="active">
                {{ $client->name }}
            </li>
        </ol>

        <div class="admin-section-title bottom-padding">
    		<div class="row">
    			<div class="col-xs-12">
    				<h3>
    					<i class="fa fa-calculator"></i> Purchases for {{ $client->name }}
                        <a href="/admin/clients/{{ $client->id }}/purchases/csv" class="btn btn-success pull-right">
    						<i class="fa fa-download"></i> Export CSV
    					</a>
    				</h3>
    			</div>
    		</div>
    	</div>

    	<div class="clear"></div>

        <div class="admin-section-title">
            <h3>Videos</h3>
        </div>

        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th>Thumb</th>
                <th>Alpha ID</th>
                <th>Order No.</th>
                <th>Licensed at</th>
                <th>License Expires</th>
                <th>License Length</th>
                <th>License Type</th>
                <th>Platform</th>
                <th>Story / Video</th>
                <th>Downloads</th>
                <th>Price</th>
            </tr>

            <?php $total = 0; ?>

            @foreach($collectionPurchasesVideos as $collection)
                @foreach($collection->collectionVideos as $purchasedVideo)
                <tr>
                    <td>
                        <img src="{{ $purchasedVideo->video->thumb ? $purchasedVideo->video->thumb : $purchasedVideo->video->image }}" width="100px">
                    </td>

                    <td>
                        {{ $purchasedVideo->video->alpha_id }}
                    </td>

                    <td>
                        {{ $collection->name }}_{{ $purchasedVideo->id }}
                    </td>

                    <td>
                        {{ date('jS M Y H:i:s',strtotime($purchasedVideo->licensed_at)) }}
                    </td>

                    <td>
                        @if($purchasedVideo->length != 'perpetuity')
                        {!! now() < $purchasedVideo->license_ends_at ? Carbon\Carbon::parse($purchasedVideo->license_ends_at)->diffForHumans() : '<span class="text-danger">Expired</span>' !!}
                        @else
                        <span class="text-danger">Never</span>
                        @endif
                    </td>

                    <td>
                        {{ Config::get('pricing.length.'.$purchasedVideo->length.'.name') }}
                    </td>

                    <td>
                        {{ Config::get('pricing.type.'.$purchasedVideo->type.'.name') }}
                    </td>

                    <td>
                        {{ Config::get('pricing.platform.'.$purchasedVideo->platform.'.name') }}
                    </td>

                    <td>
                        <a target="_blank" href="{{ url('admin/videos/edit/'.$purchasedVideo->video->alpha_id) }}">{{ $purchasedVideo->video->title }} <i class="fa fa-external-link"></i></a>
                    </td>

                    <td>
                        {{ $downloads->where('video_id', $purchasedVideo->video->id)->count() }}
                    </td>

                    <td>
                        £{{ number_format($purchasedVideo->final_price) }}
                    </td>
                </tr>
                <?php $total = $total + $purchasedVideo->final_price; ?>
                @endforeach
            @endforeach

            @foreach($collectionPurchasesStories as $collection)
                @foreach($collection->collectionStories as $purchasedStory)
                <tr>
                    <td>
                        <img src="{{ $purchasedStory->story->thumb }}" width="100px">
                    </td>

                    <td>
                        {{ $purchasedStory->story->alpha_id }}
                    </td>

                    <td>
                        {{ $collection->name }}_{{ $purchasedStory->story->id }}
                    </td>

                    <td>
                        {{ date('jS M Y H:i:s',strtotime($collection->updated_at)) }}
                    </td>

                    <td>
                        N/A
                    </td>

                    <td>
                        N/A
                    </td>

                    <td>
                        N/A
                    </td>

                    <td>
                        N/A
                    </td>

                    <td>
                        <a target="_blank" href="{{ url('admin/stories/edit/'.$purchasedStory->story->alpha_id) }}">{{ $purchasedStory->story->title }} <i class="fa fa-external-link"></i></a>
                    </td>

                    <td>
                        {{ $downloads->where('story_id', $purchasedStory->story->id)->count() }}
                    </td>

                    <td>
                        £{{ number_format($purchasedStory->final_price) }}
                    </td>
                </tr>
                <?php $total = $total + $purchasedStory->final_price; ?>
                @endforeach
            @endforeach
            <tr>
                <td colspan="13" class="text-right">
                    <strong>£{{ number_format($total) }}</strong>
                </td>
            </tr>
        </table>
    </div>
@stop
