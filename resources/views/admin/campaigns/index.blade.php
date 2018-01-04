@extends('admin.master')

@section('content')

	<div class="admin-section-title">
		<div class="row">
			<div class="col-md-8">
				<h3><i class="fa fa-area-chart"></i> Campaigns</h3><a href="{{ url('admin/campaigns/create') }}" class="btn btn-success"><i class="fa fa-plus-circle"></i> Add New</a>
			</div>
			<div class="col-md-4">
				<form method="get" role="form" class="search-form-full"> <div class="form-group"> <input type="text" class="form-control" name="s" id="search-input" placeholder="Search..."> <i class="fa fa-search"></i> </div> </form>
			</div>
		</div>
	</div>
	<div class="clear"></div>


	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Name</th>
			<th>Slug</th>
			<th>Actions</th>
			@foreach($campaigns as $campaign)
			<tr>
				<td>{{ TextHelper::shorten($campaign->name, 250) }}</td>
				<td valign="bottom"><p>{{ $campaign->slug }}</p></td>
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
