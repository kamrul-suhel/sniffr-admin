<!-- FOOTER SECTION -->
<section class="footer_section section_space" >
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12 sm12 md8 lg8>
                <div class="footer_left">
                    <div class="footer_logo">
                        <img src="{{asset('assets/frontend/images/logo-sniffr-white.png')}}"/>
                    </div>
                    <div class="foote_text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                    </div>
                </div>
            </v-flex>

            <v-flex xs12 sm12 md4 lg4>
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
                        </ul>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</section>
@extends('frontend.layout.login_form')

<script src="{{asset('assets/frontend/scripts/jquery.js')}}"></script>
{{--<script src="{{asset('assets/frontend/scripts/plugin.js')}}"></script>--}}


<script src="{{asset('assets/frontend/scripts/scripts.js')}}"></script>