@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1 style="margin-top:15px;">Videos</h1>
            </div>
        </div>

        @include('frontend.includes.search_form')
    </section>

    <!-- VIDEOS ITEM SECTION -->
    <section class="videos_section section_space">
        <article class="container">
            <div class="row">
                @include('frontend.includes.video_loop')
            </div>
        </article>
    </section>

    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection