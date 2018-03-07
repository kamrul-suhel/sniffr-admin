<!DOCTYPE html>
<html lang="en" xml:lang="en" xmlns= "http://www.w3.org/1999/xhtml">
<head>
    <?php $settings = \App\Setting::first(); ?>

    <?php if(isset($video->id)): ?>

    <title><?= $video->title; ?></title>
    <meta name="description" content="<?= $video->description ?>">
    <meta http-equiv="Content-Language" content="en">

    <?php
    $keywords = '';

    foreach($video->tags as $tag):
        $keywords .= $tag->name . ', ';
    endforeach;

    $keywords = rtrim($keywords, ', ');
    ?>

<!-- for Google -->
    <meta name="keywords" content="<?= $keywords ?>" />

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="<?= $video->title ?>">
    <meta itemprop="description" content="<?= $video->description ?>">
    <meta itemprop="image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($video->image, 'large')  ?>">

    <!-- for Facebook -->
    <meta property="og:title" content="<?= $video->title ?>" />
    <meta property="og:type" content="video.other" />
    <meta property="og:image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($video->image, 'large')  ?>" />
    <meta property="og:url" content="<?= Request::url(); ?>" />
    <meta property="og:description" content="<?= $video->description ?>" />

    <!-- for Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="<?= $video->title ?>" />
    <meta name="twitter:description" content="<?= $video->description ?>" />
    <meta name="twitter:image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($video->image, 'large')  ?>" />

    <?php elseif(isset($post->id)): ?>

    <?php $post_description = preg_replace('/^\s+|\n|\r|\s+$/m', '', strip_tags($post->body)); ?>

    <title><?= $post->title; ?></title>
    <meta name="description" content="<?= $post_description ?>">

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="<?= $post->title ?>">
    <meta itemprop="description" content="<?= $post_description ?>">
    <meta itemprop="image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($post->image, 'large')  ?>">

    <!-- for Facebook -->
    <meta property="og:title" content="<?= $post->title ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($post->image, 'large')  ?>" />
    <meta property="og:url" content="<?= Request::url(); ?>" />
    <meta property="og:description" content="<?= $post_description ?>" />

    <!-- for Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="<?= $post->title ?>" />
    <meta name="twitter:description" content="<?= $post_description ?>" />
    <meta name="twitter:image" content="<?= ($settings->enable_https) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($post->image, 'large')  ?>" />

    <?php elseif(isset($page->id)): ?>

    <title><?= $page->title . '-' . $settings->website_name; ?></title>
    <meta name="description" content="<?= $page->title . '-' . $settings->website_name; ?>">

    <?php else: ?>

    <title><?php echo $settings->website_name . ' - ' . $settings->website_description; ?></title>
    <meta name="description" content="<?= $settings->website_description ?>">

    <?php endif; ?>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="HandheldFriendly" content="true">

    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/bootstrap.min.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/font-awesome.min.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/hellovideo-fonts.css'; ?>" />
    <link rel="stylesheet" href="/assets/css/intl-tel-input/css/intlTelInput.css">
    <?php if(isset($video->id) || isset($episode->id)): ?>

    <link href="<?= THEME_URL . '/assets/css/video-js.css'; ?>" rel="stylesheet">
    <style type="text/css">
        .vjs-default-skin .vjs-control-bar,
        .vjs-default-skin .vjs-big-play-button { background: rgba(0,0,0,0.58) }
        .vjs-default-skin .vjs-slider { background: rgba(0,0,0,0.19333333333333333) }
    </style>

    <?php endif; ?>
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/style.css?ver=1.4'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/spinkit.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/rrssb.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/animate.min.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/jquery.fileupload.css'; ?>" />
    <link rel="stylesheet" href="<?= THEME_URL . '/assets/css/jquery.fileupload-ui.css'; ?>" />
    <style type="text/css"><?= \App\Libraries\ThemeHelper::getThemeSetting(@$theme_settings->custom_css, '') ?></style>
    <link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
    <?php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . 'settings/' . $favicon ?>" type="image/x-icon">

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
<body <?php if(Request::is('/')) echo 'class="home"'; ?>>

