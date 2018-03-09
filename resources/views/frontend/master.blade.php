
<!DOCTYPE html>
<html lang="en" xml:lang="en" xmlns= "http://www.w3.org/1999/xhtml">
<head>
    <!-- All meta tags -->
    @extends('frontend.layout.head.meta')

    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/font-awesome.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/hellovideo-fonts.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/intlTelInput.css')}}">
    <?php if(isset($video->id) || isset($episode->id)): ?>

        <link href="{{asset('/assets/frontend/theme/css/video-js.css')}}" rel="stylesheet">
        <style type="text/css">
            .vjs-default-skin .vjs-control-bar,
            .vjs-default-skin .vjs-big-play-button { background: rgba(0,0,0,0.58) }
            .vjs-default-skin .vjs-slider { background: rgba(0,0,0,0.19333333333333333) }
        </style>

    <?php endif; ?>
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/style.css?ver=1.4')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/spinkit.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/rrssb.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/animate.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/jquery.fileupload.css')}}" />
    <link rel="stylesheet" href="{{asset('/assets/frontend/theme/css/jquery.fileupload-ui.css')}}" />
    <style type="text/css"><?= \App\Libraries\ThemeHelper::getThemeSetting(@$theme_settings->custom_css, '') ?></style>


    <link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
    <?php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . 'settings/' . $favicon ?>" type="image/x-icon">

    <!-- If we need to add page specifice style -->
    @yield('page_styles')

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

    <link rel="stylesheet" href="{{asset('assets/frontend/css/styles.css')}}" />

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
//        //previous code for right side admin dropdown (if logged in)
//        $('.dropdown').hover(function(){
//            $(this).addClass('open');
//        }, function(){
//            $(this).removeClass('open');
//        });
//
//        //previous code so looks like something for nav menu
//        $('#nav-toggle').click(function(){
//            $(this).toggleClass('active');
//            $('.navbar-collapse').toggle();
//            $('body').toggleClass('nav-open');
//        });
//
//        $('#mobile-subnav').click(function(){
//            if($('.second-nav .navbar-left').css('display') == 'block'){
//                $('.second-nav .navbar-left').slideUp(function(){
//                    $(this).addClass('not-visible');
//                });
//                $(this).html('<i class="fa fa-bars"></i> Open Submenu');
//            } else {
//                $('.second-nav .navbar-left').slideDown(function(){
//                    $(this).removeClass('not-visible');
//                });
//                $(this).html('<i class="fa fa-close"></i> Close Submenu');
//            }
//        });
    });

    /********** LOGIN MODAL FUNCTIONALITY **********/
    var loginSignupModal = $('<div class="modal fade" id="loginSignupModal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Login Below</h4></div><div class="modal-body"></div></div></div></div>');

    $(document).ready(function(){
        // Load the Modal Window for login signup when they are clicked
//        $('.login-desktop a').click(function(e){
//            e.preventDefault();
//            $('body').prepend(loginSignupModal);
//            $('#loginSignupModal .modal-body').load($(this).attr('href') + '?redirect=' + document.URL + ' .form-signin', function(){
//                $('#loginSignupModal').show(200, function(){
//                    setTimeout(function() { $('#email').focus() }, 300);
//                });
//
//                $('#loginSignupModal').modal();
//            });
//
//            // Be sure to remove the modal from the DOM after it is closed
//            $('#loginSignupModal').on('hidden.bs.modal', function (e) {
//                $('#loginSignupModal').remove();
//            });
//        });
    });
    /********** END LOGIN MODAL FUNCTIONALITY **********/
</script>

<?php if(isset($settings->google_tracking_id) && $settings->google_tracking_id != ''): ?>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '<?= $settings->google_tracking_id ?>', 'auto');
    ga('send', 'pageview');
</script>
<?php endif; ?>
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

