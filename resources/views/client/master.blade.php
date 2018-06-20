<!DOCTYPE html>
<html>
<head>
    @include('frontend.layout.head.meta')

    <?php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . $favicon ?>" type="image/x-icon">

    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">

    <link rel="stylesheet" href="{{asset('assets/css/video-js.css')}}"/>
    <link rel="stylesheet" href="{{ mix('/assets/frontend/css/client/nav-styles.css') }}">
    <link rel="stylesheet" href="{{ mix('/assets/frontend/css/client/footer-styles.css') }}">
    <link rel="stylesheet" href="{{mix('assets/frontend/css/styles.css')}}"/>
    <link rel="stylesheet" href="{{ mix('/assets/css/admin.css') }}">


    <!-- Hotjar Tracking Code for https://sniffrmedia.co.uk/ -->
    <script>
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () {
                (h.hj.q = h.hj.q || []).push(arguments)
            };
            h._hjSettings = {hjid: 874669, hjsv: 6};
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>

    <!-- If we need to add page specific style -->
    @yield('page_styles')
</head>
<body {{ (Request::is('/')) ? 'class="home"' : '' }}>

<section id="sniffr">
    <section id="nav" class="section-space nav-background">
        <div class="container grid-list-lg">
            <div class="layout row wrap">
                <div class="flex xs12 sm6 md4 lg4">
                    <div class="logo"><a href="/" class="router-link-active">
                            <img src="/assets/frontend/images/logo-sniffr-white.png"></a><p style="color:white; margin: 0px;">Client Portal</p></div>
                </div>
                <div class="flex xs12 sm6 md8 lg8">
                    <nav class="navigation">
                        <ul>
                            <li><a href="/client/videos" class=""><i aria-hidden="true" class="icon icon--right white--text material-icons"></i><i class="fa fa-video-camera"></i> Videos</a></li>
                            <li><a href="/client/stories" class=""><i aria-hidden="true" class=" white--text material-icons"></i><i class="fa fa-at"></i> Stories</a></li>

                            @if(in_array(auth()->user()->role, ['client', 'client_admin', 'client_owner']))
                                <li><a href="/client/profile" class="">
                                        <i aria-hidden="true" class="icon icon--right white--text material-icons"></i>
                                        <i class="fa fa-industry"></i> {{ auth()->user()->client->name ?? 'Company Settings' }}</a>
                                </li>
                            @else
                                <li><a href="/client/profile/{{auth()->user()->client->slug}}/users/{{auth()->user()->id}}/edit" class=""><i aria-hidden="true" class="icon icon--right white--text material-icons"></i><i class="fa fa-user"></i> {{ auth()->user()->username ?? 'Profile' }}</a></li>
                            @endif
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="login-dialog">
            <div class="dialog__container login-section" style="display: block;">
            </div>
        </div>
        <div class="dialog__container" style="display: block;">
        </div>
        <div class="menu__content"
             style="min-width: 140px; top: 57px; left: 658px; transform-origin: left top 0px; z-index: 12; display: none;">
            <div class="list"><!---->
                <div>
                    <div class="list__tile">
                        <div class="list__tile__title"><a><i aria-hidden="true"
                                                             class="icon icon--left white--text material-icons"
                                                             style="font-size: 20px;">alternate_email</i> Stories
                            </a></div>
                    </div>
                </div>
                <div>
                    <div class="list__tile">
                        <div class="list__tile__title"><a><i aria-hidden="true"
                                                             class="icon icon--left white--text material-icons"
                                                             style="font-size: 20px;">video_library</i> Videos
                            </a></div>
                    </div>
                </div>
                <div>
                    <div class="list__tile">
                        <div class="list__tile__title"><a href="/client/stories/downloaded" class=""><i
                                        aria-hidden="true" class="icon icon--left white--text material-icons"
                                        style="font-size: 20px;">done</i> Downloaded
                            </a></div>
                    </div>
                </div>
                <div>
                    <div class="list__tile">
                        <div class="list__tile__title"><a><i aria-hidden="true"
                                                             class="icon icon--left white--text material-icons"
                                                             style="font-size: 20px;">lock_out</i> Logout
                            </a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container">
        <br>
        @yield('content')
    </div>

    <section class="footer-section section-space">
        <div class="container pt-0 pb-0 grid-list-lg">
            <div class="layout row wrap">
                <div class="flex xs12 sm8 md8 lg8">
                    <div class="footer-left">
                        <div class="footer-logo"><img src="/assets/frontend/images/logo-sniffr-white.png"></div>
                        <div class="footer-text"><p>Sniffr is your Video Licensing Platform. Browse our huge catalogue
                                of videos.</p></div>
                    </div>
                </div>
                <div class="flex xs12 sm4 md4 lg4">
                    <div class="footer-right">
                        <div class="social-section">
                            <ul>
                                <li><a href="https://www.facebook.com/uniladmag" target="_blank"
                                       class="facebook social-link">
                                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px;">
                                            <path fill="#ffffff"
                                                  d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z"></path>
                                        </svg>
                                    </a></li>
                                <li><a href="https://twitter.com/unilad" target="_blank" class="twitter social-link">
                                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px;">
                                            <path fill="#ffffff"
                                                  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                                        </svg>
                                    </a></li>
                                <li><a href="https://www.youtube.com/user/uniladtv" target="_blank"
                                       class="youtube social-link">
                                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px;">
                                            <path fill="#ffffff"
                                                  d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path>
                                        </svg>
                                    </a></li>
                                <li><a href="https://www.instagram.com/unilad/" target="_blank"
                                       class="instagram social-link">
                                        <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;">
                                            <path fill="#ffffff"
                                                  d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"></path>
                                        </svg>
                                    </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog__container video-dialog-container" style="display: block;"></div>
    </section>
</section>

<script src="{{ mix('/assets/admin/js/app.js') }}"></script>
<script src="/assets/admin/js/video.js"></script>
<script src="/assets/admin/js/videojs-vimeo.js"></script>
<script src="{{mix('assets/admin/scripts/scripts.js')}}"></script>
<script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>


@include('partials.ganalytics')

@yield('page_script')
</body>
</html>