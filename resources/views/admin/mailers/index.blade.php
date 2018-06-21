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
			<th>Opens <span class="fa fa-envelope"></span></th>
			<th>Stories <span class="fa fa-tasks"></span></th>
			<th>Videos <span class="fa fa-youtube-play"></span></th>
			<th>Downloads <span class="fa fa-download"></span></th>
			<th>Actions</th>
			@foreach($mailers as $mailer)
				@php
					$downloads_count = $downloads->where('mailer_id', $mailer->id)->whereIn('video_id', $mailer->videos()->pluck('videos.id'))->count() + $downloads->where('mailer_id', $mailer->id)->whereIn('story_id', $mailer->stories()->pluck('stories.id'))->count()
				@endphp
			<tr>
				<td>{{ $mailer->alpha_id }}</td>
				<td>@if($mailer->user_id!=0) @foreach($users as $user2)
			                @if(!empty($user2->id == $mailer->user_id))
			                    {{ ($user2->full_name ? $user2->full_name : $user2->username) }}
			                @endif
			            @endforeach @else Default @endif
				</td>
				<td>{{ date('jS M Y h:i:s',strtotime($mailer->created_at)) }}</td>
				<td>@if($mailer['sent_at']){{ date('jS M Y h:i:s',strtotime($mailer['sent_at'])) }}@else Not yet sent. @endif</td>
				<td>{{ $mailer->users()->where('sent_at', '!=', NULL)->count() }}</td>
				<td>{{ $opens->where('client_mailer_id', $mailer->id)->count() }}</td>
				<td>{{ $mailer->stories()->count() }}</td>
				<td>{{ $mailer->videos()->count() }}</td>
				<td>@if($mailer['sent_at']) {{ $downloads_count }}@else 0 @endif</td>
				<td>
					<p>
						@if(!$mailer['sent_at'])<a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-primary"><span class="fa fa-plus-circle"></span> Send</a>@endif
						@if($mailer['sent_at'])<a href="{{ url('admin/mailers/stats') . '/' . $mailer->id }}" class="btn btn-xs btn-warning"><span class="fa fa-bar-chart"></span> Stats</a>@endif
						<!-- <a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a> -->
						<a href="{{ url('admin/mailers/delete') . '/' . $mailer->id }}" class="btn btn-xs btn-danger js-delete"><span class="fa fa-trash"></span> Delete</a>
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
			$('.js-delete').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this story?")) {
			       window.location = $(this).attr('href');
			    }
			    return false;
			});

			$('.js-stats-downloaded').click(function(e){
				e.preventDefault();
				var mailer = $(this).attr('href')
				if(mailer) {
					$.ajax({
					    type: 'GET',
					    url: mailer,
					    data: {},
					    dataType: 'json',
					    success: function (data) {
							if(data.status=='success') {
								//console.log(data);
								if(data.mailer_id) {
									var htmlcontent = '<strong>'+data.mailer_id+'</strong>';
									swal({  title: 'It worked', text: htmlcontent, icon: 'info', closeModal: false, closeOnClickOutside: true, closeOnEsc: true });
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
