@extends('admin.master')

@section('content')
    <td id="admin-container">

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
                <th>Order No.</th>
                <th>Story / Video</th>
                <th>Downloaded</th>
                <th>Price</th>
            </tr>
            <tr>
                @foreach($collectionPurchasesVideos as $collection)
                    @foreach($collection->collectionVideos as $purchasedVideo)
                    <td>
                        {{ $collection->name }}
                    </td>
                    <td>
                        <div class="row">
                            <div class="col-xs-4">
                                <img src="{{ $purchasedVideo->video->thumb }}" width="100%">
                            </div>

                            <div class="col-xs-8">
                                <h3 class="title"><a target="_blank" href="{{ url('admin/videos/edit/'.$purchasedVideo->video->alpha_id) }}">{{ $purchasedVideo->video->title }} <i class="fa fa-external-link"></i></a></h3>
                            </div>
                        </div>
                    </td>
                    <td>

                    </td>
                    <td>
                        £ {{ $purchasedVideo->final_price }}
                    </td>
                    @endforeach
                @endforeach
                @foreach($collectionPurchasesStories as $collection)
                    @foreach($collection->collectionStories as $purchasedStory)
                        <td>
                            {{ $collection->name }}
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-xs-4">
                                    <img src="{{ $purchasedStory->story->thumb }}" width="100%">
                                </div>

                                <div class="col-xs-8">
                                    <h3 class="title"><a target="_blank" href="{{ url('admin/stories/edit/'.$purchasedStory->story->alpha_id) }}">{{ $purchasedStory->story->title }} <i class="fa fa-external-link"></i></a></h3>
                                </div>
                            </div>
                        </td>
                        <td>

                        </td>
                        <td>
                            £ {{ $purchasedStory->final_price }}
                        </td>
                    @endforeach
                @endforeach
            </tr>
        </table>
    </div>
@endsection
