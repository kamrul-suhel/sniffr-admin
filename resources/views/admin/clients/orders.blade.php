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

        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th>Order No.</th>
                <th>Order Date</th>
                <th>Story</th>
                <th>Author</th>
                <th>Wordpress Url</th>
                <th>Downloaded</th>
                @php $count = 1 @endphp
                @foreach($orders as $order)
                    <tr>
                        <td>{{ str_pad($count, 4, '0', STR_PAD_LEFT) }}</td>
                        <td>{{ date('jS M Y h:i:s',strtotime($order->created_at)) }}</td>
                        <td>
                            {{ $stories->where('id', $order->story_id)->pluck('title')->first() }}
                        </td>
                        <td>
                            {{ $stories->where('id', $order->story_id)->pluck('author')->first() }}
                        </td>
                        <td>
                            @if($stories->where('id', $order->story_id)->pluck('status')->first()=='draft') Not yet published @else<a href="{{ $stories->where('id', $order->story_id)->pluck('url')->first() }}" target="_blank">{{ $stories->where('id', $order->story_id)->pluck('url')->first() }}</a>@endif
                        </td>
                        <td>
                            {{ $downloads->where('story_id', $order->story_id)->count() }}
                        </td>
                    </tr>
                    @php $count++ @endphp
                @endforeach
        </table>
    </div>
@endsection
