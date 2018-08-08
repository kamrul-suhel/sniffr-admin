<template>
    <div class="video-dialog-content">
        <v-layout row wrap>
            <v-flex xs12 sm12 md7 lg7 xl7>
                <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md6 lg6 xl6 v-for="asset in assets" :key="asset.id">
                            <v-card :hover="onIsMovie(asset)">
                                <v-card-media :src="getThumbImage(asset)" height="200px"
                                              @click="onOpenVideoPlayerDialog(asset)">
                                    <div class="video-icon" v-if="asset.mime_type === 'video/mp4'">
                                        <v-icon color="light" dark>videocam</v-icon>
                                    </div>
                                </v-card-media>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5>
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <v-badge left color="dark story-in-dialog-badge" dark v-if="story_detail.flagged == 1">
                                <v-icon color="red" slot="badge" dark small>whatshot</v-icon>
                                <h2 v-html="story_detail.title"></h2>
                            </v-badge>

                            <h2 v-html="story_detail.title" v-else></h2>

                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6>
                                        <v-icon small>alarm</v-icon>
                                        {{ story_detail.date_ingested }}
                                    </v-flex>
                                    <v-spacer></v-spacer>

                                    <v-flex xs6 class="text-xs-right">
                                        <v-icon small>edit</v-icon>
                                        {{ story_detail.author }}
                                    </v-flex>
                                </v-layout>
                            </div>
                        </div>

                        <div class="content-description">
                            <div v-html="story_detail.description"></div>
                        </div>

                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import StoryDialogBoxEventBus from '../event-bus/story-dialog-box-event-bus';
    import VideoPlayer from '../../../scripts/components/VideoPlayerComponent';
    import VideoPlayerDialogBoxEventBus from '../event-bus/video-player-dialog-box-event-bus';

    export default {
        components: {
            videoPlayer: VideoPlayer
        },
        data() {
            return {
                story_detail: '',
                defaultImage: '/assets/frontend/images/placeholder.png',
                assets: [],

                ready_to_show: true,

                content_padding: true,
            }
        },

        watch: {},

        created() {
            let breakpoint = this.$vuetify.breakpoint.name;
            if (breakpoint === 'sm' || breakpoint === 'xs') {
                this.content_padding = false;
            }

            StoryDialogBoxEventBus.$on('StoryDialogStateChange', (alpha_id) => {
                this.getStoryData(alpha_id);
            })

            StoryDialogBoxEventBus.$on('onStoryDialogClickNext', () => {
                let alpha_id = this.$store.getters.getNextStoryAlphaId;
                this.getStoryData(alpha_id);
            });

            StoryDialogBoxEventBus.$on('onStoryDialogClickPrev', () => {
                let alpha_id = this.$store.getters.getPrevStoryAlphaId;
                this.getStoryData(alpha_id);
            });

            StoryDialogBoxEventBus.$on('onResetCurrentStoryIndialog', () => {
                this.story_detail = '';
                this.assets = [];
            })

        },

        mounted() {
        },

        methods: {
            getStoryData(alpha_id) {
                this.$store.dispatch('getStoryNextAndPrevLink', {alpha_id: alpha_id}).then(() => {
                    this.story_detail = this.$store.getters.getCurrentStoryForDialog;
                    if (this.story_detail.assets.length > 0) {
                        this.assets = [];
                        this.assets.push(...this.story_detail.assets);
                    } else {
                        this.assets = [];
                    }

                    StoryDialogBoxEventBus.$emit('setNextPrevButton');

                });
            },

            onOpenVideoPlayerDialog(asset) {
                if (asset.mime_type === "video/mp4") {
                    VideoPlayerDialogBoxEventBus.openPlayerDialogBox(asset);
                }
            },

            getThumbImage(asset) {
                if (asset.mime_type === "video/mp4") {
                    return asset.thumbnail;
                }

                return asset.url;
            },

            goToTagSearch(tag) {
                VideoDialogBoxEventBus.closeDialogByTagSearch(tag);
            },

            goToDetail() {
                VideoDialogBoxEventBus.closeVideoDialog(this.video_detail);
            },

            onIsMovie(asset) {
                if (asset.jw_player_code != null) {
                    return true;
                }
                return false;
            }
        },

        destroyed() {
        }
    }
</script>
