@extends('frontend.master')
@section('content')

    <section id="header" class="page-videos">
        <div class="header-content">
            <div class="position-center">
                <h1 class="heading">Videos</h1>
            </div>
        </div>

        @include('frontend.includes.search_form')
    </section>

    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section section-space">
        <v-container grid-list-lg>
            <v-layout row wrap>
                @include('frontend.includes.video_loop')
            </v-layout>
        </v-container>
    </section>

    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection