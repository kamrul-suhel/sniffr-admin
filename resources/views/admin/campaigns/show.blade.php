@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3><i class="fa fa-area-chart"></i> {{ $campaign->name}} Videos</h3>
			</div>
		</div>
	</div>

	<div class="clear"></div>

	<table class="table table-striped pages-table">
		<tr class="table-header">
			<th>ID</th>
			<th>Name</th>
			<th>Status</th>
			<th>Exclusivity</th>
			<th>Downloaded</th>
			@if(isset($videos))
				@foreach($videos as $video)
				<?php
					$downloaded = $video->downloads->contains('client_id', $campaign->client_id);

                    $date1 = now();
                    $date2 = new DateTime($video->campaigns[0]->pivot->created_at);

                    $diff = $date2->diff($date1);

                    $exclusivity = 48 - ($diff->h + ($diff->days*24));
                ?>
				<tr>
					<td>{{ $video->alpha_id }}</a></td>
					<td><a href="{{ url('admin/videos/edit/'.$video->alpha_id ) }}">{{ $video->title }}<a></td>
					<td>{{ $video->campaigns[0]->pivot->state }}</td>
					<td>Exclusivity: {{ $exclusivity < 0 ? 'Expired' : $exclusivity.' Hours left' }}</td>
					<td class="text-{{ $downloaded ? 'success' : 'danger' }}"><i class="fa fa-{{ $downloaded ? 'check' : 'times' }}"></i></td>
				</tr>
				@endforeach
			@endif
	</table>

	<div class="clear"></div>
@stop
