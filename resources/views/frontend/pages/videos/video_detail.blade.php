@extends('frontend.master')
@section('content')

    <section id="videos" class="page_videos">
        <video></video>
        <div class="heading">
            <div class="position-center">
                <h1>{{ $video->title }}</h1>
            </div>
        </div>
    </section>

    <!-- VIDEOS DETAIL SECTION -->

    <section class="videos_detail_section section_space">
        <article class="container">
            <div class="row">
                <div class="col">
                    <div id="video_bg">
                        <div class="container text-center">
                            @if($video->access == 'guest' || ( ($video->access == 'subscriber' || $video->access == 'registered') && !Auth::guest() ) || (!Auth::guest() && (Auth::user()->role == 'demo' || Auth::user()->role == 'admin')) || (!Auth::guest() && $video->access == 'registered' && $settings->free_registration && Auth::user()->role == 'registered') )
			                    {!! \App\Libraries\VideoHelper::getVideoHTML($video, true) !!}
		                    @else
                                <div id="subscribers_only">
                                    <h2>Sorry, this video is only available to @if($video->access == 'subscriber') Subscribers @elseif($video->access == 'registered') Registered Users @endif</h2>
                                    <div class="clear"></div>
                                    @if(!Auth::guest() && $video->access == 'subscriber')
                                        <form method="get" action="/user/{{ Auth::user()->username }}/upgrade_subscription">
                                            <button id="button">Become a subscriber to watch this video</button>
                                        </form>
                                    @else
                                    <form method="get" action="/signup">
                                        <button id="button">Signup Now @if($video->access == 'subscriber') to Become a Subscriber @elseif($video->access == 'registered') for Free! @endif</button>
                                    </form>
                                    @endif
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="row video_detail_content">
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <h2>{{ $video->title }}</h2>
                    <p>{{ $video->description }}</p>
                    <div class="video_detail_tags">
                        @if(count($video->tags))
                            <h3 id="tags">Tags:</h3>
                            <ul>
                                @foreach($video->tags as $key => $tag)
                                    <li>
                                        <a href="/videos/tag/{{ $tag->name }}">#{{ $tag->name }}@if($key+1 != count($video->tags)), @endif
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <div class="video_detail_sidebar">
                        <div class="video_detail_vidwer text-right">
                            @if(isset($view_increment) && $view_increment == true ) {{ $video->views + 1 }} Views @else {{ $video->views }} Views @endif
                        </div>
                        <div class="video_detail_social_share">
                            <div class="video_license">License</div>
                            <div class="video_social_link">
                                <h3>Share</h3>
                                <ul>
                                    <li><a href="#"><i class="fab fa-facebook-f fa-1x"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter fa-1x"></i></a></li>
                                    <li><a href="#"><i class="fab fa-youtube fa-1x"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-vimeo-v"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </article>
    </section>









    <section class="videos_section section_space">
        <article class="container">
            <div class="row">
                <div class="container video-details">
                    <h3><span class="pull-right">
                            <div class="favorite btn btn-default <?php if(isset($favorited->id)): ?>active<?php endif; ?>" data-authenticated="<?= !Auth::guest() ?>" data-videoid="<?= $video->id ?>"><i class="fa fa-heart"></i> Favorite</div>
                            <?php if(Auth::user() && Auth::user()->role == 'client' && $video->file): ?><a href="/download/<?php echo $video->alpha_id; ?>" class="download btn btn-primary"><i class="fa fa-download"></i> Download</a><?php endif; ?>
		</span>
                    </h3>

                    <div class="video-details-container"><?= $video->details ?></div>



                <!--div id="social_share">
    	<p>Share This Video:</p>
		<?php //include('partials/social-share.php'); ?>
	</div-->
                </div>

                <script src="/assets/admin/js/video.js"></script>
                <script src="/assets/admin/js/videojs-vimeo.js"></script>

                <script type="text/javascript">
                    $(document).ready(function(){
                        $('.favorite').click(function(){
                            if($(this).data('authenticated')){
                                $.post('/favorite', { video_id : $(this).data('videoid'), _token: '<?= csrf_token(); ?>' }, function(data){});
                                $(this).toggleClass('active');
                            } else {
                                window.location = '/login';
                            }
                        });

                        var massVideo = $('.video-js');
                        for(var i = 0; i < massVideo.length; i++){
                            videojs(massVideo[i]).ready(function(){
                                var myPlayer = this;    // Store the video object
                                var aspectRatio = 9/16; // Make up an aspect ratio

                                function resizeVideoJS(){
                                    // Get the parent element's actual width
                                    var width = $('.video-container')[0].offsetWidth;
                                    // Set width to fill parent element, Set height
                                    myPlayer.width(width).height( width * aspectRatio );
                                }

                                resizeVideoJS(); // Initialize the function
                                window.onresize = resizeVideoJS; // Call the function on resize
                            });
                        }

                        TwitterWidgetsLoader.load(function(twttr) {
                            var tweets = jQuery(".tweet");

                            jQuery(tweets).each( function( t, tweet ) {
                                var id = jQuery(this).attr('id');
                                twttr.widgets.createVideo(id,tweet).then( function( el ) {
                                    //console.log('Video added.');
                                });
                            });
                        });
                    });
                </script>
            </div>
        </article>
    </section>

@endsection