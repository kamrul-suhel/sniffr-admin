<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="video_dialog"
            transition="dialog-bottom-transition"
            scrollable
            class="video-dialog-container"
            content-class="video-dialog-container"
    >
        <div class="dialog-box-loading" v-if="loadData">
            <div class="dialog-box-loading-content">
                <v-progress-circular :size="50" indeterminate color="dark"></v-progress-circular>
            </div>
        </div>

        <v-card>
            <v-toolbar card dark color="dark">
                <v-btn icon dark @click.native="onCloseDialogBox()">
                    <v-icon>close</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                        icon
                        @click="onPreviousVideo"
                        :disabled="!previousPageExists">
                    <v-icon>navigate_before</v-icon>
                </v-btn>

                <v-btn
                        icon
                        @click="onNextVideo"
                        :disabled="!nextPageExists">
                    <v-icon>navigate_next</v-icon>
                </v-btn>

            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="video-dialog-loading"></div>

                    <v-container class="no-padding" grid-list-xs fluid
                                 v-touch="{
                                      left: () => swipe('Left'),
                                      right: () => swipe('Right')
                                }"
                    >
                        <video-in-dialog-component></video-in-dialog-component>
                    </v-container>
                </v-layout>
            </v-card-text>
        </v-card>

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
    </v-dialog>
</template>

<script>
    import VideoInDialogComponent from '../pages/videos/VideoInDialogComponent';
    import {mapGetters } from 'vuex';

    export default {
        data() {
            return {
                current_page: 0,

                nextPageAlphaId: '',

                previousPageAlphaId: '',
                swipeDirection:''
            }
        },

        computed: {
            ...mapGetters({
            }),

            nextPageExists(){
                return this.$store.getters.getNextVideoAlphaId ? true : false;
            },

            previousPageExists() {
                return this.$store.getters.getPreviousVideoAlphaId ? true : false;
            },

            loadData: {
                get(){
                    return this.$store.getters.getVideoLoading;
                },

                set(value){
                    this.$store.commit('setVideoLoading', value)
                }
            },

            video_dialog:{
                get(){
                    return this.$store.getters.getVideoDialogBox
                },

                set(value){
                    if(value === false){
                        let url = this.$store.getters.getEnterStateUrl;
                        setTimeout(() => {
                            window.history.pushState({}, null, url)
                            this.$store.commit('setResetVideoDialogObject');
                        }, 500)
                    }
                }
            },

            current_video(){
                return this.$store.getters.getCurrentVideo;
            }
        },

        components: {
            VideoInDialogComponent
        },

        created() {
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
                let alphaId = this.$store.getters.getPreviousVideoAlphaId;
                this.onGetVideo(alphaId, 'prev')
            },

            onNextVideo(){
                let alphaId = this.$store.getters.getNextVideoAlphaId;
                this.onGetVideo(alphaId, 'next');
            },

            onGetVideo(alphaId, direction=''){
                let type = this.$route.query.type;
                let url = this.$route.path;
                url = '?id='+alphaId;

                if(this.$route.query.tag){
                    url += '&tag='+this.$route.query.tag;
                }

                if(this.$route.query.search){
                    url += '&search='+this.$route.query.search;
                }

                if(type === 'suggest'){
                    this.$store.commit('setVideoDialogBox', true);
                    this.$store.commit('setVideoLoading', true);

                    url = this.$route.path;
                    url += '?id='+alphaId;
                    url += '&suggest=true';
                    let index = this.$store.getters.getMailerVideoCurrentIndex;
                    if(direction === 'next'){
                        index += 1;
                    }

                    if(direction === 'prev'){
                        index -= 1;
                    }
                    
                    this.$store.commit('setMailerVideoCurrentIndex', index);
                    this.$store.commit('setSuggestNextPrevious');
                    return;
                }

                if(type === 'offered'){
                    url += '&type=offered'
                }

                window.history.pushState({}, null, url);

                if(this.$route.name === 'client_offered_assets'){
                    // client offered page

                    let index = this.$store.getters.getAssetOfferedCurrentIndex;
                    if(direction === 'next'){
                        index += 1;
                    }

                    if(direction === 'prev'){
                        index -= 1;
                    }

                    this.$store.commit('setAssetOfferedCurrentIndex', index);

                    this.$store.dispatch('fetchOfferedDialogNextPrevious', index);

                    this.$store.commit('setVideoDialogBox', true);
                    this.$store.commit('setVideoLoading', true);
                    return;
                }

                this.$store.commit('setCurrentRouteObject', this.$route);
                this.$store.commit('setVideoDialogBox', true);
                this.$store.commit('setVideoLoading', true);
                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: alphaId});

            },

            onCloseDialogBox() {
                this.video_dialog = false;
            }

        }
    }
</script>
