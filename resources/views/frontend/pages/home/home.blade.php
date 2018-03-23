@extends('frontend.master')
@section('content')
    <section id="video">
        <video>
        </video>
        <div class="heading">
            <div class="position-center">
                <h1>Video Licensing Platform</h1>
                <p>License viral videos viewed by millions around the world from Sniffr Media</p>
                <button onclick="window.location.href='/upload'" class="btn btn-primary upload_video_button">Upload you video</button>
            </div>
        </div>

        <div class="second-navigation">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md4 lg4>
                        <div class="logo">
                            <a href="{!! url('/') !!}"><img src="{{asset('assets/frontend/images/logo-sniffr-white.png')}}"/></a>
                        </div>
                    </v-flex>
                    <v-flex xs12 sm6 md8 lg8>
                        <nav class="navigation">
                            <ul>
                                <li><a href="{!! url('/upload') !!}"><i class="fas fa-upload"></i> Upload</a></li>
                                <li><a href="{{ route('videos') }}"><i class="fas fa-video"></i> Videos</a></li>
                                <li><a href="#" @click.stop.prevent="login_dialog = true"><i class="fas fa-lock-alt"></i> Login</a></li>
                            </ul>
                        </nav>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>

    <!-- partial template -->
   @include('frontend.pages.home.feature_section')
   @include('frontend.pages.home.countdown')
   @include('frontend.forms.upload')
@endsection
