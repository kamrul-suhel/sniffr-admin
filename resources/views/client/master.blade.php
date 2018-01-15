<!DOCTYPE html>
<html lang="en">
<head>
    <?php $settings = App\Setting::first(); ?>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Client Panel" />
    <meta name="author" content="" />

    <title>{{ $settings->website_name . ' - ' . $settings->website_description }}</title>

    <link rel="stylesheet" href="{{ '/assets/css/admin.css' }}">

    <?php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; ?>
    <link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . 'settings/' . $favicon ?>" type="image/x-icon">

    @yield('css')

    <script src="/assets/admin/js/app.js"></script>
</head>
<body class="page-body skin-black">

<a href="{{ url('/') }}" class="top-left-logo">
    <img src="/assets/img/unilad-logo-small.gif">
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

            @include('client.menu.main')
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
            <div class="col-sm-6 clearfix hidden-xs">
                <form id="campaigns-form" method="get" role="form">
                    <ul class="list-inline links-list pull-right">
                        @if(isset($campaigns))
                        <li>
                            <div class="form-group">
                                <select id="campaign" name="campaign_id" class="selectpicker form-control">
                                    <option value="">Select Campaign</option>
                                    @foreach($campaigns as $campaign)
                                        <option value="{{ $campaign->id }}"{{ session('campaign_id') == $campaign->id ? ' selected="selected"' : '' }}>{{ $campaign->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </li>
                        @endif
                        <li class="sep"></li>
                        <li><a href="{{ url('logout') }}">Log Out <i class="fa fa-sign-out right"></i></a></li>
                    </ul>
                </form>
            </div>
        </div>

        <hr />

        <div id="main-admin-content">
            @yield('content')
        </div>

        <!-- Footer -->
        <footer class="main">
            &copy; {{ date('Y') }} <strong>Unilad</strong> Video Licensing Platform
        </footer>
    </div>
</div>

<!-- Notifications -->
<script>
    (function($){
        $('#campaigns-form').change(function() {
            $(this).submit();
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
@yield('javascript-videojs')

</body>
</html>