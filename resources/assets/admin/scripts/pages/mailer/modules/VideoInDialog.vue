<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="video_dialog"
            scrollable
            content-class="video-dialog-container"
    >
        <div class="dialog-box-switch prev">
            <v-btn color="dark ma-0 hidden-xs-only" fab small  dark @click="onPreviousVideo()" :disabled="!previousPageExists" >
                <v-icon>chevron_left</v-icon>
            </v-btn>
        </div>

        <div class="dialog-box-switch next">
            <v-btn color="dark ma-0 hidden-xs-only" fab small  dark @click="onNextVideo()" :disabled="!nextPageExists" >
                <v-icon>chevron_right</v-icon>
            </v-btn>
        </div>

        <v-card>
            <v-toolbar card dark color="dark">
                <v-btn icon dark @click.native="onCloseDialogBox()">
                    <v-icon>close</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <div class="mailer-label">
                        Add to mailer
                    </div>
                    <v-checkbox
                            v-model="selected"
                            @change="onVideoClick()"
                    ></v-checkbox>
                </v-toolbar-items>

            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="video-dialog-loading"></div>

                    <v-container grid-list-xl fluid
                                 v-touch="{
                                      left: () => swipe('Left'),
                                      right: () => swipe('Right')
                                }"
                    >
                        <video-dialog-component></video-dialog-component>
                    </v-container>


                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';
    import VideoDialogComponent from '../../../includes/VideoInDialogComponent';

    export default {
        data() {
            return {
                selected:false,
                current_video: '',
                video_dialog: false,
                margin_content: true,
                current_page: 0,

                nextPageExists: true,
                nextPageAlphaId: '',

                previousPageExists: true,
                previousPageAlphaId: '',
                swipeDirection:'',

            }
        },

        watch: {
            video_dialog() {
                if(this.video_dialog === false){
                    let url = this.$store.getters.getEnterStateUrl;
                    this.$router.push({path: url});
                    setTimeout(() => {
                        this.$store.commit('setResetVideoDialogObject');
                    }, 500)
                }
            }
        },

        components: {
            VideoDialogComponent
        },

        created() {
            let current_device = this.$vuetify.breakpoint.name;
            if(current_device == 'sm' || current_device == 'xs'){
                this.margin_content = false;
            }

            VideoDialogBoxEventBus.$on('videoDialogStateChange', (alpha_id) => {
                this.video_dialog = VideoDialogBoxEventBus.openVideoDialogBox;
            })

            VideoDialogBoxEventBus.$on('setNextPrevButton', () => {
                this.nextPageAlphaId = this.$store.getters.getNextVideoAlphaId;
                this.previousPageAlphaId = this.$store.getters.getPrevVideoAlphaId;

                this.checkAlphaIdExists();
                this.current_video = this.$store.getters.getCurrentVideoForDialog;

                this.isVideoSelected()

            })

            VideoDialogBoxEventBus.$on('videoDialogBoxClose', (video) => {
                this.video_dialog = false;
                setTimeout(()=> {
                    this.$router.push({name: 'videos_detail', params : {id : video.alpha_id}});
                }, 500);

            });

            VideoDialogBoxEventBus.$on('videoDialogBoxCloseByTag', (tag) => {
                this.video_dialog = false;
                setTimeout(() => {
                    this.$router.push({name: 'videos_tag', params: {value: tag.name}});
                }, 500);

            });

        },

        methods: {
            swipe (direction) {
                this.swipeDirection = direction;
                if(direction === 'Right'){
                    this.onPreviousVideo();
                }

                if(direction === 'Left'){
                    this.onNextVideo();
                }
            },

            onPreviousVideo(){

                VideoDialogBoxEventBus.videoDialogPrevButtonClick()
            },

            onNextVideo(){

                VideoDialogBoxEventBus.videoDialogNextButtonClick()

            },

            onVideoClick(){
                if (this.selected) {
                    this.$store.commit('addVideo', this.current_video);
                    VideoDialogBoxEventBus.$emit('addedVideoFromDialog', this.current_video.id);
                } else {
                    VideoDialogBoxEventBus.$emit('removeVideoFromDialog', this.current_video.id);
                    this.$store.commit('removeVideo', this.current_video);
                }
            },

            onCloseDialogBox() {
                this.video_dialog = false;
            },

            checkAlphaIdExists() {
                if (!this.nextPageAlphaId) {
                    this.nextPageExists = false;
                }else{
                    this.nextPageExists = true;
                }

                if (!this.previousPageAlphaId) {
                    this.previousPageExists = false;
                }else{
                    this.previousPageExists = true;
                }
            },

            isVideoSelected(){
                let videos = this.$store.getters.getAllSelectedVideos;

                //set initialize state
                this.selected = false;
                videos.forEach((video) => {
                    if (video.id === this.current_video.id) {
                        this.selected = true;
                    }
                });
            }

        }
    }
</script>
