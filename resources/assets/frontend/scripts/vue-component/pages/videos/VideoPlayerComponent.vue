<template>
    <v-flex
            :class="{'vertical': video.vertical? video.vertical : '', 'horizontal': !video.vertical}"
            align-content-center
            xs12 sm12 md7 lg7 xl7>

        <v-card flat v-if="!switch_video">
            <v-card-media :src="video.image" height="400px"></v-card-media>
        </v-card>

        <v-flex xs-12 v-else>
            <div v-html="video.iframe"></div>
        </v-flex>
    </v-flex>
</template>

<script>
    export default {
        data() {
            return {
                switch_video: false
            }
        },

        props: ['video'],

        created() {

            this.reloadInstagrm('//platform.instagram.com/en_US/embeds.js');

            if (this.video.iframe.includes('vimeo')) {
                this.reloadVideoJs();
            }

            this.reloadFacebook();
            this.realoadTwitter();

        },

        methods: {
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
        }
    }
</script>