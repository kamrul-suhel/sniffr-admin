<title>{{config('settings.public.website_name')}}</title>
<meta name="description" content="{{config('settings.public.website_description')}}">


<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<meta name="HandheldFriendly" content="true">

<meta name="csrf-token" content="{{ csrf_token() }}">

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
<!-- end js load -->