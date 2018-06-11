<!DOCTYPE html>
<html lang="en">
<head>
	<?php $settings = config('settings.site'); ?>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="HelloVideo Admin Panel" />
	<meta name="author" content="" />

	<title>{{ $settings['website_name'] . ' - ' . $settings['website_description'] }}</title>

	<link rel="stylesheet" href="{{ mix('/assets/css/admin.css') }}">

	<?php $favicon = (isset($settings['favicon']) && trim($settings['favicon']) != "") ? $settings['favicon'] : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . $favicon ?>" type="image/x-icon">

	@yield('css')

	<!--[if lt IE 9]><script src="{{ '/application/assets/admin/js/ie8-responsive-file-warning.js' }}"></script><![endif]-->

	<!-- HTML5 shim and Respond.js') }} IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js') }}"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js') }}/1.4.2/respond.min.js') }}"></script>
	<![endif]-->

	<!-- Mailer stories & video style -->
	<link rel="stylesheet" href="{{ asset('assets/admin/css/styles.css') }}"/>

</head>
<body class="page-body skin-black">

<a href="{{ url('/') }}" class="top-left-logo">
	<img src="/assets/admin/images/logo-sniffr-white.png">
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
						<img src="{{ Config::get('site.uploads_dir') . Auth::user()->avatar }}" alt="" class="img-circle" width="26" />
						<span>Howdy, {{ ucfirst(Auth::user()->username) }}</span>
					</li>
				</ul>
			</div>

			<!-- Raw Links -->
			<div class="col-md-6 col-sm-4 clearfix hidden-xs">
				<ul class="list-inline links-list pull-right">
					<li class="sep"></li>
					<li><a href="{{ url('logout') }}">Log Out <i class="fa fa-sign-out right"></i></a></li>
				</ul>
			</div>
		</div>

		<hr />

		<div id="main-admin-content">
			@yield('content')
		</div>

		<!-- Footer -->
		<footer class="main">
			&copy; {{ date('Y') }} <strong>{{ $settings['website_name'] }}</strong> Video Licensing Platform
		</footer>
	</div>
</div>

<script src="{{ mix('/assets/admin/js/app.js') }}"></script>
<script src="/assets/admin/js/video.js"></script>
<script src="/assets/admin/js/videojs-vimeo.js"></script>

<!-- Notifications -->
<script>
	(function($){
		// Delete handler
	    $('.delete').click(function (e) {
	        e.preventDefault();
	        if (confirm("Are you sure you want to delete this?")) {
	            console.log($(this).data('form'));
	            //window.location = $(this).attr('href');
	            $('#form-delete-' + $(this).data('form')).submit();
	        }
	        return false;
	    });

		var opts = {
			"closeButton": true,
			"debug": false,
			"positionClass": "toast-top-right",
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
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

	})(jQuery);

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

</body>
</html>
