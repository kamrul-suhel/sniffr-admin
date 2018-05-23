@extends('admin.master')

@section('content')

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-users"></i> Client Mailers
					<a href="/admin/stories/" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i> Create Mailer
					</a>
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th style="width: 25%">Mailer Id</th>
			<th>Created By</th>
			<th>Created At</th>
			<th>Sent At</th>
			<th>Actions</th>
			@foreach($mailers as $mailer)
			<tr>
				<td>{{ $mailer->alpha_id }}</td>
				<td>@foreach($users as $user2)
			                @if(!empty($user2->id == $mailer->user_id))
			                    {{ $user2->username }}
			                @endif
			            @endforeach
				</td>
				<td>{{ date('jS M Y h:i:s',strtotime($mailer->created_at)) }}</td>
				<td>@if($mailer['sent_at']){{ date('jS M Y h:i:s',strtotime($mailer['date'])) }}@else Not yet sent. @endif</td>
				<td>
					<p>
						<a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a>
						<a href="{{ url('admin/mailers/delete') . '/' . $mailer->id }}" class="btn btn-xs btn-danger delete"><span class="fa fa-trash"></span> Delete</a>
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
								//console.log(data);
								if(data.mailer_id) {
									window.location.href = '/admin/mailers/edit/'+data.mailer_id;
								}
							} else {
								alert('Something went wrong');
							}
					    }
					});
				}
			});
		});
	</script>
	@stop
@stop
