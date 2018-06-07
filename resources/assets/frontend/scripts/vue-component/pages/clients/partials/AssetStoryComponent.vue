<template>
    <v-flex xs6 sm6 md12 lg12 xl12 @click="showDownloadButton">
        <div class="thumbnail" :style="{backgroundImage:'url('+thumbnailImg+')'}" @click="onOpenDialog(asset.id)">
            <div class="video-icon" v-if="asset.mime_type === 'video/mp4'">
                <v-icon dark medium>play_circle_outline</v-icon>
            </div>
            <!--<div class="download_asset" :class="{show: showButton}">-->
                <!--<v-btn fab dark small color="dark"-->
                <!--:loading="loading"-->
                <!--:disabled="loading"-->
                <!--@click.native="downloadAsset()">-->
                <!--<v-icon dark>cloud_download</v-icon>-->
                <!--</v-btn>-->
            <!--</div>-->
        </div>

        <!-- Image or Video in dialog -->
        <v-dialog
                v-model="story_dialog"
                class="story-dialog-container"
                content-class="story-dialog-container"
                max-width="1200px"
        >
            <div class="dialog-box-switch prev">
                <v-btn color="dark ma-0" fab small dark @click="onPreviousVideo()" :disabled="!previousImgExists">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
            </div>

            <div class="dialog-box-switch next">
                <v-btn color="dark ma-0" fab small dark @click="onNextVideo()" :disabled="!nextImgExists">
                    <v-icon>chevron_right</v-icon>
                </v-btn>
            </div>

            <v-card flat>

                <v-card-media
                        :src="current_item.mime_type === 'video/mp4'? current_item.thumbnail : current_item.url"
                 v-if="!showVideo">
                    <div class="video-button" v-if="current_item.mime_type === 'video/mp4'" @click="onPlayVideo()">
                        <v-btn dark fab class="dark" medium>
                            <v-icon dark large>play_arrow</v-icon>
                        </v-btn>
                    </div>
                </v-card-media>

                <v-card-media v-else>
                    <video width="100%" height="100%" controls ref="playerVideo">
                        <source :src="current_item.url" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </v-card-media>
            </v-card>
        </v-dialog>

    </v-flex>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                loader: null,
                showButton: false,
                current_item: '',
                current_item_thumbnail:'',
                thumbnailImg: '',

                story_dialog: false,

                nextImgExists: true,
                nextImgObj: '',

                previousImgExists: true,
                previousImgObj: '',

                showVideo:false,
            }
        },

        props: ['asset', 'story_id', 'assets'],

        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
        },

        created() {
            this.setImageUrl(this.asset);
        },

        methods: {
            showDownloadButton(){
                this.showButton = !this.showButton;
            },

            setImageUrl(asset){
                if(asset.mime_type === "video/mp4"){
                    this.thumbnailImg = asset.thumbnail;
                }else{
                    this.thumbnailImg = asset.url;
                }
            },

            downloadAsset(){
                this.loader = 'loading';
                this.loader = 'loading';
                var url = '/client/stories/' + this.story_id + '/download';
                window.location = url;
            },

            onClickAsset(){
            },

            onOpenDialog(id){
                this.story_dialog = true;

                this.assets.forEach((item, index) => {
                    if (item.id == id) {
                        this.current_item = item;
                        this.nextImgObj = this.assets[index + 1];
                        this.previousImgObj = this.assets[index - 1];

                        if (!this.nextImgObj) {
                            this.nextImgExists = false;
                        }

                        if (!this.previousImgObj) {
                            this.previousImgExists = false;
                        }
                    }
                })
            },


            onPreviousVideo(){
                this.current_item = this.previousImgObj;
                this.showVideo = false;

                this.assets.forEach((item, index) => {
                    if (item.id == this.current_item.id) {
                        this.current_item = item;
                        this.nextImgObj = this.assets[index + 1];
                        this.previousImgObj = this.assets[index - 1];

                        if (!this.nextImgObj) {
                            this.nextImgExists = false;
                            this.previousImgExists = true;
                        }

                        if (!this.previousImgObj) {
                            this.previousImgExists = false;
                            this.nextImgExists = true;
                        }
                    }
                })
            },

            onNextVideo(){
                this.current_item = this.nextImgObj;
                this.showVideo = false;

                this.assets.forEach((item, index) => {
                    if (item.id == this.current_item.id) {
                        this.current_item = item;
                        this.nextImgObj = this.assets[index + 1];
                        this.previousImgObj = this.assets[index - 1];

                        if (!this.nextImgObj) {
                            this.nextImgExists = false;
                            this.previousImgExists = true;
                        }

                        if (!this.previousImgObj) {
                            this.previousImgExists = false;
                            this.nextImgExists = true;
                        }
                    }
                })
            },

            onCloseDialogBox() {
                this.story_dialog = false;
            },

            onPlayVideo(){
                var promise = new Promise((resolve, reject)=>{
                    this.showVideo = true;
                    resolve();
                });

                promise.then(() =>{
                    console.log('frefs ');
                    setTimeout(()=> {
                        console.log(this.$refs.playerVideo.play());
                    }, 100);

                });

                console.log('Play the video '+ this.current_item.url);
            }
        }
    }
</script>