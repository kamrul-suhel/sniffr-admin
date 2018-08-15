<template>
    <v-dialog
            v-model="storyAssetDialog"
            content-class="story-dialog-container"
            max-width="1200px">
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
                showVideo: false,
            }
        },

        computed: {
            ...mapGetters({
                previousAssetExists: 'getStoryAssetHasPreviousAsset',
                nextAssetExists: 'getStoryAssetHasNextAsset',
                nextAssetId: 'getCurrentStoryNextAssetId',
                previousAssetId: 'getCurrentStoryPreviousAssetId'
            }),

            storyAssetDialog: {
                get() {
                    return this.$store.getters.getStoryAssetDialogBox;
                },

                set() {
                    this.showVideo = false;
                    this.$store.commit('closeStoryAssetDialogBox');
                }
            },

            currentAsset: {
                get() {
                    return this.$store.getters.getCurrentSelectedStoryAsset;
                },

                set(val) {
                }
            },
        },

        watch: {},

        created() {
        },

        methods: {

            onPreviousVideo() {
                this.showVideo = false;
                this.$store.commit('setStoryAssetDialogBox', {open: true, id: this.previousAssetId});
            },

            onNextVideo() {
                this.showVideo = false;
                this.$store.commit('setStoryAssetDialogBox', {open: true, id: this.nextAssetId});
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

            }
        }
    }
</script>
