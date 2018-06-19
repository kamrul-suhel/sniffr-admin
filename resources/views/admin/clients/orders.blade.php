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
    					<i class="fa fa-calculator"></i> Orders for {{ $client->name }}
                        <a href="/admin/clients/{{ $client->id }}/orders/csv" class="btn btn-success pull-right">
    						<i class="fa fa-download"></i> Export CSV
    					</a>
    				</h3>
    			</div>
    		</div>
    	</div>
    	<div class="clear"></div>
<<<<<<< HEAD
=======

        <div class="admin-section-title">
            <h3>Stories</h3>
        </div>

>>>>>>> testing
        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th>Order No.</th>
                <th>Order Date</th>
                <th>Story / Video Title</th>
                <th>Author</th>
                <th>File Url</th>
                <th>Downloaded</th>
                @foreach($orders as $order)
<<<<<<< HEAD
                    @if($order->story_id!=0)
=======
                    @if($order->story_id != 0)
>>>>>>> testing
                    <tr>
                        <td>{{ $order->id }}</td>
                        <td>{{ date('jS M Y h:i:s',strtotime($order->created_at)) }}</td>
                        <td>
                            {{ $order->story->title }}
                        </td>
                        <td>
                            {{ $order->story->author }}
                        </td>
                        <td>
<<<<<<< HEAD
                            @if($stories->where('id', $order->story_id)->pluck('status')->first()=='draft') Not yet published @else<a href="{{ $stories->where('id', $order->story_id)->pluck('url')->first() }}" target="_blank">Preview</a>@endif
                        </td>
                        <td>
                            {{ $downloads->where('story_id', $order->story_id)->where('client_id', $order->client_id)->count() }}
                        </td>
                    </tr>
                    @else
                    <tr>
                        <td>{{ str_pad($count, 4, '0', STR_PAD_LEFT) }}</td>
                        <td>{{ date('jS M Y h:i:s',strtotime($order->created_at)) }}</td>
                        <td>
                            {{ $videos->where('id', $order->video_id)->pluck('title')->first() }}
                        </td>
                        <td>
                            {{ $videos->where('id', $order->video_id)->pluck('contact.full_name')->first() }}
                        </td>
                        <td>
                            @if($videos->where('id', $order->video_id)->pluck('state')->first()!='licensed') Not yet licensed @else<a href="{{ $videos->where('id', $order->video_id)->pluck('file_watermark')->first() }}" target="_blank">Preview</a>@endif
=======
                            @if( $order->story->status) Not yet published @else<a href="{{  $order->story->url }}" target="_blank">{{  $order->story->url }}</a>@endif
>>>>>>> testing
                        </td>
                        <td>
                            {{ $downloads->where('video_id', $order->video_id)->where('client_id', $order->client_id)->count() }}
                        </td>
                    </tr>
                    @endif
<<<<<<< HEAD
                    @php $count++ @endphp
=======
                @endforeach
        </table>

        <div class="admin-section-title">
            <h3>Videos</h3>
        </div>

        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th>Order No.</th>
                <th>Order Date</th>
                <th>Title</th>
                <th>Contributor</th>
                <th>Downloaded</th>
                @foreach($orders as $order)
                    @if($order->video_id != 0)
                    <tr>
                        <td>{{ $order->id }}</td>
                        <td>{{ date('jS M Y H:i:s',strtotime($order->created_at)) }}</td>
                        <td>
                            <a href="{{ url('/admin/videos/edit/'.$order->video->alpha_id) }}">{{ $order->video->title }}</a>
                        </td>
                        <td>

                            <a href="{{ url('/admin/contacts/'.$order->video->contact->id.'/edit') }}">{{ $order->video->contact->full_name }}</a>
                        </td>
                        <td>
                            {{ $downloads->where('video_id', $order->video_id)->count() }}
                        </td>
                    </tr>
                    @endif
>>>>>>> testing
                @endforeach
        </table>
    </div>
@endsection
