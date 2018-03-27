@extends('frontend.master')
@section('content')

    <v-layout row wrap id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1>Search Results</h1>
            </div>
        </div>
        @include('frontend.includes.search_form')
    </v-layout>

    <!-- VIDEOS ITEM SECTION -->
    <v-layout row wrap class="videos_section section_space">
        <v-container grid-list-lg >
            <v-layout row wrap>

                @if(count($videos) < 1)
                    <v-flex xs12>
                        <h4>No Video Search results found for <?= $search_value ?></h4>
                    </v-flex>
                @else
                    <v-flex xs12>
                        <h3>Video Search Results for: {{$search_value}}</h3>
                        <hr/>
                    </v-flex>
                    @include('frontend.includes.video_loop')
                    
                @endif

            </div>
        </v-container>
    </v-layout>



    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection