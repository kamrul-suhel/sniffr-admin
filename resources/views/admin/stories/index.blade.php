@extends('admin.master')

@section('content')

	<ol class="breadcrumb"> <li> <a href="/admin/stories"><i class="fa fa-tasks"></i> All Stories</a> </li> </ol>

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-users"></i> Stories
					<a href="#" class="btn btn-primary pull-right js-create-mailer">
						<i class="fa fa-plus-circle"></i> Create Mailer
					</a> <a href="{{ url('admin/stories/refresh') }}" class="btn btn-warning pull-right" style="margin-right:10px;">
						<i class="fa fa-refresh"></i> Refresh Stories
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
			<th style="width: 25%">Title</th>
			<th style="width: 30%">Excerpt</th>
			<th>Assigned To</th>
			<th>Created At</th>
			<th>Actions</th>
			@foreach($stories as $story)
			<tr>
				<td><strong>{{ TextHelper::shorten($story['title'], 250) }}</strong> <img src="@if($story['thumb']){{ $story['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" /></td>
				<td>{{ $story['excerpt'] }}</td>
				<td>{{ $story['author'] }}</td>
				<td>{{ date('jS M Y h:i:s',strtotime($story['date_ingested'])) }}</td>
				<td>
					<p>
						<label class="btn btn-primary">
							<input type="checkbox" value="{{ $story['id'] }}" name="stories" autocomplete="off" style="font-size: 20px;">
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

			$('.js-create-mailer').click(function(e){
				e.preventDefault();
				var storiesArray = [];
				$("input:checkbox[name=stories]:checked").each(function(){
				  	storiesArray.push($(this).val());
				});
				if(storiesArray.length != 0) {
					var dataString = "stories="+JSON.stringify(storiesArray);
					$.ajax({
					    type: 'GET',
					    url: '/admin/mailers/create/',
					    data: dataString,
					    dataType: 'json',
					    success: function (data) {
							if(data.status=='success') {
								if(data.mailer_id) {
									window.location.href = '/admin/mailers/edit/'+data.mailer_id;
								}
							} else {
								alert('Something went wrong');
							}
					    }
					});
				} else {
					swal({  title: 'Please select some stories first under [Actions]', icon: 'error', closeModal: false, closeOnClickOutside: true, closeOnEsc: true });
				}
			});
		});
	</script>
	@stop
@stop
