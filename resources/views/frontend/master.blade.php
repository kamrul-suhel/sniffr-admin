<!DOCTYPE html>
<html>
<head>
    <!-- All meta tags -->
    @include('frontend.layout.head.meta')

    @if(isset($video->id) || isset($episode->id))
        <link href="{{asset('/assets/frontend/theme/css/video-js.css')}}" rel="stylesheet">
    @endif

    @php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; @endphp
    <link rel="shortcut icon" href="{{ Config::get('site.uploads_dir') . 'settings/' . $favicon }}" type="image/x-icon">

    <!-- If we need to add page specific style -->
    @yield('page_styles')
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>


    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/frontend/css/plugin/vuetify.css')}}" />


    <link rel="stylesheet" href="{{asset('assets/frontend/css/styles.css')}}" />
</head>
<body @if(Request::is('/')) class="home" @endif>

    <section id="sniffr">
        <v-app>
            @include('frontend.layout.navigation')

            @yield('content')
            @include('frontend.layout.footer')
            @include('frontend.layout.login_form')
        </v-app>
    </section>

    <!-- Scripts Section -->
    <script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>
    {{--<script src="{{asset('assets/frontend/scripts/plugin.js')}}"></script>--}}

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
    <script src="{{asset('assets/frontend/scripts/scripts.js')}}"></script>

    <!-- End scripts Section -->


    @if(isset($settings->google_tracking_id) && $settings->google_tracking_id != '')
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', '{{ $settings->google_tracking_id }}', 'auto');
            ga('send', 'pageview');
        </script>
    @endif
    <script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>

    <!-- Page specifice script go here -->
    @yield('page_script')
</body>
</html>