<template>
    <div class="video-dialog-content">
        <v-layout row wrap v-if="video_detail">
            <v-flex
                    :class="{'vertical': video_detail.vertical? video_detail.vertical : '', 'horizontal': !video_detail.vertical}"
                    align-content-center
                    xs12 sm12 md7 lg7 xl7>

                <v-card flat v-if="!switch_video">
                    <v-card-media :src="video_detail.image" height="400px"></v-card-media>
                </v-card>

                <v-flex xs-12 v-else>
                    <div v-html="video_detail.iframe"></div>
                </v-flex>

                <!-- v-html="video_detail.iframe" -->
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5 :class="{'pl-4' : content_padding, 'pt-4': !content_padding}">
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <h2>{{ video_detail.title }}</h2>
                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6>
                                        <v-icon small>alarm</v-icon> {{video_detail.duration | convertTime}}
                                    </v-flex>
                                    <v-spacer></v-spacer>

                                    <v-flex xs6 class="text-xs-right" v-if="video_detail.views">
                                        <v-icon small >remove_red_eye</v-icon> {{ video_detail.views + 1}} views
                                    </v-flex>
                                </v-layout>
                            </div>
                        </div>

                        <div v-if="video_detail.description != 'null'" class="content-description">
                            <p>{{ video_detail.description | readmore(300, '...')}}</p>
                        </div>

                        <div class="read-more text-xs-right">
                            <a @click.stop="goToDetail()">
                                <v-icon small>keyboard_arrow_right</v-icon>
                                Read more</a>
                        </div>

                        <div class="video-detail-tags" v-if="tags.length > 0">
                            <h3 id="tags">Tags:</h3>
                            <ul>
                                <li v-for="tag in video_detail.tags">
                                    <a @click.stop="goToTagSearch(tag)">
                                        #{{ tag.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </v-flex>

                    <v-flex xs12>
                        <v-layout column wrap align-end class="video-detail-sidebar">
                            <!--<div class="video-detail-social-share">-->
                            <!--<v-btn dark block class="dark">License</v-btn>-->
                            <!--</div>-->

                            <v-btn @click="switch_video = !switch_video">Click to view</v-btn>
                        </v-layout>
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';
    import LoginEventBus from '../../../event-bus/login-event-bus';

    export default {
        data() {
            return {
                video_detail: '',
                tags: [],

                ready_to_show: true,

                content_padding: true,

                switch_video: false
            }
        },

        watch: {
            '$route'(to, from, next) {
            }
        },

        created() {
            let breakpoint = this.$vuetify.breakpoint.name;
            if (breakpoint === 'sm' || breakpoint === 'xs') {
                this.content_padding = false;
            }

            VideoDialogBoxEventBus.$on('videoDialogStateChange', (alpha_id) => {
                this.getVideoData(alpha_id);
            })

            VideoDialogBoxEventBus.$on('onDialogClickNext', () => {
                let alpha_id = this.$store.getters.getNextVideoAlphaId;
                this.getVideoData(alpha_id);
            });

            VideoDialogBoxEventBus.$on('onDialogClickPrev', () => {
                let alpha_id = this.$store.getters.getPrevVideoAlphaId;
                this.getVideoData(alpha_id)
            });

            LoginEventBus.$on('onResetCurrentVideoIndialog', () => {
                this.video_detail = '';
                console.log('methods called');
            })
        },

        mounted() {
        },

        methods: {
            getVideoData(alpha_id) {

                this.$store.commit('setRouteObject', this.$route);

                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: alpha_id}).then(() => {
                    this.video_detail = this.$store.getters.getCurrentVideoForDialog;
                    if (this.video_detail.tags.length > 0) {
                        this.tags.push(...this.video_detail.tags);
                    } else {
                        this.tags = [];
                    }

                    VideoDialogBoxEventBus.$emit('setNextPrevButton');

                    this.reloadInstagrm('//platform.instagram.com/en_US/embeds.js');

                    if (this.video_detail.iframe.includes('vimeo')) {
                        this.reloadVideoJs();
                    }

                    this.reloadFacebook();
                    this.realoadTwitter();

                });
            },

            goToTagSearch(tag) {
                VideoDialogBoxEventBus.closeDialogByTagSearch(tag);
            },

            goToDetail() {
                VideoDialogBoxEventBus.closeVideoDialog(this.video_detail);
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

            realoadTwitter() {
                TwitterWidgetsLoader.load(function (twttr) {
                    var tweets = jQuery(".tweet");

                    $(tweets).each(function (t, tweet) {
                        var id = jQuery(this).attr('id');
                        twttr.widgets.createVideo(id, tweet).then(function (el) {
                            widget_type = video
                        });
                    });
                });
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