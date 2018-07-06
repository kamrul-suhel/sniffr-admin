<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <v-card>
                <v-card-media
                        :src="video.thumb ? video.thumb :  (video.image ? video.image : '/assets/frontend/images/placeholder.png')"
                        height="200px" class="client-video-thumbnail cdi-content">
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

        <v-flex xs12 sm12 md6 lg6 xl6 pl-3>
            <v-layout row wrap>
                <v-flex xs12 pb-0>
                    <h2 v-html="video.title"></h2>
                    <div class="cd-time">{{ video.updated_at | convertDate }}</div>
                    <div>{{ video.description | readmore(300, ' ...')}}</div>

                    <div class="final-price">
                        <h4>Final price: <span>£{{ video.final_price }}</span></h4>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex v-if="assetType === 'purchased'" xs12 sm12 md3 lg3 xl3 pl-3>
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
                Accept
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

        <v-flex xs12 class="my-4">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import SnackbarEventBus from '../../../../event-bus/snackbar-event-bus';
    import ClientVideoOfferPurchasedEventBus from '../../../../event-bus/client-video-offer-purchased-event-bus'

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

        created() {
            this.assetType = this.type;
        },

        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => {
                    this[l] = false;
                    this.newOrder = true;
                }, 3000)

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
                    return '/assets/frontend/images/placeholder.png';
                }
                return image;
            },

            onDownloadVideo() {
                this.loader = 'loading';
                var url = '/client/videos/' + this.video.id + '/download';
                window.location = url;
            },

            onAccept() {
                console.log('accept video');
                let url = 'collections/accept_asset_price/' + this.video.collection_video_id + '/video';
                this.acceptLoading = true;
                axios.get(url).then((response) => {
                    console.log(response);
                    if (response.data.success === '1') {

                        this.acceptLoading = false;
                        this.assetType = "purchased"
                        this.purchased = true
                        SnackbarEventBus.displayMessage(5000, 'Video has successfully purchased');

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
                        SnackbarEventBus.displayMessage(5000, 'Video has declined');
                    }
                });

            }
        }
    }
</script>
