<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="video_dialog"
            transition="dialog-bottom-transition"
            scrollable
            class="video-dialog-container"
            content-class="video-dialog-container"
    >
        <!--<div class="dialog-box-loading">-->
            <!--<div class="dialog-box-loading-content">-->
                <!--<v-progress-circular :size="50" indeterminate color="dark"></v-progress-circular>-->
            <!--</div>-->
        <!--</div>-->
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
                <!--<v-toolbar-title>Swipe Direction: {{ swipeDirection }}</v-toolbar-title>-->

            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="video-dialog-loading"></div>

                    <v-container grid-list-xs fluid
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
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus';
    import VideoDialogComponent from '../pages/videos/VideoInDialogComponent';
    import LoginEventBus from '../../event-bus/login-event-bus';

    export default {
        data() {
            return {
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
                    window.history.pushState(null, '', url);
                    setTimeout(() => {
                        this.$store.commit('setResetVideoDialogObject');
                        LoginEventBus.$emit('onResetCurrentVideoIndialog');
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
                let alpha_id = this.$store.getters.getPrevVideoAlphaId;
                let url = '/videos/'+alpha_id;
                window.history.pushState(null, "page 2",url);
                VideoDialogBoxEventBus.videoDialogPrevButtonClick()
            },

            onNextVideo(){
                let alpha_id = this.$store.getters.getNextVideoAlphaId;
                let url = '/videos/'+alpha_id;
                window.history.pushState(null, "page 2",url);
                VideoDialogBoxEventBus.videoDialogNextButtonClick()

            },

            onCloseDialogBox() {
                this.video_dialog = false;
                let url = this.$store.getters.getEnterStateUrl;
                window.history.pushState(null, '', url)
                this.$store.commit('setResetVideoDialogObject');
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

        }
    }
</script>