<!DOCTYPE html>
<html lang="en">
<head>
	<?php $settings = App\Setting::first(); ?>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="HelloVideo Admin Panel" />
	<meta name="author" content="" />

	<title>{{ $settings->website_name . ' - ' . $settings->website_description }}</title>

	<link rel="stylesheet" href="{{ '/css/app.css' }}">
	
	<?php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . 'settings/' . $favicon ?>" type="image/x-icon">

	@yield('css')

	<script src="{{ '/application/assets/admin/js/jquery-1.11.0.min.js' }}"></script>
	<script src="{{ '/application/assets/admin/js/bootstrap-colorpicker.min.js' }}" id="script-resource-13"></script>
	<script src="{{ '/application/assets/admin/js/vue.min.js' }}"></script>

	<!--link href="<?= THEME_URL . '/assets/css/video-js.css'; ?>" rel="stylesheet"-->
    <script src="<?= THEME_URL . '/assets/js/video.js'; ?>"></script>

	<script>$.noConflict();</script>

	<!--[if lt IE 9]><script src="{{ '/application/assets/admin/js/ie8-responsive-file-warning.js' }}"></script><![endif]-->

	<!-- HTML5 shim and Respond.js') }} IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js') }}"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js') }}/1.4.2/respond.min.js') }}"></script>
	<![endif]-->


</head>
<body class="page-body skin-black">

<a href="{{ URL::to('/') }}" class="top-left-logo">
	<img src="/application/assets/admin/images/unilad-logo-small.gif">
</a>

<div class="page-container sidebar-collapsed"><!-- add class "sidebar-collapsed" to close sidebar by default, "chat-visible" to make chat appear always -->
	<div class="sidebar-menu page-right-in">
		<div class="sidebar-menu-inner">
			<header class="logo-env">
				<!-- logo collapse icon -->
				<div class="sidebar-collapse">
					<a href="#" class="sidebar-collapse-icon"><!-- add class "with-animation" if you want sidebar to have animation during expanding/collapsing transition -->
						<i class="fa fa-bars"></i>
					</a>
				</div>

				<!-- open/close menu icon (do not remove if you want to enable menu on mobile devices) -->
				<div class="sidebar-mobile-menu visible-xs">
					<a href="#" class="with-animation"><!-- add class "with-animation" to support animation -->
						<i class="fa fa-bars"></i>
					</a>
				</div>
			</header>

			@include('admin.menu.main')
		</div>
	</div>

	<div class="main-content">
		<div class="row">
			<!-- Profile Info and Notifications -->
			<div class="col-md-6 col-sm-8 clearfix">
				<ul class="user-info pull-left pull-none-xsm">
					<!-- Profile Info -->
					<li class="profile"><!-- add class "pull-right" if you want to place this from right -->
						<img src="{{ Config::get('site.uploads_dir') . 'avatars/' . Auth::user()->avatar }}" alt="" class="img-circle" width="26" />
						<span>Howdy, {{ ucfirst(Auth::user()->username) }}</span>
					</li>
				</ul>
			</div>

			<!-- Raw Links -->
			<div class="col-md-6 col-sm-4 clearfix hidden-xs">
				<ul class="list-inline links-list pull-right">
					<li class="sep"></li>
					<li><a href="{{ URL::to('logout') }}">Log Out <i class="fa fa-sign-out right"></i></a></li>
				</ul>
			</div>
		</div>

		<hr />

		<div id="main-admin-content">
			@yield('content')
		</div>

		<!-- Footer -->
		<footer class="main">
			&copy; 2017 <strong>Unilad</strong> Video Licensing Platform
		</footer>
	</div>
</div>


<!-- Imported styles on this page -->
<link rel="stylesheet" href="{{ '/application/assets/admin/js/jvectormap/jquery-jvectormap-1.2.2.css' }}">
<link rel="stylesheet" href="{{ '/application/assets/admin/js/rickshaw/rickshaw.min.css' }}">

<!-- Bottom scripts (common) -->
<script src="{{ '/application/assets/admin/js/gsap/main-gsap.js' }}"></script>
<script src="{{ '/application/assets/admin/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js' }}"></script>
<script src="{{ '/application/assets/admin/js/bootstrap.js' }}"></script>
<script src="{{ '/application/assets/admin/js/joinable.js' }}"></script>
<script src="{{ '/application/assets/admin/js/resizeable.js' }}"></script>
<script src="{{ '/application/assets/admin/js/jvectormap/jquery-jvectormap-1.2.2.min.js' }}"></script>


<!-- Imported scripts on this page -->
<script src="{{ '/application/assets/admin/js/jvectormap/jquery-jvectormap-europe-merc-en.js' }}"></script>
<script src="{{ '/application/assets/admin/js/jquery.sparkline.min.js' }}"></script>
<script src="{{ '/application/assets/admin/js/rickshaw/vendor/d3.v3.js' }}"></script>
<script src="{{ '/application/assets/admin/js/rickshaw/rickshaw.min.js' }}"></script>
<script src="{{ '/application/assets/admin/js/raphael-min.js' }}"></script>
<script src="{{ '/application/assets/admin/js/morris.min.js' }}"></script>
<script src="{{ '/application/assets/admin/js/toastr.js' }}"></script>


<!-- JavaScripts initializations and stuff -->
<script src="{{ '/application/assets/admin/js/custom.js' }}"></script>


<!-- Demo Settings -->
<script src="{{ '/application/assets/admin/js/main.js' }}"></script>

<!-- Notifications -->
<script>
	var opts = {
		"closeButton": true,
		"debug": false,
		"positionClass": "toast-top-right",
		"onclick": null,
		"showDuration": "30000",
		"hideDuration": "100000",
		"timeOut": "50000",
		"extendedTimeOut": "100000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	};

	<?php if(Session::get('note') != '' && Session::get('note_type') != ''): ?>

        if('<?= Session::get("note_type") ?>' == 'success'){
        	toastr.success('<?= Session::get("note") ?>', "Sweet Success!", opts);
        } else if('<?= Session::get("note_type") ?>' == 'error'){
        	toastr.error('<?= Session::get("note") ?>', "Whoops!", opts);
        }
        <?php Session::forget('note');
              Session::forget('note_type');
        ?>
    <?php endif; ?>

    function display_mobile_menu(){
    	if($(window).width() < 768){
    		$('.sidebar-collapsed').removeClass('sidebar-collapsed');
    	}
    }

    $(document).ready(function(){
    	display_mobile_menu();

		$('.tlink').click(function(){
			var alink = $(this).attr('href');
			if(alink){
				window.location.href = alink;
			}
	    });

    });

</script>
<!-- End Notifications -->

<!-- Tracking -->
<script>(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!-- End Notifications -->

@yield('javascript')
@yield('javascript-videojs')

</body>
</html>
