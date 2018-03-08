@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1>Search Results</h1>
            </div>
        </div>
        @include('frontend.includes.search_form')
    </section>




    <!-- VIDEOS ITEM SECTION -->
    <section class="videos_section section_space">
        <article class="container">
            <div class="row">

                <?php if(count($videos) < 1): ?>
                    <h4>No Video Search results found for <?= $search_value ?></h4>
                <?php else: ?>
                    <h3>Video Search Results for: <?= $search_value ?></h3>
                    <hr/>
                    @include('frontend.includes.video_loop')
                <?php endif; ?>

            </div>
        </article>
    </section>



    <!-- PAGINATION SECTION -->
    {{ $videos->links() }}

@endsection