<div id="page-wrapper">
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a id="nav-toggle" href="#"><span></span></a>
                <?php $logo = (!empty($settings->logo)) ? Config::get('site.uploads_dir') . 'settings/' . $settings->logo : THEME_URL . '/assets/img/logo.png'; ?>
                <a href="/" class="navbar-brand"><img src="<?= $logo ?>" /></a>
            </div>

            <div class="collapse navbar-collapse right" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-left">
                    <li><a href="/upload"><i class="fa fa-cloud-upload"></i> Upload</a></li>
                    <?php if(!Auth::guest() && (Auth::user()->role == 'client' || Auth::user()->role == 'admin')): ?>
                    <li><a href="<?= url('client/videos') ?>"><i class="fa fa-youtube-play"></i>Videos</a></li>
                    <?php endif; ?>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <?php if(Auth::guest()): ?>
                    <li class="login-desktop"><a href="/login"><i class="fa fa-lock"></i> Login</a></li>
                    <?php else: ?>
                    <li class="dropdown">
                        <a href="#_" class="user-link-desktop dropdown-toggle" data-toggle="dropdown"><img src="<?= Config::get('site.uploads_dir') . 'avatars/' . Auth::user()->avatar ?>" class="img-circle" /> <?= ucwords(Auth::user()->username) ?> <i class="fa fa-chevron-down"></i></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="<?= url('user') ?><?= '/' . Auth::user()->username; ?>">My Profile</a></li>
                            <?php if(Auth::user()->role == 'client' && Auth::user()->username == 'dailymail'): ?>
                            <li><a href="<?= url('client/dashboard') ?>">Dailies</a></li>
                            <?php endif; ?>
                            <?php if(Auth::user()->role == 'admin' || Auth::user()->role == 'manager'): ?>
                            <li class="divider"></li>
                            <li><a href="<?= url('admin') ?>"> Admin</a></li>
                            <?php endif; ?>
                            <li class="divider"></li>
                            <li><a href="<?= url('logout') ?>" id="user_logout_mobile"><i class="fa fa-power-off"></i> Logout</a></li>
                        </ul>
                    </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <div class="clear"></div>

    <div id="page-content">
        <div id="home-hero" class="vidbg-box">
            <video src="/assets/video/ocean.mp4" autoplay muted loop></video>
            <div id="dim-bg">
                <div class="home-titles">
                    <h1>Video Licensing Platform</h1>
                    <h4>License viral videos viewed by millions around the world from UNILAD</h4>
                    <button class="btn btn-primary" onClick="window.location='/upload'" href="/videos">Upload Your Video</button>
                </div>
            </div>
        </div>
    </div>

    <div class="content-body">
        <h1>Some content go here</h1>
    </div>

    <footer>
        <div class="container">
            <div class="footer-wrapper">
                <div class="footer-copy">
                    <h3><?php echo $settings->website_name; ?></h3>
                    <p>Sniffr is your Video Licensing Platform. Browse our huge catalogue of videos.</p>
                </div>

                <div class="icons-social">
                    <?php if($settings->facebook_page_id): ?><a href="http://facebook.com/<?php echo $settings->facebook_page_id; ?>" target="_blank" class="facebook social-link"><i class="fa fa-facebook"></i></a><?php endif; ?>
                    <?php if($settings->twitter_page_id): ?><a href="http://twitter.com/<?php echo $settings->twitter_page_id; ?>" target="_blank" class="twitter social-link"><i class="fa fa-twitter"></i></a><?php endif; ?>
                    <?php if($settings->google_page_id): ?><a href="http://plus.google.com/<?php echo $settings->google_page_id; ?>" target="_blank" class="google social-link"><i class="fa fa-google-plus"></i></a><?php endif; ?>
                    <?php if($settings->youtube_page_id): ?><a href="http://youtube.com/<?php echo $settings->youtube_page_id; ?>" target="_blank" class="youtube social-link"><i class="fa fa-youtube"></i></a><?php endif; ?>
                </div>
            </div>

            <hr />
            <p class="copyright">Copyright &copy; <?= date('Y'); ?> <?= $settings->website_name; ?></p>
        </div>
    </footer>
</div>

<script type="text/javascript">

    $('document').ready(function(){
        //previous code for right side admin dropdown (if logged in)
        $('.dropdown').hover(function(){
            $(this).addClass('open');
        }, function(){
            $(this).removeClass('open');
        });

        //previous code so looks like something for nav menu
        $('#nav-toggle').click(function(){
            $(this).toggleClass('active');
            $('.navbar-collapse').toggle();
            $('body').toggleClass('nav-open');
        });

        $('#mobile-subnav').click(function(){
            if($('.second-nav .navbar-left').css('display') == 'block'){
                $('.second-nav .navbar-left').slideUp(function(){
                    $(this).addClass('not-visible');
                });
                $(this).html('<i class="fa fa-bars"></i> Open Submenu');
            } else {
                $('.second-nav .navbar-left').slideDown(function(){
                    $(this).removeClass('not-visible');
                });
                $(this).html('<i class="fa fa-close"></i> Close Submenu');
            }
        });
    });

    /********** LOGIN MODAL FUNCTIONALITY **********/
    var loginSignupModal = $('<div class="modal fade" id="loginSignupModal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Login Below</h4></div><div class="modal-body"></div></div></div></div>');

    $(document).ready(function(){
        // Load the Modal Window for login signup when they are clicked
        $('.login-desktop a').click(function(e){
            e.preventDefault();
            $('body').prepend(loginSignupModal);
            $('#loginSignupModal .modal-body').load($(this).attr('href') + '?redirect=' + document.URL + ' .form-signin', function(){
                $('#loginSignupModal').show(200, function(){
                    setTimeout(function() { $('#email').focus() }, 300);
                });

                $('#loginSignupModal').modal();
            });

            // Be sure to remove the modal from the DOM after it is closed
            $('#loginSignupModal').on('hidden.bs.modal', function (e) {
                $('#loginSignupModal').remove();
            });
        });
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
</body>
</html>
