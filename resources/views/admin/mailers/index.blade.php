@extends('admin.master')

@section('content')

	<ol class="breadcrumb"> <li> <a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers</a> </li> </ol>

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
			<th>Sends <span class="fa fa-bar-chart"></span></th>
			<th>Stories <span class="fa fa-tasks"></span></th>
			<th>Downloads <span class="fa fa-download"></span></th>
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
				<td>@if($mailer['sent_at']){{ date('jS M Y h:i:s',strtotime($mailer['sent_at'])) }}@else Not yet sent. @endif</td>
				<td>{{ $mailer->users()->where('sent_at', '!=', NULL)->count() }}</td>
				<td>{{ $mailer->stories()->count() }}</td>
				<td>@if($mailer['sent_at']) {{ $downloads->where('mailer_id', $mailer->id)->whereIn('story_id', $mailer->stories()->pluck('stories.id'))->count() }}@else 0 @endif</td>
				<td>
					<p>
						@if(!$mailer['sent_at'])<a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-primary"><span class="fa fa-plus-circle"></span> Send</a>@endif
						<!-- <a href="#" class="btn btn-xs btn-warning"><span class="fa fa-bar-chart"></span> Stats</a> -->
						<!-- <a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a> -->
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
