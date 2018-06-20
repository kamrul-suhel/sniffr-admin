<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section client-video-detail" v-if="ini">
        <!-- VIDEOS DETAIL SECTION -->
        <div class="videos-detail-section section-space">
            <v-container grid-list-xl pt-0>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md7 lg7 x7 pt-0>
                        <v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>
                    </v-flex>
                    <!--<v-flex xs12 sm12 md5 lg5 xl5 pt-0 class="text-right">-->
                        <!--<div :class="{'pl-4' : content_padding}">-->
                            <!--<v-btn dark block @click="onGoback()" class="ml-0 dark" large>Download Video</v-btn>-->
                        <!--</div>-->
                    <!--</v-flex>-->
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12 sm12 md7 lg7 xl7>
                        <video-player :video="video_detail.video"></video-player>
                    </v-flex>

                    <v-flex xs12 sm12 md5 lg5 xl5>
                        <v-layout row wrap class="video-detail-content" :class="{'pl-4' : content_padding}">
                            <v-flex xs12>
                                <h2>{{ video_detail.video.title }}</h2>

                                <div class="video-title-caption">
                                    <v-layout row wrap justify-center>
                                        <v-flex xs6>
                                            <v-icon small>alarm</v-icon> {{video_detail.video.duration | convertTime}}
                                        </v-flex>
                                        <v-spacer></v-spacer>

                                        <v-flex xs6 class="text-xs-right">
                                            <v-icon small >remove_red_eye</v-icon> {{ video_detail.video.views+1}} views
                                        </v-flex>
                                    </v-layout>
                                </div>

                                <p v-if="video_detail.video.description != 'null'">{{ video_detail.video.description }}</p>


                                <v-btn
                                        dark
                                        block
                                        large
                                        class="dark"
                                        :loading="loading"
                                        :disabled="loading"
                                        @click="onDownloadVideo()"
                                >{{ button_text }}</v-btn>

                            </v-flex>

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>

<script>
    import VideoPlayer from '../../videos/VideoPlayerComponent'

    export default {
        components: {
            VideoPlayer
        },

        data() {
            return {
                ini:false,
                video_detail: {},
                tags: [],
                loading: false,
                loader: null,
                ready_to_show : true,
                button_text: 'Download Video',
                previousPageUrl: '',

                content_padding:true
            }
        },

        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => {
                    this[l] = false;
                    this.newOrder = true;
                }, 3000)

                this.loader = null
            }
        },

        created() {
            let breakpoint = this.$vuetify.breakpoint.name;
            if(breakpoint === 'sm' || breakpoint === 'xs' ){
                this.content_padding = false;
            }

            // IAN:  Need to check if value exists in multiu dim array
            // if (this.video_detail.video.order && this.video_detail.video.order.id) {
            //     this.button_text = 'Re-download video';
            // }

        },

        mounted() {
            this.$vuetify.goTo('#scroll_to');
            window.addEventListener('fb-sdk-ready', this.onFBReady)
            let id = this.$route.params.alpha_id;

            this.$store.dispatch('getVideoDetailData', {alpha_id: id}).then(() => {
                this.video_detail = this.$store.getters.getVideoDetailData;
                this.video_detail.video.iframe = this.video_detail.iframe;
                this.ini = true;

                if (this.video_detail.video.tags.length > 0) {
                    this.tags.push(...this.video_detail.video.tags);
                }
                this.reloadInstagrm('//platform.instagram.com/en_US/embeds.js');

                if (this.video_detail.iframe.includes('vimeo')) {
                    this.reloadVideoJs();
                }

                this.reloadFacebook();

                this.realoadTwitter();
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

            realoadTwitter(){
                TwitterWidgetsLoader.load(function(twttr) {
                    var tweets = jQuery(".tweet");

                    $(tweets).each( function( t, tweet ) {
                        var id = jQuery(this).attr('id');
                        twttr.widgets.createVideo(id,tweet).then( function( el ) {
                            widget_type=video
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

            },

            onDownloadVideo() {
                this.loader = 'loading';
                var url = '/client/videos/'+this.video_detail.video.id+'/download';

                window.location = url;
            }
        },

        destroyed() {
        }
    }
</script>
