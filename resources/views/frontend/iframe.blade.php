<!DOCTYPE html>
<html>
<head>
    <!-- All meta tags -->
    @include('frontend.layout.head.meta')

    @php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; @endphp
    <link rel="shortcut icon" href="{{ Config::get('site.uploads_dir') . $favicon }}" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{mix('assets/frontend/css/styles.css')}}" />

    <!-- If we need to add page specific style -->
    @yield('page_styles')
</head>
<body @if(Request::is('/')) class="home" @endif>
    <section id="sniffr">
        <v-app>
            <v-content>
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>
        </v-app>
    </section>

    <!-- Scripts Section -->
    <script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>
    <script src="{{mix('assets/frontend/scripts/scripts.js')}}"></script>
    <!-- End scripts Section -->

    @include('partials.ganalytics')

    <!-- Page specific script go here -->
    @yield('page_script')
</body>
</html>
