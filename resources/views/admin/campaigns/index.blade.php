@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3><i class="fa fa-area-chart"></i> Campaigns <a href="{{ url('admin/campaigns/create') }}" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i> Add New</a></h3>
			</div>
		</div>
	</div>

	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Client</th>
			<th>Name</th>
			<th>Actions</th>
			@foreach($campaigns as $campaign)
			<tr>
				<td>{{ $campaign->client->name }}</td>
				<td><a href="{{ url('admin/campaigns/'.$campaign->id ) }}">{{ TextHelper::shorten($campaign->name, 250) }}</a></td>
				<td>
					<p>
						<a href="{{ url('admin/campaigns/edit') . '/' . $campaign->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/campaigns/delete') . '/' . $campaign->id }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a>
					</p>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	<div class="text-center"><?= $campaigns->render(); ?></div>


	@section('javascript')
	<script>
		$ = jQuery;
		$(document).ready(function(){
			$('.delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this campaign?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});
		});
	</script>
	@stop
@stop
