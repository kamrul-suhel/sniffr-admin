<template>
    <v-dialog
            v-model="storyAssetDialog"
            content-class="story-dialog-container"
            max-width="1200px"
    >
        <div class="dialog-box-switch prev">
            <v-btn color="dark ma-0"
                   fab
                   small
                   dark
                   @click="onPreviousVideo()"
                   :disabled="!previousAssetExists">
                <v-icon>chevron_left</v-icon>
            </v-btn>
        </div>

        <div class="dialog-box-switch next">
            <v-btn color="dark ma-0"
                   fab
                   small
                   dark
                   @click="onNextVideo()"
                   :disabled="!nextAssetExists">
                <v-icon>chevron_right</v-icon>
            </v-btn>
        </div>

        <v-card flat v-if="storyAssetDialog">


            <v-card-media v-if="showVideo">
                <video width="100%"
                       height="100%"
                       controls
                       ref="playerVideo">
                    <source :src="currentAsset.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </v-card-media>

            <v-card-media
                    v-else
                    :src="currentAsset.mime_type === 'video/mp4'? currentAsset.thumbnail : currentAsset.url"
                    contain>
                <div class="video-button"
                     v-if="currentAsset.mime_type === 'video/mp4'"
                     @click="onPlayVideo()">

                    <v-btn dark
                           fab
                           medium
                           class="dark">
                        <v-icon dark large>play_arrow</v-icon>
                    </v-btn>
                </div>
            </v-card-media>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                loading: false,
                loader: null,
                currentAsset_thumbnail: '',
                thumbnailImg: '',

                showVideo: false,
            }
        },

        computed: {
            ...mapGetters({
                previousAssetExists: 'getStoryAssetHasPreviousAsset',
                nextAssetExists: 'getStoryAssetHasNextAsset'
            }),

            storyAssetDialog: {
                get(){
                    return this.$store.getters.getStoryAssetDialogBox;
                },

                set(){
                    this.$store.commit('closeStoryAssetDialogBox');
                }
            },

            currentAsset : {
                get(){
                    return this.$store.getters.getCurrentSelectedStoryAsset;
                },

                set(val){

                }
            },
        },

        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            },

            // story_dialog(val) {
            //     if (!val) {
            //         this.showVideo = false;
            //         this.resetNextPrevious();
            //     }
            // }
        },

        created() {
        },

        methods: {
            setImageUrl(asset) {
                if (asset.mime_type === "video/mp4") {
                    this.thumbnailImg = asset.thumbnail;
                } else {
                    this.thumbnailImg = asset.url;
                }
            },

            downloadAsset() {
                this.loader = 'loading';
                this.loader = 'loading';
                var url = '/client/stories/' + this.story_id + '/download';
                window.location = url;
            },

            onPreviousVideo() {
                this.currentAsset = this.previousImgObj;
                this.showVideo = false;

                this.assets.forEach((item, index) => {
                    if (item.id == this.currentAsset.id) {
                        this.currentAsset = item;
                        this.nextImgObj = this.assets[index + 1];
                        this.previousImgObj = this.assets[index - 1];

                        if (!this.nextImgObj) {
                            this.nextImgExists = false;
                            this.previousImgExists = true;
                        }

                        else if (!this.previousImgObj) {
                            this.previousImgExists = false;
                            this.nextImgExists = true;
                        }

                        else {
                            this.previousImgExists = true;
                            this.nextImgExists = true;
                        }
                    }
                })
            },

            onNextVideo() {
                this.currentAsset = this.nextImgObj;
                this.showVideo = false;

                this.assets.forEach((item, index) => {
                    if (item.id == this.currentAsset.id) {
                        this.currentAsset = item;
                        this.nextImgObj = this.assets[index + 1];
                        this.previousImgObj = this.assets[index - 1];

                        if (!this.nextImgObj) {
                            this.nextImgExists = false;
                            this.previousImgExists = true;
                        }

                        else if (!this.previousImgObj) {
                            this.previousImgExists = false;
                            this.nextImgExists = true;
                        }

                        else {
                            this.previousImgExists = true;
                            this.nextImgExists = true;
                        }
                    }
                })
            },

            onCloseDialogBox() {
                this.story_dialog = false;
            },

            onPlayVideo() {
                var promise = new Promise((resolve, reject) => {
                    this.showVideo = true;
                    resolve();
                });

                promise.then(() => {
                    setTimeout(() => {
                        this.$refs.playerVideo.play();
                    }, 100);

                });

            },

            resetNextPrevious() {
                this.nextImgExists = true;
                this.nextImgObj = '';
                this.previousImgExists = true;
                this.previousImgObj = ''
            }
        }
    }
</script>
