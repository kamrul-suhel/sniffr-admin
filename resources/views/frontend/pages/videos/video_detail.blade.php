@extends('frontend.master')
@section('content')

    <section id="videos" class="page-videos">
        <video></video>
        <div class="heading">
        </div>
    </section>

    <!-- VIDEOS DETAIL SECTION -->
    <section class="videos-detail-section section-space">
        <v-container grid-list-lg pt-0>
            <v-layout row wrap>
                <v-flex pt-0>
                    <div id="video-bg">
                        @if($video->access == 'guest' ||
                            ( ($video->access == 'subscriber' || $video->access == 'registered') &&
                            !Auth::guest() ) || (!Auth::guest() &&
                            (Auth::user()->role == 'demo' ||
                            Auth::user()->role == 'admin')) ||
                            (!Auth::guest() && $video->access == 'registered' &&
                            $settings->free_registration &&
                            Auth::user()->role == 'registered') )
                            {!! \App\Libraries\VideoHelper::getVideoHTML($video, true) !!}
                        @else
                            <div id="subscribers-only">
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
                </v-flex>
            </v-layout>

            <v-layout row wrap class="video-detail-content">
                <v-flex xs12 sm12 md8 lg8>
                    <h2>{{ $video->title }}</h2>
                    <p>{{ $video->description }}</p>
                    <div class="video-detail-tags">
                        @if(count($video->tags))
                            <h3 id="tags">Tags:</h3>
                            <ul>
                                @foreach($video->tags as $key => $tag)
                                    <li>
                                        <a href="/videos/tag/{{ $tag->name }}">
                                            #{{ $tag->name }}@if($key+1 != count($video->tags)), @endif
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </v-flex>

                <v-flex xs12 sm12 md4 lg4>
                    <v-layout  column wrap align-content-center="true" class="video-detail-sidebar">
                        <v-flex xs12 class="video-detail-viewer" text-xs-center text-md-center text-lg-right text-xl-right>
                            <v-btn raised class="favorite @if(isset($favorited->id)) active @endif"
                                 data-authenticated="{{ !Auth::guest() }}"
                                 data-videoid="{{$video->id}}">
                                Favorite <v-icon right dark>favorite</v-icon>
                            </v-btn>
                            
                            @if(Auth::user() && Auth::user()->role == 'client' && $video->file)
                                <a href="/download/{{$video->alpha_id}}" class="download btn btn-primary">
                                    <i class="fa fa-download"></i> Download
                                </a>
                            @endif

                            @if(isset($view_increment) && $view_increment == true )
                                {{ $video->views + 1 }} Views
                            @else
                                {{ $video->views }} Views
                            @endif
                        </v-flex>

                        <div class="video-detail-social-share">
                            <div class="video-license">License</div>
                            <div class="video-social-link">
                                <h3>Share</h3>

                                @php
                                    if(isset($video)):
                                    $media_title = $video->title;
                                    $url = ($settings->enable_https) ? secure_url('video') : URL::to('video');
                                    $media_url = $url . '/' . $video->id;
                                elseif(isset($post)):
                                    $media_title = $post->title;
                                    $url = ($settings->enable_https) ? secure_url('post') : URL::to('post');
                                    $media_url = $url . '/' . $post->slug;
                                else:
                                    $media_title = '';
                                    $media_url = '';
                                endif;
                                    $media_subject = $media_title;
                                @endphp
                                <ul>
                                    <!-- Buttons start here. Copy this ul to your document. -->
                                    <ul class="rrssb-buttons clearfix">
                                        <li class="rrssb-facebook">
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=<?= $media_url ?>" class="popup">
                                                <i class="fab fa-facebook-f fa-1x"></i>
                                            </a>
                                        </li>
                                        <li class="rrssb-twitter">
                                            <a href="http://twitter.com/home?status=<?= $media_subject ?> : <?= $media_url ?>" class="popup">
                                                <i class="fab fa-twitter fa-1x"></i>
                                            </a>
                                        </li>
                                        <li class="rrssb-email">
                                            <a href="mailto:?subject=<?= $media_subject ?>&amp;body=<?= $media_url ?>">
                                                <i class="fas fa-at"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <!-- Buttons end here -->
                                </ul>
                            </div>
                        </div>
                    </v-layout>
                </v-flex>

            </v-layout>
        </v-container>
    </section>

@endsection

@section('page_script')
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
        });
    </script>
@endsection