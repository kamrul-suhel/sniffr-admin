<template>
    <div class="video-player">
        <div v-if="showVideo">
            <!-- S3 lin -->
            <div class="s3-video" v-if="s3_video">
                <div id="cdn_video" v-html="video.iframe"></div>
            </div>

            <div class="youtube-video" v-else-if="youtubeVideo">
                <plyr-youtube :id="this.youtubeID" :pe="false" :options="youtubeVideoPlayerOption"/>
            </div>

            <div class="social-video" v-else-if="socialVideo">
                <div v-html="video.iframe"></div>
            </div>

            <div class="video" v-else-if="video.url === null && video.file_watermark_dirty !== null">
                <div id="cdn_video" v-html="video.iframe"></div>
            </div>
        </div>

        <div xs12 v-else
             :class="{'vertical': video.vertical? video.vertical : '', 'horizontal': !video.vertical}"
             align-content-center
             xs12 sm12 md7 lg7 xl7>

            <v-card flat class="video-player-poster">
                <v-card-media :src="video.image.includes('instagram')? defaultImage : video.image "></v-card-media>
                <v-btn @click="change()" class="dark player-play" dark fab medium>
                    <v-icon large>play_arrow</v-icon>
                </v-btn>
            </v-card>
        </div>
    </div>

</template>

<script>
    import {PlyrYoutube} from './player/youtubeVideoPlayer'
    import {Plyr} from './player/videoPlayer'
    import '../../../../scss/plugins/video-plyr.css';
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';

    export default {
        components: {
            PlyrYoutube,
            Plyr
        },

        data() {
            return {
                defaultImage: '/assets/frontend/images/placeholder.png',

                showVideo: false,

                s3_video:false,

                youtubeID: '',
                youtubeVideo: false,

                vimeoVideo: false,
                vimeoId: '',

                socialVideo: false,


                youtubeVideoPlayerOption: {
                    autoplay: true,
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'airplay', 'fullscreen'],
                    loop: {active: true}
                }
            }
        },

        props: ['video'],

        watch: {
            video(val){
                this.showVideo = false;
            }
        },

        created() {
            VideoDialogBoxEventBus.$on('onDialogClickPrev', () => {
                this.showVideo = false;
            });

            VideoDialogBoxEventBus.$on('onDialogClickNext', () => {
                this.showVideo = false;
            })
        },

        methods: {
            change() {
                this.showVideo = true;
                this.resetShowVideo();

                if(this.video.file_watermark_dirty !== null){
                    this.s3_video = true;

                    return;
                }

                if (this.video.youtube_id != null) {
                    this.youtubeVideo = true;
                    setTimeout(()=>{
                        $('.plyr__control.plyr__control--overlaid').click()
                    }, 1500);
                }


                if(new RegExp('instagram', 'i').test(this.video.url)){

                    let promise = new Promise((resolve, reject)=>{
                        this.socialVideo = true;
                        resolve();
                    });
                    promise.then(() => {
                        this.reloadInstagrm()
                    });
                }

                if(new RegExp('twitter','i').test(this.video.url)){
                    var promise  = new Promise((resolve, reject)=>{
                        this.socialVideo = true;
                        resolve();
                    });

                    promise.then(()=>{
                        this.reloadTwitter()
                    })
                }

                if(new RegExp('facebook', 'i').test(this.video.url)){
                    this.socialVideo = true;
                    var promise = new Promise((resolve, reject)=>{
                        this.socialVideo = true;
                        resolve();
                    })

                    promise.then(()=>{
                        this.reloadFacebook();
                    });
                }
            },

            includes(value, url) {
                const regex = value
                const str = url;
                let m;

                while ((m = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                }
            },

            resetShowVideo() {
                this.s3_video = false;
                this.youtubeVideo = false;
                this.vimeoVideo = false;
                this.socialVideo = false;
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
                    }, 100);

                }
            },

            reloadTwitter() {
                TwitterWidgetsLoader.load(function (twttr) {
                    var tweets = jQuery(".tweet");

                    $(tweets).each(function (t, tweet) {
                        var id = jQuery(this).attr('id');
                        twttr.widgets.createVideo(id, tweet).then(function (el) {
                            widget_type = el
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

            reloadInstagrm() {
                var src = '//platform.instagram.com/en_US/embeds.js';
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = src;
                s.async = true;

                setTimeout(function () {
                    if (typeof window.instgrm !== 'undefined') {
                        $('body').append(s);
                        window.instgrm.Embeds.process();
                    } else {
                        $('body').append(s);
                    }
                }, 500);
            }
        }
    }
</script>