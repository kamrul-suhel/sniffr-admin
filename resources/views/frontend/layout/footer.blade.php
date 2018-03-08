<!-- FOOTER SECTION -->
<section class="footer_section section_space">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="footer_left">
                    <div class="footer_logo">
                        <img src="{{asset('assets/frontend/assets/images/logo-sniffr-white.png')}}"/>
                    </div>
                    <div class="foote_text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div class="footer_right">
                    <div class="social_section">
                        <ul>
                            <?php if($settings->facebook_page_id): ?>
                                <li>
                                    <a href="http://facebook.com/<?php echo $settings->facebook_page_id; ?>" target="_blank" class="facebook social-link">
                                        <i class="fab fa-facebook-f fa-2x"></i>
                                    </a>
                                </li>
                            <?php endif; ?>
                            <?php if($settings->twitter_page_id): ?>
                                <li>
                                    <a href="http://twitter.com/<?php echo $settings->twitter_page_id; ?>" target="_blank" class="twitter social-link">
                                        <i class="fab fa-twitter fa-2x"></i>
                                    </a>
                                </li>
                            <?php endif; ?>
                            <?php if($settings->google_page_id): ?>

                                <li>
                                    <a href="http://plus.google.com/<?php echo $settings->google_page_id; ?>" target="_blank" class="google social-link">
                                        <i class="fa fa-google-plus"></i>
                                    </a>
                                </li>
                            <?php endif; ?>
                            <?php if($settings->youtube_page_id): ?>
                                <li>
                                    <a href="http://youtube.com/<?php echo $settings->youtube_page_id; ?>" target="_blank" class="youtube social-link">
                                        <i class="fab fa-youtube fa-2x"></i>
                                    </a>
                                </li>
                            <?php endif; ?>
                            {{--<li><a href="#"><i class="fab fa-facebook-f fa-2x"></i></a></li>--}}
                            {{--<li><a href="#"><i class="fab fa-twitter fa-2x"></i></a></li>--}}
                            {{--<li><a href="#"><i class="fab fa-youtube fa-2x"></i></a></li>--}}
                            {{--<li><a href="#"><i class="fab fa-instagram fa-2x"></i></a></li>--}}
                            {{--<li><a href="#"><i class="fab fa-vimeo-v fa-2x"></i></a></li>--}}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>




@extends('frontend.layout.login_form')


<script src="{{asset('assets/frontend/assets/scripts/scripts.js')}}"></script>