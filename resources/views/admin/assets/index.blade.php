@extends('admin.master')

@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-{{ $assetIcon }}"></i>
					<a href="/admin/licenses/{{ $assetTypePlural }}">
						{{ ucfirst($assetTypePlural) }}: {{ isset($decision) ?? ucwords(str_replace('-', ' ', $decision)). ' -' }} {{ ucwords(str_replace('-', ' ', $chosenState)) }}
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

				<div class="col-md-2 pull-right">
					<div class="form-group">
						<input type="text" class="form-control" name="term" id="search-input" placeholder="Search..." value="{{ Request::get('term') }}"> <i class="fa fa-search"></i>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($assets))
		<p>Sorry, there are no items to show.</p>
	@else

	<div class="gallery-env">
		<div class="row">
			@php
				$currentDay = '';
			@endphp

			@foreach($assets as $asset)
				@php
					$order_column = $asset->state == 'licensed' ? 'licensed_at' : 'created_at';
					$date = \Carbon\Carbon::parse($asset->{$order_column})->isToday() ? 'Today' : date('D jS F Y',strtotime($asset->{$order_column}))
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
					@switch($asset->state)
						@case('rejected')
						@case('problem')
							@php
								$panelColour = 'danger';
							@endphp
							@break
						@case('licensed')
							@php
								$panelColour = 'success';
							@endphp
							@break
						@case('restricted')
							@php
								$panelColour = 'warning';
							@endphp
							@break
						@default
							@php
								$panelColour = 'default';
							@endphp
					@endswitch

					<article class="album {{ $panelColour }}">
						<header>

						</header>

						<section class="album-info">

						</section>

						<footer>

						</footer>
					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $assets->appends(request()->except('page'))->render(); ?></div>

			<modal v-if="modalVisible" @close="closeModal" asset-type="video"></modal>
		</div>
	</div>
	@endif
@stop

@section('javascript')
    @include('admin.videos.partials.js')
    <script src="{{asset('assets/admin/scripts/scripts.js')}}"></script>
@stop

