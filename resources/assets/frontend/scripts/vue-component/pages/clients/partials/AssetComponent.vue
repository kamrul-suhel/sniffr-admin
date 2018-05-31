<template>
    <v-flex xs6 sm6 md12 lg12 xl12 @click="showDownloadButton">
        <div class="thumbnail" :style="{backgroundImage:'url('+asset.url+')'}" @click="onOpenDialog(asset.id)">
            <div class="download_asset" :class="{show: showButton}">
                <!--<v-btn fab dark small color="dark"-->
                <!--:loading="loading"-->
                <!--:disabled="loading"-->
                <!--@click.native="downloadAsset()">-->
                <!--<v-icon dark>cloud_download</v-icon>-->
                <!--</v-btn>-->
            </div>
        </div>

        <!-- Image or Video in dialog -->
        <v-dialog
                v-model="story_dialog"
                transition="dialog-bottom-transition"
                scrollable
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
                        :src="current_item.url"
                >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline white--text">Post date: <span
                                        v-if="current_item.created_at">{{current_item.created_at | convertDate}}</span></span>
                            </v-flex>
                        </v-layout>
                    </v-container>
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

                story_dialog: false,

                nextImgExists: true,
                nextImgObj: '',

                previousImgExists: true,
                previousImgObj: '',
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
        },

        methods: {
            showDownloadButton(){
                this.showButton = !this.showButton;
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
        }
    }
</script>