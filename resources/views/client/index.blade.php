@extends('client.master')

@section('content')

<!--[hook_admin_dashboard_widgets_start]-->
<div class="row">
    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-default">
            <a href="{{ url('/admin/videos') }}">
                <span class="icon"><i class="fa fa-download"></i></span>
                <span class="num" data-start="0" data-end="{{ $total_videos }}" data-postfix="" data-duration="1500" data-delay="0">0</span>
                <h3>Total Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-aqua">
            <a href="{{ url('/admin/videos/new') }}">
                <span class="icon"><i class="fa fa-plus"></i></span>
                <span class="num" data-start="0" data-end="{{ $downloaded_videos }}" data-postfix="" data-duration="1500" data-delay="600">0</span>
                <h3>Downloaded Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-cyan">
            <a href="{{ url('/admin/videos/pending') }}">
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span class="num" data-start="0" data-end="{{ $possible_videos }}" data-postfix="" data-duration="1500" data-delay="1200">0</span>
                <h3>Possible Videos</h3>
            </a>
        </div>
    </div>

    <div class="col-sm-3 col-xs-6">
        <div class="tile-stats tile-green">
            <a href="{{ url('/admin/videos/licensed') }}">
                <span class="icon"><i class="fa fa-youtube-play"></i></span>
                <span class="num" data-start="0" data-end="{{ $declined_videos }}" data-postfix="" data-duration="1500" data-delay="1800">0</span>
                <h3>Declined Videos</h3>
            </a>
        </div>
    </div>
</div>

<br />
@stop
