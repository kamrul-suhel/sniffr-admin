<template>
    <div class="client-video-download-section">
        <v-container grid-list-xl class="client-story-detail-section" pt-0>
            <v-layout row wrap v-if="story">
                <v-flex xs12 pt-0>
                    <!--<v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>-->
                    <v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>
                </v-flex>

                <v-flex xs12 sm12 md5 lg4 xl4 class="client-assets">
                    <h2>Assets</h2>

                    <v-divider style="margin-bottom:20px;"></v-divider>

                    <v-layout row wrap>
                        <asset-component v-for="asset in story.assets" :key="asset.id" :asset="asset" :story_id="story.id"></asset-component>
                    </v-layout>

                    <v-btn
                            block
                            dark
                            :loading="loading"
                            :disabled="loading"
                            large
                            @click.native="onDownloadAllAssets()"
                            color="dark">Download assets

                    </v-btn>
                </v-flex>

                <v-flex xs12 sm12 md7 lg8 xl8>
                    <div class="story-content">
                        <h2 v-html="story.title"></h2>

                        <div class="caption">
                            <span>Author: {{ story.author }} | </span>
                            <span>Created at: {{ dateFormater(story.date_ingested) }}</span><br/>
                            <!--<span>State: <strong>{{ story.state }}</strong> |</span>-->
                            <!--<span>Status : {{ story.status }}</span>-->
                        </div>

                        <v-divider style="margin: 15px 0"></v-divider>

                        <div v-html="story.description"></div>
                    </div>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AssetComponent from './partials/AssetComponent';
    export default {
        components: {
            assetComponent: AssetComponent
        },

        data() {
            return {
                story: '',
                loading: false,
                loader: null,
            }
        },

        created() {
            this.getStoryDetail();

            this.reloadInstagrm('//platform.instagram.com/en_US/embeds.js');

            this.reloadVideoJs();


            this.reloadFacebook();

            this.realoadTwitter();
        },

        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
        },

        methods: {
            onGoback() {
                this.$router.push({name: 'client_mail'});
            },

            getStoryDetail(){
                let alpha_id = this.$route.params.alpha_id;

                this.$store.dispatch('getCurrentStory', alpha_id)
                    .then(() => {
                        this.story = this.$store.getters.getCurrentStory;
                    });
            },

            onDownloadAllAssets(){
                this.loader = 'loading';
                var url = '/client/stories/'+this.story.id+'/download';
                window.location = url;
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

            dateFormater(date){
                var current_date = new Date(Date.parse(date.replace('-','/','g')));
                return current_date.toDateString();
            }
        }
    }
</script>