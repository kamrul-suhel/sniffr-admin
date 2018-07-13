@extends('client.master')

@section('content')

<div class="admin-section-title bottom-padding">
    <div class="row">
        <div class="col-md-4">
            <h3>{{ session('campaign_id') ? $campaign->name : 'Daily' }} Videos</h3>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-default">
            <a href="{{ url('/client/dailies') }}">
                <span class="icon"><i class="fa fa-download"></i></span>
                <span class="num" data-start="0" data-end="{{ $total_videos }}" data-postfix="" data-duration="1500" data-delay="0">0</span>
                <h3>Total Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-aqua">
            <a href="{{ url('/client/dailies/new') }}">
                <span class="icon"><i class="fa fa-plus"></i></span>
                <span class="num" data-start="0" data-end="{{ $new_videos }}" data-postfix="" data-duration="1500" data-delay="600">0</span>
                <h3>New Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-cyan">
            <a href="{{ url('/client/dailies/pending') }}">
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span class="num" data-start="0" data-end="{{ $yes_videos }}" data-postfix="" data-duration="1500" data-delay="1200">0</span>
                <h3>Chosen Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-green">
            <a href="{{ url('/client/dailies/licensed') }}">
                <span class="icon"><i class="fa fa-youtube-play"></i></span>
                <span class="num" data-start="0" data-end="{{ $no_videos }}" data-postfix="" data-duration="1500" data-delay="1800">0</span>
                <h3>No Videos</h3>
            </a>
        </div>
    </div>
</div>

@stop
