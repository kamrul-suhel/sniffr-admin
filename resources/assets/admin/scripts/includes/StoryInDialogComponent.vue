<template>
    <div class="video-dialog-content">
        <v-layout row wrap>

            <v-flex xs12 sm12 md7 lg7 xl7>
                <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                        <v-flex xs6 v-for="asset in assets" :key="asset.id">
                            <v-card>
                                <v-card-media :src="asset.url" height="200px"></v-card-media>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5>
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <h2 v-html="story_detail.title"></h2>
                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6>
                                        <v-icon small>alarm</v-icon>
                                        {{ story_detail.date_ingested }}
                                    </v-flex>
                                    <v-spacer></v-spacer>

                                    <v-flex xs6 class="text-xs-right">
                                        <v-icon small>remove_red_eye</v-icon>
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
    import VideoPlayer from './VideoPlayerComponent';

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

        watch: {

        },

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
                console.log('is passing');

                this.$store.dispatch('getStoryNextAndPrevLink', {alpha_id: alpha_id}).then(() => {
                    this.story_detail = this.$store.getters.getCurrentStoryForDialog;
                    console.log(this.story_detail);
                    if (this.story_detail.assets.length > 0) {
                        this.assets = [];
                        this.assets.push(...this.story_detail.assets);
                    } else {
                        this.assets = [];
                    }

                    StoryDialogBoxEventBus.$emit('setNextPrevButton');

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