@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3><i class="fa fa-users"></i> Stories <a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right"><i class="fa fa-plus-circle"></i> Add New Story</a></h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Name</th>
			<th>State</th>
			<th>Assigned To</th>
			<th>Created At</th>
			<th>Actions</th>
			@foreach($stories as $story)
			<tr>
				<td>{{ TextHelper::shorten($story->title, 250) }}</td>
				<td>{{ $story->state }}</td>
				<td>@foreach($users as $user2)
						@if(!empty($user2->id == $story->user_id))
					 		{{ $user2->username }}
						@endif
					@endforeach
				</td>
				<td>{{ date('jS M Y',strtotime($story->created_at)) }}</td>
				<td>
					<p>
						<a href="{{ url('admin/stories/edit') . '/' . $story->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/stories/delete') . '/' . $story->id }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a>
					</p>
				</td>
			</tr>
			@endforeach
	</table>

	<div class="clear"></div>

	<div class="text-center"><?= $stories->render(); ?></div>

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
