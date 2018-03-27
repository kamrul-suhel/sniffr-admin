@extends('frontend.master')
@section('content')

    <section id="header" class="page_videos">
        <div class="header-bg"></div>
        <div class="heading">
            <div class="position-center">
                <h1>Upload Videos</h1>
            </div>
        </div>
    </section>

    <!-- Video upload form -->
    @include('frontend.forms.upload')
@endsection