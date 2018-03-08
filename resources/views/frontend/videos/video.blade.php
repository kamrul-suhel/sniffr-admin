@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1>Videos</h1>
            </div>
        </div>

        <div class="videos_filter_section">
            <form action="#" method="post" class="videos_filter_form">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                            <div class="form-group">
                                <input type="text" class="form-control" name="filter_by" id="filterby" aria-describedby="filterhelp" placeholder="Filter">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                            <div class="form-group">
                                <input type="text" class="form-control" name="sort_by" id="sort_by" aria-describedby="sort_by" placeholder="Sort">
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg4">
                            <div class="form-group">
                                <input type="submit" class="form-control" id="filter_search" value="Search">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>




    <!-- VIDEOS ITEM SECTION -->
    <section class="videos_section section_space">
        <article class="container">
            <div class="row">
                <?php
                $currentDay = '';
                foreach($videos as $video):

                $date = date('jS M Y',strtotime($video->licensed_at));
                if(isset($day_sort) && $currentDay != $date){
                    $currentDay = $date;

                    echo '<div class="col-xs-12"><h1>'.$date.'</h1></div>';
                }
                ?>
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <article class="block">
                        <a class="block-thumbnail" href="<?= url('video') ?><?= '/' . $video->alpha_id ?>" style="background-image:url('<?= $video->image; ?>')">
                            <div class="thumbnail-overlay"></div>
                            <span class="play-button"></span>
                            <span class="label label-<?php echo $video->state == 'licensed' ? 'success' : 'danger'; ?>"><?php echo ucfirst($video->state); ?></span>

                        </a>
                        <div class="block-contents">
                            <div class="title">
                                <h2 class="title_text">
                                    <?php if(strlen($video->title) > 20){
                                        echo substr($video->description, 0, 20) . '...';
                                    } else {
                                        echo $video->title;
                                    } ?>
                                </h2>
                                <span><?= \App\Libraries\TimeHelper::convert_seconds_to_HMS($video->duration); ?></span>
                            </div>
                            <p class="desc">
                                <?php if(strlen($video->description) > 90){
                                    echo substr($video->description, 0, 90) . '...';
                                } else {
                                    echo $video->description;
                                } ?>
                            </p>
                        </div>
                    </article>
                </div>
                <?php endforeach; ?>
            </div>
        </article>
    </section>




    <!-- PAGINATION SECTION -->
    <section class="pagination_section">
        <div class="container">
            <div class="row">
                <div class="col">
                    <nav aria-label="sniffr_pagination">
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
@endsection