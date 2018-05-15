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


<!-- Hotjar Tracking Code for https://sniffrmedia.co.uk/ -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:874669,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>