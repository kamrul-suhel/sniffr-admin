@extends('frontend.master')
@section('content')
    <section id="video">
        <video>
        </video>
        <div class="heading">
            <div class="position-center" style="position:relative;top:-60px;">
                <h1>Video Licensing Platform</h1>
                <p style="font-size:18px;">License viral videos viewed by millions around the world from Sniffr Media</p>
                <button class="btn btn-primary upload_video_button">Upload you video</button>
            </div>
        </div>

        <div class="second-navigation">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                        <div class="logo">
                            <a href="{!! url('/') !!}"><img src="{{asset('assets/frontend/assets/images/logo-sniffr-white.png')}}"/></a>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg8">
                        <nav class="navigation">
                            <ul>
                                <li><a href="{!! url('/upload') !!}"><i class="fas fa-upload"></i> Upload</a></li>
                                <li><a href="{{ route('videos') }}"><i class="fas fa-video"></i> Videos</a></li>
                                <li><a href="#" data-toggle="modal" data-target="#loginModal"><i class="fas fa-lock-alt"></i> Login</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- partial template -->
    @include('frontend.pages.home.feature_section')
    @include('frontend.pages.home.countdown')
    @include('frontend.forms.upload')
@endsection
