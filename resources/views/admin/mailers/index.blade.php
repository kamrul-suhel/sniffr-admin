@extends('admin.master')

@section('content')

	<ol class="breadcrumb"> <li> <a href="/admin/mailers"><i class="fa fa-tasks"></i> All Client Mailers</a> </li> </ol>

	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-users"></i> Client Mailers
					<a href="/admin/mailers/create_mailer" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i> Create Mailer
					</a>
				</h3>
			</div>
		</div>
	</div>
	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>Mailer Id</th>
			<th>Created By</th>
			<th>Sent At</th>
			<th>Sent to <span class="fa fa-bar-chart"></span></th>
			<th class="single-line">Stories <span class="fa fa-tasks"></span></th>
			<th class="single-line">Videos <span class="fa fa-youtube-play"></span></th>
			<th>Actions</th>
			@foreach($mailers as $mailer)
			<tr>
				<td>{{ $mailer->alpha_id }}</td>
				<td>@if($mailer->user_id!=0) @foreach($users as $user2)
			                @if(!empty($user2->id == $mailer->user_id))
			                    {{ ($user2->full_name ? $user2->full_name : $user2->username) }}
			                @endif
			            @endforeach @else Default @endif
				</td>
				<td>@if($mailer['sent_at']){{ date('jS M Y h:i:s',strtotime($mailer['sent_at'])) }}@else Not yet sent. @endif</td>
				<td>
					@foreach($mailer->users()->where('sent_at', '!=', NULL)->get() as $user)
						{!! $opens->where('client_mailer_id', $mailer->id)->where('user_id', $user->id)->count() ? '<span class="fa fa-envelope-open-o"></span>&nbsp;'.$opens->where('client_mailer_id', $mailer->id)->where('user_id', $user->id)->count() : '<span class="fa fa-envelope-o"></span>'  !!}&nbsp;:&nbsp;{{ $user->email }} ({{$user->client->name}})<br>
					@endforeach
				</td>
				<td class="single-line">
					@foreach($mailer->stories()->get() as $story)
						{!! $downloads->where('mailer_id', $mailer->id)->whereIn('story_id', $story->id)->count() ? '<span class="fa fa-cloud-download"></span>&nbsp;'.$downloads->where('mailer_id', $mailer->id)->whereIn('story_id', $story->id)->count().'&nbsp;:&nbsp;' : '' !!}
						<span title="{{ $story->title }}"><a target="_blank" href="{{ url('stories/'.$story->alpha_id) }}"> {{ $story->title }} <span class="fa fa-external-link"></span></a>
						</span><br>
					@endforeach
				</td>
				<td class="single-line">
					@foreach($mailer->videos()->get() as $video)
						{!! $downloads->where('mailer_id', $mailer->id)->whereIn('video_id', $video->id)->count() ? '<span class="fa fa-cloud-download"></span>&nbsp;'.$downloads->where('mailer_id', $mailer->id)->whereIn('video_id', $video->id)->count().'&nbsp;:&nbsp;' : '' !!}
						<span title="{{ $video->title }}"><a target="_blank" href="{{ url('videos/'.$video->alpha_id) }}"> {{ $video->title }} <span class="fa fa-external-link"></span></a>
						</span><br>
					@endforeach
				</td>
				<td>
					<p>
						@if(!$mailer['sent_at'])<a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-primary"><span class="fa fa-plus-circle"></span> Send</a>@endif
						@if($mailer['sent_at'])<a href="{{ url('admin/mailers/stats') . '/' . $mailer->id }}" class="btn btn-xs btn-warning"><span class="fa fa-bar-chart"></span> Stats</a>@endif
						<!-- <a href="{{ url('admin/mailers/edit') . '/' . $mailer->id }}" class="btn btn-xs btn-info"><span class="fa fa-edit"></span> Edit</a> -->
						<a href="{{ url('admin/mailers/delete') . '/' . $mailer->id }}" class="btn btn-xs btn-danger js-delete-mailer"><span class="fa fa-trash"></span> Delete</a>
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
			$('.js-delete-mailer').click(function(e){
				e.preventDefault();
				if (confirm("Are you sure you want to delete this mailer?")) {
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
