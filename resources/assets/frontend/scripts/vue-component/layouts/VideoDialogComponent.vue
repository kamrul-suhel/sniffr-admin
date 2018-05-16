<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="video_dialog"
            transition="dialog-bottom-transition"
            persistent
            scrollable
            class="video-dialog-container"
            content-class="video-dialog-container"
            max-width="1200px"
    >
        <v-card>
            <v-toolbar card dark color="dark">
                <v-btn icon dark @click.native="onCloseDialogbox()">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Sniffr media</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="dialog-box-switch prev">
                        <v-btn color="dark ma-0" fab small dark @click="onPreviousVideo()">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </div>

                    <v-container grid-list-xs fluid :class="{'mx-5': margin_content}">
                        <video-dialog-component></video-dialog-component>
                    </v-container>

                    <div class="dialog-box-switch next">
                        <v-btn color="dark ma-0" fab small dark @click="onNextVideo()">
                            <v-icon>chevron_right</v-icon>
                        </v-btn>
                    </div>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus';
    import VideoDialogComponent from '../pages/videos/VideoInDialogComponent';

    export default {
        data() {
            return {
                video_dialog: false,
                margin_content: true,
                current_page: 0,
            }
        },

        components: {
          VideoDialogComponent
        },

        watch: {
            '$route' (to, from , next){
                console.log(to);
            }
        },

        created() {
            let current_device = this.$vuetify.breakpoint.name;
            if(current_device == 'sm' || current_device == 'xs'){
                this.margin_content = false;
            }

            VideoDialogBoxEventBus.$on('videoDialogStateChange', (alpha_id) => {
                this.video_dialog = VideoDialogBoxEventBus.openVideoDialogBox;
            })

        },

        methods: {
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

            onCloseDialogbox() {
                this.video_dialog = false;
                window.history.pushState(null, '', '/')
            }

        }
    }
</script>