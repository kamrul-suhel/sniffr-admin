@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
                    <i class="fa fa-users"></i>
                    Clients
                    <a href="{{ url('admin/clients/create') }}" class="btn btn-success pull-right">
                        <i class="fa fa-plus-circle"></i>
                        Add New
                    </a>
                </h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Name</th>
			<th>Actions</th>
			@foreach($clients as $client)
			<tr>
				<td>{{ TextHelper::shorten($client->name, 250) }}</td>
				<td>
                    <a href="{{ route('clients.purchases', ['id' => $client->id]) }}" class="btn btn-xs btn-warning">
                        <span class="fa fa-money"></span>
                        Purchases
                    </a>
                    <a href="{{ route('clients.edit', ['id' => $client->id]) }}" class="btn btn-xs btn-info">
                        <span class="fa fa-edit"></span>
                        Edit
                    </a>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	<div class="text-center"><?= $clients->render(); ?></div>
@stop
