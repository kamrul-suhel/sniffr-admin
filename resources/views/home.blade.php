@extends('app')

@section('content')
<div id="home-hero" class="vidbg-box">
    <video src="/assets/video/ocean.mp4" autoplay muted loop></video>

    <div id="dim-bg">
        <div class="home-titles">
            <h1>Video Licensing Platform</h1>
            <h4>License viral videos viewed by millions around the world from UNILAD</h4>
            <button class="btn btn-primary" href="/videos">Upload Your Video</button>
        </div>
    </div>
</div>
@endsection
