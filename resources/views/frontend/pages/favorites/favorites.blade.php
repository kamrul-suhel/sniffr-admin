@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1 style="margin-top:15px;">Favorites</h1>
            </div>
        </div>

        @include('frontend.includes.search_form')
    </section>

    <!-- VIDEOS ITEM SECTION -->
    <section class="videos_section section_space">
        <article class="container">
            <div class="row">
                @if(count($videos) > 0)
                    @include('frontend.includes.video_loop')
                @else
                    <h2>You do not have any favorite videos.</h2>
                @endif
            </div>
        </article>
    </section>

    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection