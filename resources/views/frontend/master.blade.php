<!DOCTYPE html>
<html>
<head>
    <!-- All meta tags -->
    @include('frontend.layout.head.meta')

    @php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; @endphp
    <link rel="shortcut icon" href="{{ Config::get('site.uploads_dir') . 'settings/' . $favicon }}" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/frontend/css/styles.css')}}" />

    <!-- If we need to add page specific style -->
    @yield('page_styles')
</head>
<body @if(Request::is('/')) class="home" @endif>
    <section id="sniffr">
        <v-app>
            <navigation-component></navigation-component>

            <v-content>
                <div id="scroll_to"></div>
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>

            <footer-component></footer-component>
        </v-app>
    </section>

    <!-- Scripts Section -->
    <script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>
    <script src="{{asset('assets/frontend/scripts/scripts.js')}}"></script>
    <!-- End scripts Section -->


<script src="/assets/admin/js/video.js"></script>
<script src="/assets/admin/js/videojs-vimeo.js"></script>

<script type="text/javascript">
    $(document).ready(function(){

        // var massVideo = $('.video-js');
        // for(var i = 0; i < massVideo.length; i++){
        //     videojs(massVideo[i]).ready(function(){
        //         var myPlayer = this;    // Store the video object
        //         var aspectRatio = 2/4; // Make up an aspect ratio

        //         function resizeVideoJS(){
        //             // Get the parent element's actual width
        //             var width = $('.video-container')[0].offsetWidth;
        //             // Set width to fill parent element, Set height
        //             myPlayer.width(width).height( width * aspectRatio );
        //         }

        //         resizeVideoJS(); // Initialize the function
        //         window.onresize = resizeVideoJS; // Call the function on resize
        //     });
        // }
    });
</script>


    
    @if(isset($settings['google_tracking_id']) && $settings['google_tracking_id'] != '')
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', '{{ $settings['google_tracking_id'] }}', 'auto');
            ga('send', 'pageview');
        </script>
    @endif

    <!-- Page specifice script go here -->
    @yield('page_script')
</body>
</html>