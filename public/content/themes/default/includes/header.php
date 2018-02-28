<!DOCTYPE html>
<html lang="en" xml:lang="en" xmlns= "http://www.w3.org/1999/xhtml">
<head>
    <?php include('head.php'); ?>
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

    <!--nav class="navbar navbar-default navbar-static-top second-nav">
        <div class="container">
            <ul class="navbar-search">
                <li>
                    <div id="navbar-search-form">
                        <form role="search" action="/search" method="GET">
                            <i class="fa fa-search"></i>
                            <input type="text" id="value" name="value" placeholder="Search...">
                        </form>
                    </div>
                </li>
            </ul>
        </div>
    </nav-->

    <div id="page-content">
