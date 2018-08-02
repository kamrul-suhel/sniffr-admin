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
    import VideoDialogBoxEventBus from '../../../../event-bus/video-dialog-box-event-bus';
    import VideoDialogComponent from '../../../../includes/VideoInDialogComponent';

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

<style lang="scss">

    @mixin small-device{
        @media (min-width: 576px) {
            @content
        }
    }

    // Medium devices (tablets, 768px and up)
    @mixin medium-device{
        @media (min-width: 768px) {
            @content
        }
    }

    // Large devices (desktops, 992px and up)
    @mixin large-device{
        @media (min-width: 992px) {
            @content
        }
    }

    // Extra large devices (large desktops, 1200px and up)
    @mixin extra-large-device{
        @media (min-width: 1200px) {
            @content
        }
    }
    // ===== COLOR =====
    $text-color:#222;
    $ternary-color:#999b9e;
    $link-color:#secondary-color;
    $link-hover-color:#000;
    $menu-item-color:white;
    $section-padding: 40px;
    $section-title-after-space: 20px;
    $title-color: #000;
    $gray-5: rgba(0,0,0,.54);


    // ===== SECTION SPACING =====
    $section-spacing : 50px;
    $section-spacing-mobile : 30px;

    // ===== HOME PAGE COLOR =====
    $home-textcolor: #ffffff;


    /*
     ********* HEADING SPACE *********
     */

    $heading_bottom_space: 20px;


    /*
     ********* FEATURE SECTION THEME *********
     */
    $featured-title-color : #000000;
    $feature-container-spacing: 15px;
    $featured-title-space : 0;


    // ===== FOOTER SECTION THEME =====
    $footer-background-color: #000;

    // ===== UPLOAD VIDEO SECTION THEME =====
    $upload-video-title-color: #000;

    // ===== FONTS =====
    $text-font:JosefinSansregular, Arial, sans-serif;
    $heading-font: JosefinSansbold, Georgia, serif;


    // ===== SIZES =====
    $content-width:960;
    $header-height:60px;
    $footer-height:90px;

    .video-dialog-container {
        border-radius: 0px;
        position: relative;
        overflow:unset;
        width:95%;

        @include small-device {
            width:95%;
        }

        @include medium-device {
            width:70%;
        }

        @include large-device {
            width:80%;
        }

        @include extra-large-device {
            width:80%;
        }



        .dialog-box-switch {
            position: absolute;
            z-index: 10;
            top: calc(50% - 20px);

            &.prev {
                left: -50px;
            }

            &.next {
                right: -50px;
            }
        }

        .dialog-box-loading {
            position: absolute;
            width: 100%;
            height: calc(100% - 64px);
            z-index: 11;
            background: rgba(255, 255, 255, .5);
            bottom: 0px;

            .dialog-box-loading-content {
                position: absolute;
                top: calc(50% - 25px);
                left: calc(50% - 25px);
            }
        }



        .video-player-poster{
            position:relative;

            > div{
                padding-top:56.26%;
            }

            .player-play{
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -28px;
                margin-left: -28px;
            }
        }

    }

    .video-dialog-box {
        position: relative;

        .video-detail-content{
            .read-more{
                margin-bottom: 15px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;

                a{
                    font-style:italic;
                    color:#777;
                    transition:all ease-in-out .3s;

                    i{
                        font-size: 17px;
                        margin-bottom: 3px;
                    }

                    &:hover{
                        color:#000;
                    }
                }
            }
        }

        .nsfw {
            position: absolute;
            right: 0;
            display: inline-block;
            background: #da0039;
            padding: 5px 10px;

            a {
                text-decoration: none;
                color: #fff;
            }

        }
    }

    .video-dialog-content {
        #video_player {
            width: 100%;
            height: 350px;
        }

        .fb_iframe_widget {
            span {
                height: auto !important;
                max-height: 540px;
                width: 100% !important;

                @include small-device {
                    & {
                        height: 530px !important;
                        max-height: 540px;
                    }
                }

                @include medium-device {
                    & {
                        height: 530px !important;
                        max-height: 540px;
                    }
                }

                @include large-device {
                    & {
                        height: 530px !important;
                        max-height: 540px;
                    }
                }

                @include extra-large-device {
                    & {
                        height: 530px !important;
                        max-height: 540px;
                    }
                }

            }
        }

        .horizontal {
            .video-container {
                video {
                    max-height: 350px;
                }
                .fb-video {
                    width: 530px !important;
                }
            }
        }

        .vertical {
            .video-container {
                .fb-video {
                    width: 530px !important;
                    max-height: 530px !important;
                }
            }
        }

        .video-container {
            display: flex;
            width: 100%;
            position: relative;

            .video_player-dimensions {
                width: 100%;
                height: 450px;
                position: relative;
            }

            .vjs-control-bar {
                display: none;
            }

            .vjs-caption-settings {
                display: none;
            }

            iframe {
                width: 100%;

                &.youtube-iframe {
                    height: 300px;
                }
                &.instagram-media {
                    margin: 0 auto !important; // to overwrite default style
                }

                @include small-device {
                    &.youtube-iframe {
                        height: 300px;
                    }
                }

                @include medium-device {
                    &.youtube-iframe {
                        height: 450px;
                    }
                }

                @include large-device {
                    &.youtube-iframe {
                        height: 450px;
                    }
                }

                @include extra-large-device {
                    &.youtube-iframe {
                        height: 450px;
                    }
                }
            }
            .fb-video {
                width: 95% !important;
                margin: 0;
            }
        }

        .embedded {
            background: #fff;
        }

        .video-detail-content {
            margin-top: 30px;

            h2 {
                text-transform: uppercase;
                margin-top: 0;
            }

            .video-title-caption{
                padding: 5px 0;
                //border-top: 1px solid #ddd;
                //border-bottom: 1px solid #ddd;
                margin: 0 0 10px 0;
                color: #777;
                font-style: italic;

                i{
                    color:#777;
                    margin-bottom:2px;
                }
            }

            a {
                text-decoration: none;
                color: #000;

                &:hover {
                    color: #777;
                }
            }
        }

        .video-detail-tags {
            ul {
                list-style: none;
                padding: 0;

                li {
                    display: inline-block;
                    margin-right: 7px;

                    a {
                        color: #777;
                        font-size: 16px;
                        text-decoration: none;
                        transition: all ease-in-out .3s;
                    }

                    a:hover {
                        color: $link-hover-color;
                    }
                }
            }
        }

        .video-detail-sidebar {
            .video-detail-social-share {
                width: 150px;
                text-align: center;
            }

            .video-license {
                width: 200px;
                padding: 10px;
                background: #000;
                color: #fff;
                text-align: center;
                text-transform: uppercase;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .video-social-link {
                h3 {
                    font-size: 16px;
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }

                ul {
                    list-style: none;
                    padding: 0;

                    li {
                        display: inline-block;
                        margin-right: 10px;

                        a {
                            color: #000;
                            transition: all ease-in-out .3s;
                        }

                        a:hover {
                            opacity: .5;
                        }
                    }
                }
            }
        }

        .loading {
            animation: loader 1s infinite;
            display: flex;
        }
    }
</style>