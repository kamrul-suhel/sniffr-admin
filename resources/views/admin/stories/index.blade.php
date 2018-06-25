@extends('admin.master')


@section('content')
	<div class="admin-section-title bottom-padding">
		<div class="row">
			<div class="col-xs-12">
				<h3>
					<i class="fa fa-youtube-play"></i>
					<a href="/admin/stories/{{ lcfirst($state) }}">
						{{ ucfirst($state) }} Stories
					</a>
					<a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right">
						<i class="fa fa-plus-circle"></i>
						Add New
					</a>
				</h3>
			</div>
		</div>

		<div class="row">
			<form id="search-form" method="get" role="form" class="search-form-full">
				<div class="col-md-4">
					<div class="form-group">
						<select id="state" name="state" class="selectpicker form-control" title="State">
                            @foreach(config('stories.states') as $state)
							<option value="{{ $state }}">{{ ucwords(str_replace('-', ' ', $state)) }}</option>
                            @endforeach
						</select>
					</div>
				</div>

				<div class="col-md-8">
					<div class="form-group">
						<input type="text" class="form-control" name="search_value" id="search-input" placeholder="Search..." value="{{ Request::get('s') }}"> <i class="fa fa-search"></i>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="clear"></div>

	@if(!count($stories))
		<p>Sorry, there are no stories to show.</p>
	@else

	<div class="gallery-env">
		<div class="row">
			@php
				$currentDay = '';
			@endphp

			@foreach($stories as $story)

				<div class="col-sm-6 col-md-4" id="video-{{ $story->alpha_id }}">

                    @switch($story->state)
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
                            <div class="video-container">
                                <a class="video-thumb" href="#" style="background-image:url({{ ($story->thumb ? $story->thumb : '/assets/frontend/images/placeholder.png') }})">
                                    <span class="thumbnail-overlay"></span>
                                </a>
                            </div>
						</header>

						<section class="album-info">
							<h3><a href="#">{{ $story->title }}</a></h3>

							<p>{!! $story->excerpt !!}</p>
						</section>

						<footer>

						</footer>
					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $stories->appends(request()->except('page'))->render(); ?></div>
		</div>
	</div>
	@endif

@stop
