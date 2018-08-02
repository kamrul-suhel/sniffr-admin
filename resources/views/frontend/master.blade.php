<!DOCTYPE html>
<html>
<head>
    @include('frontend.layout.head.meta')

    <?php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . $favicon ?>" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/css/video-js.css')}}" />
    <link rel="stylesheet" href="{{ mix('/assets/frontend/css/nav-styles.css') }}">
    <link rel="stylesheet" href="{{ mix('/assets/frontend/css/footer-styles.css') }}">
    <link rel="stylesheet" href="{{mix('assets/frontend/css/styles.css')}}" />

    <!-- If we need to add page specific style -->
    @yield('page_styles')

</head>
<body {{ (Request::is('/')) ? 'class="home"' : '' }}>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
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

    <script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>
    <script src="{{mix('assets/frontend/scripts/scripts.js')}}"></script>

    @include('partials.ganalytics')

    @yield('page_script')
</body>
</html>
