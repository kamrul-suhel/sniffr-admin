<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <v-card>
                <v-card-media
                        :src="video.thumb ? video.thumb :  (video.image ? video.image : '/assets/images/placeholder.png')"
                        height="250px"
                        @click="onVideoDialog()"
                        class="client-video-thumbnail cdi-content">
                    <div class="cdi-label" v-if="purchased">
                        <v-tooltip top>
                            <v-btn slot="activator" flat icon raised light color="white">
                                <v-icon size="25px">money</v-icon>
                            </v-btn>
                            <span>Purchased</span>
                        </v-tooltip>
                    </div>

                    <div class="cdi-label" v-if="decline">
                        <v-tooltip top>
                            <v-btn slot="activator" flat icon raised light color="white">
                                <v-icon size="25px">error_outline</v-icon>
                            </v-btn>
                            <span>Declined</span>
                        </v-tooltip>
                    </div>
                </v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6 xl6>
            <v-layout row wrap>
                <v-flex xs12 pb-0>
                    <h2 v-html="video.title"></h2>
                    <div class="cd-time">{{ video.updated_at | convertDate }}</div>
                    <div>{{ video.description | readmore(300, ' ...')}}</div>

                    <div class="quote" v-if="type === 'offered' || type === 'purchased'">
                        <v-layout column fill-height>
                            <v-flex xs12 class="pb-0" v-if="video.platform">
                                <span>Platform: {{ video.platform | convertHyphenToSpace }}</span>
                            </v-flex>

                            <v-flex xs12 class="pb-0" v-if="video.platform">
                                <span>Length: {{ settings.pricing.length[video.length].name }}</span>
                            </v-flex>

                            <v-flex xs12 class="pb-0" v-if="video.type">
                                <span>Type: {{ settings.pricing.type[video.type].name }}</span>
                            </v-flex>

                            <v-flex xs12 class="pb-0" v-if="video.credit">
                                <span>Please Credit: {{ video.credit }}</span>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex v-if="expired" xs12 sm12 md3 lg3 xl3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    disabled
                    color="dark"
                    class="mb-3">
                No Longer Available
            </v-btn>
        </v-flex>

        <v-flex
                v-else-if="video.collection_status === 'requested'"
                xs12 sm12 md3 lg3 xl3 pl-3
                align-content-center justify-center>
            <p class="text-xs-center darken-4">Waiting for quote</p>
        </v-flex>

        <v-flex v-else-if="assetType === 'purchased' || video.purchased" xs12 sm12 md3 lg3 xl3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    @click="goToDetail()"
                    color="dark"
                    class="mb-3">
                View
            </v-btn>

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDownloadVideo()"
                    :loading="loading"
                    :disabled="loading"
            >
                {{ button_text }}
            </v-btn>

            <div class="caption text-xs-center pt-2"
                 v-if="assetType === 'purchased'">{{ video.license_ends_at | licenseExpired }}
            </div>
        </v-flex>

        <v-flex v-else xs12 sm12 md3 lg3 xl3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    :loading="acceptLoading"
                    :disabled="acceptLoading || assetDeclined"
                    @click="onAccept()"
                    color="dark"
                    class="mb-3">
                £{{ video.final_price | numberFormat }} - Buy Now
            </v-btn>

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDecline()"
                    :loading="declineLoading"
                    :disabled="declineLoading || assetDeclined"
            >
                Decline
            </v-btn>
        </v-flex>

        <v-flex xs12 class="my-2">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                button_text: 'Download Video',
                purchased: false,
                decline: false,

                loader: null,
                showButton: false,

                loading: false,
                acceptLoading: false,
                declineLoading:false,
                assetDeclined: false,

                expired:  false,

                assetType:''
            }
        },

        props: {
            video: {
                type: Object,
                require: true
            },

            type: {
                type: String,
                require: true
            },

            index: {
                type: Number,
                require: true
            }
        },

        computed: {
            ...mapGetters({
                settings: 'getSettingsObject'
            })
        },

        created() {
            this.assetType = this.type;
            if(this.video.expired){
                this.expired = true;
            }
        },

        watch: {
            loader() {
                const l = this.loader;
                this[l] = !this[l];

                setTimeout(() => {
                    this[l] = false;
                    this.newOrder = true;
                }, 3000);

                this.loader = null
            }

        },

        methods: {
            showDownloadButton() {
                this.showButton = !this.showButton;
            },

            goToDetail() {
                this.$router.push({name: 'client_video_detail', params: {'alpha_id': this.video.alpha_id}})
            },

            getImage(image) {
                if (!image) {
                    return '/assets/images/placeholder.png';
                }
                return image;
            },

            onDownloadVideo() {
                this.loader = 'loading';
                var url = '/client/videos/' + this.video.id + '/download';
                window.location = url;
            },

            onAccept() {
                let url = 'collections/accept_asset_price/' + this.video.collection_video_id + '/video';
                this.acceptLoading = true;

                axios.get(url).then((response) => {
                    if (response.data.success === '1') {
                        this.$store.commit('setUserOffers', this.$store.getters.getUserStatus.offers - 1);
                        this.acceptLoading = false;
                        this.assetType = "purchased";
                        this.purchased = true;
                        // SnackbarEventBus.displayMessage(5000, 'Video has successfully purchased');

                        // After purchased, if we need to to change another component data this event need to enable
                        // ClientVideoOfferPurchasedEventBus.clientRemoveVideo(this.index);
                    }
                });
            },

            onDecline() {
                let url = 'collections/reject_asset_price/' + this.video.collection_video_id + '/video';
                this.declineLoading = true;
                axios.get(url).then((response) => {
                    if (response.data.success === '1') {
                        // Do some action when they accept
                        this.declineLoading = false;

                        this.assetDeclined = true;
                        this.decline = true;
                        // SnackbarEventBus.displayMessage(5000, 'Video has declined');
                    }
                });

            },

            onVideoDialog(){
                let url = this.$route.path;

                url += '?type='+this.type;
                url += '&id='+this.video.alpha_id;

                if(this.$route.query.tag){
                    url += '&tag='+this.$route.query.tag;
                }
                this.$route.query.alpha_id = this.video.alpha_id;


                this.$store.commit('setEnterRouteObject', this.$route);

                window.history.pushState({}, null, url);


                if(this.$route.name === 'client_offered_assets'){
                    // client offered page

                    let index = this.index;
                    this.$store.commit('setAssetOfferedCurrentIndex', index);
                    this.$store.dispatch('fetchOfferedDialogNextPrevious');

                    this.$store.commit('setVideoDialogBox', true);
                    this.$store.commit('setVideoLoading', true);
                    return;
                }



                this.$store.commit('setCurrentVideoAlphaId', this.video.alpha_id);
                this.$store.commit('setCurrentRouteObject', this.$route);
                this.$store.commit('setVideoDialogBox', true);
                this.$store.commit('setVideoLoading', true);

                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: this.video.alpha_id});
            }
        }
    }
</script>
