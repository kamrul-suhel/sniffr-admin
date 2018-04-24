
<!DOCTYPE html>
<html>
<head>
    <!-- All meta tags -->
    @extends('frontend.layout.head.meta')

    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/hellovideo-fonts.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/intlTelInput.css')}}">
    @if(@isset($video->id) || @isset($episode->id)): ?>
        <link href="{{asset('/assets/frontend/theme/css/video-js.css')}}" rel="stylesheet">
        <style type="text/css">
            .vjs-default-skin .vjs-control-bar,
            .vjs-default-skin .vjs-big-play-button { background: rgba(0,0,0,0.58) }
            .vjs-default-skin .vjs-slider { background: rgba(0,0,0,0.19333333333333333) }
        </style>
    @endif
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/style.css?ver=1.4')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/spinkit.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/rrssb.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/animate.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/jquery.fileupload.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/jquery.fileupload-ui.css')}}" />
    <style type="text/css"><?= \App\Libraries\ThemeHelper::getThemeSetting(@$theme_settings->custom_css, '') ?></style>


    <link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
    @php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; @endphp
    <link rel="shortcut icon" href="{{ Config::get('site.uploads_dir') . 'settings/' . $favicon }}" type="image/x-icon">

    <!-- If we need to add page specifice style -->
    @yield('page_styles')

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

    <link rel="stylesheet" href="{{asset('assets/frontend/css/styles.css')}}" />

    <link rel="stylesheet" href="{{asset('assets/css/video-js.css')}}" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/airbrake-js/1.0.4/client.min.js"></script>
    <script>
        // Airbrake error notificatios
        var airbrake = new airbrakeJs.Client({
            projectId: 173150,
            projectKey: 'd99bce11ba0141789be1472f47cbb8a0'
        });
        airbrake.addFilter(function (notice) {
            notice.context.environment = 'production';
            return notice;
        });
    </script>
    <!-- load app.js in header else it won't work -->
    <script type="text/javascript" src="/assets/js/app.js?ver=1.5"></script>
    <!-- end js load -->
</head>
<body @if(Request::is('/')) class="home" @endif>

    @extends('frontend.layout.navigation')

    @yield('content')

    @extends('frontend.layout.footer')


<script type="text/javascript">
    $('document').ready(function(){
        //previous code for right side admin dropdown (if logged in)
        $('.dropdown').hover(function(){
            $(this).addClass('open');
        }, function(){
            $(this).removeClass('open');
        });
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