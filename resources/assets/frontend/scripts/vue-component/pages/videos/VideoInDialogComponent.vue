<template>
    <div class="video-dialog-content">
        <v-layout row wrap v-if="video_detail">

            <v-flex xs12 sm12 md7 lg7 xl7>
                <video-player :video="video_detail"></video-player>
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5 :class="{'pl-4' : content_padding, 'pt-4': !content_padding}">
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <h2>{{ video_detail.title }}</h2>
                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6 v-if="this.video_detail.duration != null">
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
                            <div class="video-detail-social-share">
                                <v-btn href="/" dark block class="dark">Add to basket</v-btn>
                            </div>
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
    import VideoPlayer from './VideoPlayerComponent';

    export default {
        components:{
            videoPlayer: VideoPlayer
        },
        data() {
            return {
                video_detail: '',
                tags: [],

                ready_to_show: true,

                content_padding: true,
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
                this.getVideoData(alpha_id);
            });

            LoginEventBus.$on('onResetCurrentVideoIndialog', () => {
                this.video_detail = '';
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

                });
            },

            goToTagSearch(tag) {
                VideoDialogBoxEventBus.closeDialogByTagSearch(tag);
            },

            goToDetail() {
                VideoDialogBoxEventBus.closeVideoDialog(this.video_detail);
            }
        },

        destroyed() {
        }
    }
</script>