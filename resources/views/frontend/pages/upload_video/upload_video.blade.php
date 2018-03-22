@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1>Upload Videos</h1>
            </div>
        </div>
    </section>




    <!-- VIDEOS ITEM SECTION -->
    @include('frontend.forms.upload')
@endsection