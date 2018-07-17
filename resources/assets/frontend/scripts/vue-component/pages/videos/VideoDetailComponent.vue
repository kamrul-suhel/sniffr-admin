<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section" v-if="ini">
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
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex
                            align-content-center
                            xs12 sm12 md7 lg7 xl7>
                        <video-player :video="video_detail.video"></video-player>
                    </v-flex>

                    <v-flex xs12 sm12 md5 lg5 xl5>
                        <v-layout row wrap class="video-detail-content" :class="{'pl-4' : content_padding}">
                            <v-flex xs12>
                                <h2>{{ video_detail.video.title }}</h2>

                                <div class="video-title-caption">
                                    <v-layout row wrap justify-center>
                                        <v-flex xs6 v-if="this.video_detail.video.duration != null">
                                            <v-icon small>alarm</v-icon>{{video_detail.video.duration | convertTime}}
                                        </v-flex>
                                        <v-spacer></v-spacer>

                                        <v-flex xs6 class="text-xs-right" v-if="video_detail.video.views">
                                            <v-icon small >remove_red_eye</v-icon> {{ video_detail.video.views+1}} views
                                        </v-flex>
                                    </v-layout>
                                </div>

                                <p v-if="video_detail.video.description != 'null'">{{ video_detail.video.description }}</p>
                                <div class="video-detail-tags" v-if="tags.length > 0">
                                    <h3 id="tags">Tags:</h3>
                                    <ul>
                                        <li v-for="tag in tags">
                                            <router-link :to="'/videos?tag='+tag.name">
                                                #{{ tag.name }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>

                                <buy-quote-button-component
                                        :type="'video'"
                                        :asset="video_detail.video"
                                ></buy-quote-button-component>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>

<script>
    import VideoPlayer from './VideoPlayerComponent'
    import BuyQuoteButtonComponent from "../../includes/BuyQuoteButtonComponent";

    export default {
        components: {
            BuyQuoteButtonComponent,
            videoPlayer: VideoPlayer,
        },

        data() {
            return {
                ini:false,
                user: {},
                video_detail: {},
                tags: [],
                ready_to_show : true,
                previousPageUrl: '',
                content_padding:true,
                client_logged_in:'',
                canBuy:false
            }
        },

        watch: {
        },

        created() {
            this.user = this.$store.getters.getUser;
            let breakpoint = this.$vuetify.breakpoint.name;
            if(breakpoint === 'sm' || breakpoint === 'xs' ){
                this.content_padding = false;
            }

            let alpha_id = this.$route.params.alpha_id;
            this.$store.dispatch('getVideoDetailData', {alpha_id: alpha_id}).then(() => {
                this.video_detail = this.$store.getters.getVideoDetailData;
                this.video_detail.video.iframe = this.video_detail.iframe;


                this.ini = true;
                if (this.video_detail.video.tags.length > 0) {
                    this.tags.push(...this.video_detail.video.tags);
                }
            })

        },

        methods: {
            onGoback() {
                this.$router.go(-1);
            }
        },


    }
</script>