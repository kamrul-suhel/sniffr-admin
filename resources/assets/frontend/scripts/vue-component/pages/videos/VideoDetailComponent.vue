<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section">
        <div id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <v-container grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <h1 class="heading">{{video_detail.video.title ? video_detail.video.title : ''}}</h1>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </div>
        </div>

        <!-- VIDEOS DETAIL SECTION -->
        <div class="videos-detail-section section-space">
            <v-container grid-list-lg pt-0>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn flat raised @click="onGoback()" class="ml-0">Go Back</v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex :class="{'vertical': video_detail.vertical, 'horizontal': !video_detail.vertical}" align-content-center v-html="video_detail.iframe" xs12 sm12 md7 lg7 xl7>
                    </v-flex>

                    <v-flex xs12 sm12 md5 lg5 xl5>
                        <v-layout row wrap class="video-detail-content">
                            <v-flex xs12>
                                <h2>{{ video_detail.video.title }}</h2>
                                <p>{{ video_detail.video.description }}</p>
                                <div class="video-detail-tags">
                                    <h3 id="tags">Tags:</h3>
                                    <ul>
                                        <li v-for="tag in tags">
                                            <router-link :to="'/videos/tag/'+tag.name">
                                                #{{ tag.name }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </v-flex>

                            <v-flex xs12>
                                <v-layout column wrap align-end class="video-detail-sidebar">
                                    <v-flex xs12 class="video-detail-viewer" text-xs-center text-md-center text-lg-right
                                            text-xl-right>
                                        <v-btn
                                                fab
                                                dark
                                                small
                                                color="pink favorite"
                                                data-authenticated=""
                                                :data-videoid="video_detail.video.id">
                                            <v-icon dark>remove_red_eye</v-icon>
                                        </v-btn>

                                        {{ video_detail.video.views+1}} views
                                    </v-flex>


                                    <div class="video-detail-social-share">
                                        <!--<div class="video-license">License</div>-->
                                        <div class="video-social-link">
                                            <!--<h3>Share</h3>-->
                                            <ul>
                                                <!-- Buttons start here -->
                                                <ul class="rrssb-buttons clearfix">
                                                    <li class="rrssb-facebook">
                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=<?= $media_url ?>"
                                                           class="popup">
                                                            <i class="fab fa-facebook-f fa-1x"></i>
                                                        </a>
                                                    </li>
                                                    <li class="rrssb-twitter">
                                                        <a href="http://twitter.com/home?status=<?= $media_subject ?> : <?= $media_url ?>"
                                                           class="popup">
                                                            <i class="fab fa-twitter fa-1x"></i>
                                                        </a>
                                                    </li>
                                                    <li class="rrssb-email">
                                                        <a href="mailto:?subject=<?= $media_subject ?>&amp;body=<?= $media_url ?>">
                                                            <i class="fas fa-at"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <!-- Buttons end here -->
                                            </ul>
                                        </div>
                                    </div>
                                </v-layout>
                            </v-flex>

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>

            <!--<v-content>-->
                <!--<v-container>-->
                    <!--<v-layout>-->
                        <!--<v-flex xs12 align-center justify-center>-->
                            <!--<v-icon class="loading">cached</v-icon>-->
                        <!--</v-flex>-->

                    <!--</v-layout>-->
                <!--</v-container>-->

            <!--</v-content>-->
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                video_detail: {
                    video: {
                        title: ''
                    }
                },
                tags: [],

                ready_to_show : true,

                previousPageUrl: ''
            }
        },

        watch: {
            '$route'(to, from, next) {
            }
        },

        created() {

        },

        mounted() {
            this.$vuetify.goTo('#scroll_to');
            window.addEventListener('fb-sdk-ready', this.onFBReady)
            let id = this.$route.params.id;
            this.$store.dispatch('getVideoDetailData', {alpha_id: id}).then(() => {
                this.video_detail = this.$store.getters.getVideoDetailData;
                console.log(this.video_detail);

                if (this.video_detail.video.tags.length > 0) {
                    this.tags.push(...this.video_detail.video.tags);
                }
                this.reloadInstagrm('//platform.instagram.com/en_US/embeds.js');

                if (this.video_detail.iframe.includes('vimeo')) {
                    this.reloadVideoJs();
                }

                this.reloadFacebook();
            });

        },

        methods: {
            onGoback() {
                this.$router.go(-1);
            },

            reloadInstagrm(src) {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = src;
                s.async = true;

                $('body').append(s);
                setTimeout(function () {
                    if (typeof window.instgrm !== 'undefined') {
                        window.instgrm.Embeds.process();
                    }
                }, 30);
            },

            reloadFacebook() {
                if (!document.getElementById('facebook-jssdk')) {
                    (function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=151068855526504";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));

                } else {
                    setTimeout(() => {
                        window.FB.XFBML.parse();
                    }, 30);

                }
            },

            reloadVideoJs() {

                let videojs1 = document.createElement('script');
                videojs1.type = "text/javascript";
                videojs1.src = "/assets/admin/js/video.js";

                let vimeo = document.createElement('script');
                vimeo.type = "text/javascript";
                vimeo.src = "/assets/admin/js/videojs-vimeo.js";
                $('body').append(videojs1);
                $('body').append(vimeo);

            }
        },

        destroyed() {
        }
    }
</script>