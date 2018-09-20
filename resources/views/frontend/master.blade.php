<!DOCTYPE html>
<html>
<head>
    @include('frontend.layout.head.meta')

    <?php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.img_url') . $favicon ?>" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/css/video-js.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/frontend/css/styles.css')}}" />

    <!-- If we need to add page specific style -->
    @yield('page_styles')

</head>
<body {{ (Request::is('/')) ? 'class="home"' : '' }}>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
            {{--<navigation-component></navigation-component>--}}

            <v-content>
                <div id="scroll_to"></div>
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>

            {{--<footer-component></footer-component>--}}
        </v-app>
    </section>

    <script src="{{mix('assets/frontend/scripts/scripts.js')}}"></script>

    @yield('page_script')
</body>
</html>
