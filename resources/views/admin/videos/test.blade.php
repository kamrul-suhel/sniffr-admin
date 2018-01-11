@extends('admin.master')

@section('content')
    <video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}" width="100%" style="width:100%;">
        <source src="{{ $url }}" type="video/mp4">
    </video>

    <video id="video_player" x-webkit-airplay=”allow” class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" data-setup="{}" width="100%" style="width:100%;">
        <source src="https://vlp-storage.s3.eu-west-1.amazonaws.com/sample_bg-watermark.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJLBUIX4YJQYGUWTQ%2F20180111%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20180111T164659Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1500&X-Amz-Signature=a30c1d29813afb341f5ba05ebc434a07db04494c9edada5a21aa2e98b0b6f3e6" type="video/mp4">
    </video>
@stop
