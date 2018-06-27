<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="videoPlayerDialog"
            max-width="500px"
            content-class="admin-video-player"
    >
            <video autoplay controls :src="video.url">
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
                    this.video = ''
                }
            }
        },

        created() {

            VideoPlayerDialogBoxEventBus.$on('openPlayerDialogBox', (asset) => {
                this.videoPlayerDialog = true;
                this.video = asset;
                console.log(this.video);
            });


            let current_device = this.$vuetify.breakpoint.name;
            if (current_device == 'sm' || current_device == 'xs') {
                this.margin_content = false;
            }


        },

        methods: {},

        destroyed(){
            console.log('this video is deleted');
        }
    }
</script>