@extends('frontend.master')
@section('content')

    <section id="header" class="page_videos">
        <div class="header-bg"></div>

        <div class="heading">
            <div class="position-center">
                <h1>Videos</h1>
            </div>
        </div>

        @include('frontend.includes.search_form')
    </section>

    <!-- VIDEOS ITEM SECTION -->
    <section class="videos_section section_space">
        <v-container grid-list-lg>
            <v-layout row wrap>
                @include('frontend.includes.video_loop')
            </v-layout>
        </v-container>
    </section>

    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection