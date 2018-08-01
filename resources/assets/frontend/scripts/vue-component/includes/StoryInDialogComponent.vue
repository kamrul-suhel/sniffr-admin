<template>
    <div class="video-dialog-content">
        <v-layout row wrap>
            <v-flex xs12 sm12 md7 lg7 xl7>
                <v-layout row wrap>
                    <v-flex xs12 sm12 md6 lg6 xl6
                            v-for="asset in assets"
                            :key="asset.id">
                        <v-card>
                            <v-card-media :src="getThumbImage(asset)" height="200px">
                                <div class="video-icon" v-if="asset.mime_type === 'video/mp4'">
                                    <v-icon color="light" dark>videocam</v-icon>
                                </div>
                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5>
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <v-badge left color="dark story-in-dialog-badge" dark v-if="story.flagged == 1">
                                <v-icon color="red" slot="badge" dark small>whatshot</v-icon>
                                <h2 v-html="story.title"></h2>
                            </v-badge>

                            <h2 v-html="story.title" v-else></h2>

                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6>
                                        <v-icon small>alarm</v-icon>
                                        {{ story.date_ingested }}
                                    </v-flex>
                                    <v-spacer></v-spacer>

                                    <v-flex xs6 class="text-xs-right">
                                        <v-icon small>edit</v-icon>
                                        {{ story.author }}
                                    </v-flex>
                                </v-layout>
                            </div>
                        </div>

                        <div class="content-description">
                            <div v-html="story.description"></div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import StoryDialogBoxEventBus from '../../event-bus/story-dialog-box-event-bus';
    export default {
        data() {
            return {
                story: '',
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

            StoryDialogBoxEventBus.$on('openStoryDialog', (story) => {
                this.story = story;
                if (this.story.assets && this.story.assets.length > 0) {
                    this.assets = [];
                    this.assets.push(...this.story.assets);
                } else {
                    this.assets = [];
                }
            })
        },

        methods: {
            getThumbImage(asset) {
                if (asset.mime_type === "video/mp4") {
                    return asset.thumbnail;
                }
                return asset.url;
            }
        }
    }
</script>
