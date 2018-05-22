@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-users"></i> Stories
					<a href="{{ url('admin/stories/mailer') }}" class="btn btn-primary pull-right">
						<i class="fa fa-plus-circle"></i> Create Mailer
					</a>
					<!-- <a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i> Add New Story
					</a> -->
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Title</th>
			<th style="width: 25%">Excerpt</th>
			<th>Status</th>
			<th>Assigned To</th>
			<th>Created At</th>
			<th>Actions</th>
			@foreach($stories as $story)
			<tr>
				<td>{{ TextHelper::shorten($story['title'], 250) }} <img src="{{ $story['thumb'] }}" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" /></td>
				<td>{{ $story['excerpt'] }}</td>
				<td>{{ $story['status'] }}</td>
				<td>
				</td>
				<td>{{ date('jS M Y',strtotime($story['date'])) }}</td>
				<td>
					<p>
						<label class="btn btn-primary">
							<input type="checkbox" autocomplete="off" style="font-size: 20px;">
						</label>
						<!-- <a href="{{ url('admin/stories/edit') . '/' . $story['wp_id'] }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/stories/delete') . '/' . $story['wp_id'] }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a> -->
					</p>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	@section('javascript')
	<script>
		$ = jQuery;
		$(document).ready(function(){
			$('.delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this story?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});
		});
	</script>
	@stop
@stop
