<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="videoPlayerDialog"
            max-width="500px"
            content-class="admin-video-player"
            :style="{'line-height':0, overflow:'hidden'}"
    >
            <video ref="video_player" autoplay controls :src="video.url">
            </video>
    </v-dialog>
</template>

<script>
    import VideoPlayerDialogBoxEventBus from '../../../../event-bus/video-player-dialog-box-event-bus';

    export default {
        data() {
            return {
                videoPlayerDialog: false,
                video: '',

                margin_content: true,
            }
        },

        watch: {
            videoPlayerDialog(val){
                if(val === false){
                    this.$refs.video_player.pause();
                    this.video = ''
                }
            }
        },

        created() {

            VideoPlayerDialogBoxEventBus.$on('openPlayerDialogBox', (asset) => {
                this.videoPlayerDialog = true;
                this.video = asset;
            });


            let current_device = this.$vuetify.breakpoint.name;
            if (current_device == 'sm' || current_device == 'xs') {
                this.margin_content = false;
            }


        },

        methods: {},

    }
</script>