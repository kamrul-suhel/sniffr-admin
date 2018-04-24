<!DOCTYPE html>
<html>
<head>
    <!-- All meta tags -->
    @include('frontend.layout.head.meta')

    @php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; @endphp
    <link rel="shortcut icon" href="{{ Config::get('site.uploads_dir') . 'settings/' . $favicon }}" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
     <link rel="stylesheet" href="{{asset('assets/css/video-js.css')}}" />

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