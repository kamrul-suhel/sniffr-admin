@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-{{ $assetIcon }}"></i>
					<a href="/admin/licenses/{{ $assetTypePlural }}">
						{{ ucfirst($assetTypePlural) }}: {{ isset($chosenDecision) ? ucwords(str_replace('-', ' ', $chosenDecision)). ' -'  : ''}} {{ ucwords(str_replace('-', ' ', $chosenState)) }}
					</a>

					<a href="{{ url('admin/'.$assetTypePlural.'/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New {{ ucfirst($assetType) }}
					</a>
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
				@include('admin.'.$assetTypePlural.'.partials.filters')

				<div class="col-md-2">
					<div class="form-group">
						<select id="assignee" name="assignee" class="form-control" title="Assign To">
							<option value="">Assignee</option>
							@foreach($users as $user)
								<option value="{{ $user->id }}"{{ $chosenAssignee == $user->id ? ' selected' : '' }}>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
							@endforeach
						</select>
					</div>
				</div>

				<div class="col-md-4 pull-right">
					<div class="form-group">
						<input type="text" class="form-control" name="term" id="search-input" placeholder="Search..." value="{{ Request::get('term') }}"> <i class="fa fa-search"></i>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($assets))
		<p>Sorry, there are no {{ $assetTypePlural }} to show.</p>
	@else

	<div class="gallery-env">
		<div class="row">
			@php
				$currentDay = '';
			@endphp

			@foreach($assets as $asset)
				@php
					$order_column = $asset->state == 'licensed' ? 'licensed_at' : 'created_at';
					$date = \Carbon\Carbon::parse($asset->{$order_column})->isToday() ? 'Today' : date('D jS F Y',strtotime($asset->{$order_column}));
					$panelColour = ($asset->priority=='high' ? 'danger' : ($asset->priority=='medium' ? 'warning' : ''));
				@endphp

				@if($currentDay != $date)
					@php
						$currentDay = $date;
					@endphp
					<div class="col-xs-12 date-header">
						<h2>
							{{ $date }}
						</h2>
					</div>
				@endif

				<div class="col-sm-6 col-md-4" id="asset-{{ $asset->alpha_id }}">
					<article class="album {{ $panelColour }}">
						<div class="album-story-update" id="asset-update-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-up"></i></a> Updated</div>
						<div class="album-story-update-error" id="asset-update-error-{{ $asset->alpha_id }}"><i class="fa fa-thumbs-down"></i></a> Something went wrong</div>
						@include('admin.'.$assetTypePlural.'.partials.card')
					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $assets->appends(request()->except('page'))->render(); ?></div>

			<modal v-if="modalVisible" @close="closeModal" asset-type="{{ $assetType }}"></modal>
		</div>
	</div>
	@endif
@stop

@section('javascript')
    @include('admin.'.$assetTypePlural.'.partials.js')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@stop

