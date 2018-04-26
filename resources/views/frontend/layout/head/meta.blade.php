@if(isset($video->id))
    <title>{{ $video->title }}</title>
    <meta name="description" content="{{ $video->description }}">
    <meta http-equiv="Content-Language" content="en">
    @php
        $keywords = '';
        foreach($video->tags as $tag):
            $keywords .= $tag->name . ', ';
        endforeach;
        $keywords = rtrim($keywords, ', ');
    @endphp

    <!-- for Google -->
    <meta name="keywords" content="{{ $keywords }}"/>

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="{{$video->title}}">
    <meta itemprop="description" content="{{$video->description}}">
    <meta itemprop="image"
          content="@if($settings['enable_https']) secure_url('/') @else {{URL::to('/')}}\App\Libraries\ImageHandler::getImage($video->image, 'large')@endif">

    <!-- for Facebook -->
    <meta property="og:title" content="{{$video->title}}"/>
    <meta property="og:type" content="video.other"/>
    <meta property="og:image"
          content="{{($settings['enable_https']) ? secure_url('/') : URL::to('/')}} {{\App\Libraries\ImageHandler::getImage($video->image, 'large')}}"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:description" content="{{$video->description}}"/>

    <!-- for Twitter -->
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="{{$video->title}}"/>
    <meta name="twitter:description" content="{{$video->description}}"/>
    <meta name="twitter:image"
          content="<?= ($settings['enable_https']) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($video->image, 'large')  ?>"/>

@elseif(isset($post->id))
    @php $post_description = preg_replace('/^\s+|\n|\r|\s+$/m', '', strip_tags($post->body)); @endphp
    <title>{{$post->title}}</title>
    <meta name="description" content="{{$post_description}}">

    <!-- Schema.org markup for Google+ -->
    <meta itemprop="name" content="{{$post->title}}">
    <meta itemprop="description" content="{{$post_description}}">
    <meta itemprop="image"
          content="{{($settings['enable_https']) ? secure_url('/') : URL::to('/')}}{{\App\Libraries\ImageHandler::getImage($post->image, 'large')}}">

    <!-- for Facebook -->
    <meta property="og:title" content="{{$post->title}}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:image"
          content="<?= ($settings['enable_https']) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($post->image, 'large')  ?>"/>
    <meta property="og:url" content="<?= Request::url(); ?>"/>
    <meta property="og:description" content="<?= $post_description ?>"/>

    <!-- for Twitter -->
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="<?= $post->title ?>"/>
    <meta name="twitter:description" content="<?= $post_description ?>"/>
    <meta name="twitter:image"
          content="<?= ($settings['enable_https']) ? secure_url('/') : URL::to('/') ?><?= \App\Libraries\ImageHandler::getImage($post->image, 'large')  ?>"/>

@elseif(isset($page->id))
    <title><?= $page->title . '-' . $settings['website_name']; ?></title>
    <meta name="description" content="<?= $page->title . '-' . $settings['website_name']; ?>">

@else
    <title>{{$settings['website_name']}} - {{$settings['website_description']}}</title>
    <meta name="description" content="{{$settings['website_description']}}">
@endif

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<meta name="HandheldFriendly" content="true">

<meta name="csrf-token" content="{{ csrf_token() }}">

<!-- Uncomment this code after done work -->

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