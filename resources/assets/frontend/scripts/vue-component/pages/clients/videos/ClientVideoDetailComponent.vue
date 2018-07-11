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
                                            <div v-if="video_detail.video.duration !== 'undefined'"><v-icon small>alarm</v-icon> {{video_detail.video.duration | convertTime}}</div>
                                        </v-flex>
                                        <v-spacer></v-spacer>

                                        <v-flex xs6 class="text-xs-right">
                                            <div v-if="video_detail.video.views != ''"><v-icon small >remove_red_eye</v-icon> {{ video_detail.video.views+1}} views</div>
                                        </v-flex>
                                    </v-layout>
                                </div>

                                <p v-if="video_detail.video.description != 'null'">{{ video_detail.video.description }}</p>

                                <quote-button-component :type="'video'" :asset="video_detail"></quote-button-component>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>

<script>
    import VideoPlayer from '../../videos/VideoPlayerComponent';
    import QuoteButtonComponent from "../../../includes/BuyQuoteButtonComponent";

    export default {
        components: {
            VideoPlayer,
            QuoteButtonComponent
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
            });

        },

        methods: {
            onGoback() {
                let prevRoute = this.$store.getters.getRouteUrl;
                if(prevRoute != ''){
                    this.$router.push({name : this.$store.getters.getRouteUrl});
                }else{
                    this.$router.go(-1);
                }
            },
        },
    }
</script>
