@extends('admin.master')


@section('content')

<style>
select.btn-mini {
    height: auto;
    line-height: 14px;
}
select.btn {
    -webkit-appearance: button;
       -moz-appearance: button;
            appearance: button;
    padding-right: 0px;
}

select.btn-mini + .caret {
    margin-left: -20px;
    margin-top: 9px;
}
.btn-mini-border {
    padding:2px 4px;
    background-color: #f9f9f9;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.btn-mini-border.left {
    margin-right:8px;
}
.panel-options {
    margin-bottom: 0px !important;
    padding: 5px;
}
.panel-options-body {
    margin: 10px 5px;
    padding: 0px;
    text-align: center;
}
.title-overlay {
    padding:15px;
    color:#fff;
}
.title-overlay h4 {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 8px;
    width: 90%;
    border-radius: 4px;
}
</style>

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
                            @foreach(config('stories.states') as $current_state)
							<option value="{{ $current_state }}" @if($state==@$current_state) selected @endif>{{ ucwords(str_replace('-', ' ', $current_state)) }}</option>
                            @endforeach
						</select>
					</div>
				</div>

				<div class="col-md-8">
					<div class="form-group">
						<input type="text" class="form-control" name="search_value" id="search-input" placeholder="Search..." value="{{ Request::get('search_value') }}"> <i class="fa fa-search"></i>
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

                    @php
        				$panelColour = config('stories.colors');
        			@endphp

					<article class="album {{ $panelColour[$story->state] }}">
						<header>
                            <div class="video-container">
                                <a class="video-thumb" href="#" style="background-image:url({{ ($story->thumb ? $story->thumb : '/assets/frontend/images/placeholder.png') }})">
                                    <span class="thumbnail-overlay title-overlay">
                                        <h4>{{ $story->title }}</h4>
                                    </span>
                                </a>
                            </div>
						</header>

						<section class="album-info">
                            <div class="row">
                                <div class="col-sm-12">
                                    <p>{!! $story->excerpt !!}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="panel panel-primary panel-options" data-collapsed="0">
                                        <div class="panel-options-body">
                                            @if($story->state == 'unapproved')
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-state approved btn-mini" title="Approve"><i class="fa fa-check"></i> Approve</a>
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-state rejected" title="Reject"><i class="fa fa-times"></i></a>
                                            @elseif($story->state == 'approved')
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-state licensing" title="Pick Up"><i class="fa fa-check"></i></a>
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-state rejected" title="Reject"><i class="fa fa-times"></i></a>
                                            @elseif($story->state == 'licensing')
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-state licensed" title="License"><i class="fa fa-check"></i></a>
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-state unlicensed" title="Unlicensed"><i class="fa fa-times"></i></a>
                                            @elseif($story->state == 'licensed')
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-success js-state published btn-mini btn-mini-border left" title="Publish"><i class="fa fa-check"></i> Publish</a>
                                                <a href="#" data-id="{{ $story->alpha_id }}" class="text-danger js-state unlicensed btn-mini btn-mini-border" title="Unlicense"><i class="fa fa-times"></i></a>
                                            @else

                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="panel panel-primary panel-options" data-collapsed="0">
                                        <div class="panel-options-body">
                                            <select id="state" name="state" class="btn btn-mini" title="State">
                                                @foreach(config('stories.states') as $current_state)
                    							<option value="{{ $current_state }}" @if($story->state==@$current_state) selected @endif>{{ ucwords(str_replace('-', ' ', $current_state)) }}</option>
                                                @endforeach
                    						</select>
                                            <span class="caret"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</section>

					</article>
				</div>
			@endforeach

			<div class="clear"></div>

			<div class="text-center"><?= $stories->appends(request()->except('page'))->render(); ?></div>
		</div>
	</div>
	@endif

@stop
