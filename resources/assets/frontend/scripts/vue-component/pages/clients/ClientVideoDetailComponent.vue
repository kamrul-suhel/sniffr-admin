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
        <div class="videos-detail-section client-video-download-section section-space">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>

<script>
    import AssetComponent from './partials/AssetComponent';
    export default {
        beforeRouteEnter: (to, from, next) => {
        },

        components: {
          assetComponent: AssetComponent
        },

        data() {
            return {
                video_detail: {
                    video: {
                        title: ''
                    }
                },
                tags: [],

                ready_to_show : true,

                previousPageUrl: '',

                content_padding:true
            }
        },

        watch: {
            '$route'(to, from, next) {
                console.log("where is now " + to + ": Where is coming from " + from );
            }
        },

        created() {
            let breakpoint = this.$vuetify.breakpoint.name;
            if(breakpoint === 'sm' || breakpoint === 'xs' ){
                this.content_padding = false;
            }

        },

        mounted() {
            this.$vuetify.goTo('#scroll_to');
            window.addEventListener('fb-sdk-ready', this.onFBReady)
            let id = this.$route.params.alpha_id;
            this.$store.dispatch('getVideoDetailData', {alpha_id: id}).then(() => {
                this.video_detail = this.$store.getters.getVideoDetailData;

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
            downloadAssets(){
              console.log('download assets');
            },

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

            }
        },

        destroyed() {
        }
    }
</script>