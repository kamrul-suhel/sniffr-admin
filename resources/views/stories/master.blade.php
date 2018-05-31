<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Client Panel" />
    <meta name="author" content="" />

    <title>{{ $settings['website_name'] . ' - ' . $settings['website_description'] }}</title>

    <link rel="stylesheet" href="{{ mix('/assets/css/admin.css') }}">

    @yield('css')
</head>
<body class="page-body skin-black">

<div class="page-container sidebar-collapsed">

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

</body>
</html>
