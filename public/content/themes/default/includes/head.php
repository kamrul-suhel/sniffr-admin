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
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/style.css'; ?>" />
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/spinkit.css'; ?>" />
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/rrssb.css'; ?>" />
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/animate.min.css'; ?>" />
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/jquery.fileupload.css'; ?>" />
<link rel="stylesheet" href="<?= THEME_URL . '/assets/css/jquery.fileupload-ui.css'; ?>" />
<style type="text/css"><?= \App\Libraries\ThemeHelper::getThemeSetting(@$theme_settings->custom_css, '') ?></style>
<link href='//fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
<?php $favicon = (isset($settings->favicon) && trim($settings->favicon) != "") ? $settings->favicon : 'favicon.png'; ?>
<link rel="shortcut icon" href="<?= Config::get('site.uploads_dir') . 'settings/' . $favicon ?>" type="image/x-icon">

<!-- load app.js in header else it won't work -->
<script type="text/javascript" src="/assets/js/app.js"></script>
<!-- end js load -->
