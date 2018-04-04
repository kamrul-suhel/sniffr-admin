<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section">
        <div id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">{{video_detail.video.title ? video_detail.video.title : ''}}</h1>
                </div>
            </div>
        </div>

        <!-- VIDEOS DETAIL SECTION -->
        <div class="videos-detail-section section-space">
            <v-container grid-list-lg pt-0>

                <v-layout row wrap>
                    <v-flex align-content-center v-html="video_detail.iframe">
                        <!-- <div v-html="video_detail.iframe"></div>     -->
                    </v-flex>
                </v-layout>

                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12 sm12 md8 lg8>
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

                    <v-flex xs12 sm12 md4 lg4>
                        <v-layout  column wrap align-end class="video-detail-sidebar">
                            <v-flex xs12 class="video-detail-viewer" text-xs-center text-md-center text-lg-right text-xl-right>
                                <v-btn
                                    fab
                                    dark
                                    small
                                    color="pink favorite"
                                    data-authenticated=""
                                    :data-videoid="video_detail.video.id">
                                    <v-icon dark>favorite</v-icon>
                                </v-btn>

                                {{ video_detail.video.views}} views
                            </v-flex>


                            <div class="video-detail-social-share">
                                <div class="video-license">License</div>
                                <div class="video-social-link">
                                    <h3>Share</h3>
                                    <ul>
                                        <!-- Buttons start here -->
                                        <ul class="rrssb-buttons clearfix">
                                            <li class="rrssb-facebook">
                                                <a href="https://www.facebook.com/sharer/sharer.php?u=<?= $media_url ?>" class="popup">
                                                    <i class="fab fa-facebook-f fa-1x"></i>
                                                </a>
                                            </li>
                                            <li class="rrssb-twitter">
                                                <a href="http://twitter.com/home?status=<?= $media_subject ?> : <?= $media_url ?>" class="popup">
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
            </v-container>
        </div>

    </section>
</template>
<script>
    export default {
        data(){
            return {
                video_detail: {
                    video: {
                        title: ''
                    }
                },
                tags: []
            }
        },
        watch:{
            '$route'() {

            }
        },
        created(){
            let id = this.$route.params.id;
            this.$store.dispatch('getVideoDetailData', {alpha_id: id}).then(() => {
                this.video_detail = this.$store.getters.getVideoDetailData;
                if(this.video_detail.video.tags.length > 0){
                    this.tags.push(...this.video_detail.video.tags);
                }
                console.log(this.video_detail);
                // Load script
                let recaptchaScript = document.createElement('script');
                recaptchaScript.setAttribute('src', 'https://www.instagram.com/static/bundles/base/EmbedSDK.js/e46f41123c91.js');
                document.head.appendChild(recaptchaScript)

            });

        },
        methods: {

        }
    }
</script>