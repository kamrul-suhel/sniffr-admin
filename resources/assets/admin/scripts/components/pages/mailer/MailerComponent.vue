<template>
    <div class="admin-mailer-section">
        <!-- Video dialog -->
        <video-in-dialog></video-in-dialog>

        <!-- Story dialog -->
        <story-in-dialog></story-in-dialog>


        <v-dialog v-model="dialog" max-width="400" content-class="mailer-dialog-error" persistent>
            <!-- Mail empty card -->
            <v-card v-if="notSelectedError">

                <v-card-text>
                    <div class="text-xs-center">
                        <v-icon size="80px" color="black">error_outline</v-icon>
                    </div>
                    <div class="text-xs-center"><h4 class="text-uppercase">{{errorMessage}}</h4></div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
                </v-card-actions>
            </v-card>
            <!-- End mail empty card -->

            <!-- Refresh stories card -->
            <v-card v-else>
                <v-card-text>
                    <div class="text-xs-center my-4">
                        <v-progress-circular
                                :size="50"
                                :width="4"
                                color="black"
                                :indeterminate="indeterminate"
                                :value="!indeterminate ? 100 : 0"
                        >
                            <v-icon color="black" v-if="!indeterminate">done</v-icon>
                        </v-progress-circular>
                    </div>

                    <div class="text-xs-center">
                        <h4 class="text-uppercase">{{ refreshTitle }}</h4>
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-1" flat="flat" @click.native="dialog = false" :disabled="disableButton">
                        Ok
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- End refresh stories dialog box -->

        <v-container grid-list-lg fluid>
            <v-layout row wrap>
                <v-flex xs4 class="text-xs-left">
                    <v-btn @click="onAddStories()">
                        <v-icon>add</v-icon>
                        Add Stories
                    </v-btn>
                </v-flex>
                <v-flex xs8 class="text-xs-right">
                    <v-btn dark raised @click="onRefreshStories()">
                        <v-icon>refresh</v-icon>
                        Refresh Stories
                    </v-btn>

                    <v-btn dark raised @click="onCreateMailer()">
                        <v-icon>add</v-icon>
                        Create Mailer
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid grid-list-lg>
            <v-tabs
                    v-model="active"
                    color="dark"
                    dark
                    slider-color="primary"
            >
                <v-tab>
                    Stories
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-stories-component></mailer-stories-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab>
                    Videos
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-videos-component></mailer-videos-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-container>
    </div>
</template>

<script>
    import MailerVideosComponent from './modules/VideosComponents';
    import MailerStoriesComponent from './modules/StoriesComponents';
    import MailerEventBus from '../../../event-bus/mailer-event-bus';
    import VideoInDialog from './modules/VideoInDialog';
    import StoryInDialog from './modules/StoryDialog';

    export default {
        components: {
            mailerVideosComponent: MailerVideosComponent,
            mailerStoriesComponent: MailerStoriesComponent,
            videoInDialog: VideoInDialog,
            storyInDialog: StoryInDialog,
        },

        data() {
            return {
                active: null,
                dialog: false,

                notSelectedError: false,
                errorMessage: '',

                indeterminate: true,
                refreshTitle: 'Please wait while the stories update. This may take a few minutes.',
                refreshIcon: 'done',

                disableButton: true,
            }
        },

        created() {
        },

        methods: {

            onCreateMailer() {
                // get the selected stories
                let stories = this.$store.getters.getAllSelectedStories;
                let videos = this.$store.getters.getAllSelectedVideos;
                if (stories.length === 0 && videos.length === 0) {
                    this.errorMessage = "Please select A story or video";
                    this.notSelectedError = true;
                    this.dialog = true;
                    return;
                }

                let storiesId = [];
                let videosId = [];
                stories.forEach((story) => {
                    storiesId.push(story.id);
                });

                videos.forEach((video) => {
                    videosId.push(video.id);
                });

                let storiesString = JSON.stringify(storiesId);
                let videosString = JSON.stringify(videosId);

                // send the data to downloaded
                let url = '/admin/mailers/create?videos=' + videosString + '&stories=' + storiesString;

                axios.get(url)
                    .then((response) => {
                        if (response.data.status === 'success') {
                            window.location = '/admin/mailers/edit/' + response.data.mailer_id;
                        } else {
                            this.errorMessage = "Something went wrong";
                            this.dialog = true;
                        }
                    });
            },

            onRefreshStories() {
                this.dialog = true;

                let refreshUrl = '/admin/mailers/refresh';

                axios.get(refreshUrl).then((response) => {
                        if (response.data.dispatched == false) {
                            this.refreshTitle = 'Stories are already up-to-date.';
                            this.indeterminate = false;
                            this.disableButton = false
                        } else {
                            // jobs have been sent to queue so need to check the job queue
                            this.checkJobs();
                        }
                    },
                    (error) => {
                        this.checkJobs();
                    }
                )
            },

            checkJobs() {
                setTimeout(() => {
                    let url = '/admin/mailers/checkjobs';
                    axios.get(url)
                        .then((response) => {
                            if (response.data.jobs == 0) {
                                this.refreshTitle = 'Stories are now up-to-date.';
                                this.indeterminate = false;
                                MailerEventBus.storiesUpdated();
                                this.disableButton = false

                            } else {
                                // jobs are still in the queue, so run again
                                this.checkJobs();
                            }
                        });
                }, 5000);
            },

            onAddStories() {
                window.location.href = '/admin/stories/create';
            },
        },
    }
</script>

<style lang="css" scoped>
    @import "./plugins/vuetify.min.css";
</style>
