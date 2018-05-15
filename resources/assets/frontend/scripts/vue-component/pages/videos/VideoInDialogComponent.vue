<template>
    <div class="video-in-dialog">
        <v-container grid-list-xs pt-0>
            <v-layout row wrap>
                <v-flex :class="{'vertical': video_detail.video.vertical? video_detail.video.vertical : '', 'horizontal': !video_detail.video.vertical}" align-content-center v-html="video_detail.video.iframe" xs12 sm12 md7 lg7 xl7>
                </v-flex>

                <v-flex xs12 sm12 md5 lg5 xl5>
                    <v-layout row wrap class="video-detail-content">
                        <v-flex xs12>
                            <h2>{{ video_detail.video.title }}</h2>
                            <p>{{ video_detail.video.description }}</p>
                            <div class="video-detail-tags">
                                <h3 id="tags">Tags:</h3>
                                <ul>
                                    <li v-for="tag in video_detail.video.tags">
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
                            </v-layout>
                        </v-flex>

                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';
    export default {
        data() {
            return {
                video_detail:'',
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
            VideoDialogBoxEventBus.$on('videoDialogStateChange', () => {
                this.video_detail = this.$store.getters.getCurrentVideoForDialog;
                console.log("Created methods call");
                console.log(this.video_detail);
            })
        },

        mounted() {
            this.$vuetify.goTo('#scroll_to');
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