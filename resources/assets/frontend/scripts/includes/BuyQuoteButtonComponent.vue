<template>
    <v-layout row wrap>
        <v-flex xs12 v-if="getVidePurchased()">
            <v-btn
                    block
                    dark
                    color="dark"
                    @click.native="onDownloadVideo()"
                    :loading="loading"
                    :disabled="loading"
            >
                Download Video
            </v-btn>
        </v-flex>
        <v-flex xs12 v-else>
            <v-btn
                    v-if="canBuy"
                    dark
                    block
                    class="mb-0"
                    @click.stop="createCollection()"
            >Buy now
            </v-btn>

            <v-btn
                    v-else
                    dark
                    block
                    class="mb-0"
                    @click.stop="openQuoteDialog()"
            >Request Quote
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        props: [
            'type',
            'asset'
        ],

        data() {
            return {
                canBuy: false,

                loader: null,
                loading: false,
            }
        },

        watch: {
            asset() {
                this.checkLogin();
            },

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

        computed: {
            ...mapGetters({
                user: 'getUserStatus',
                client_logged_in: 'getClientLogin'
            })
        },

        created() {
            // Set button component
            this.checkLogin();
        },

        methods: {
            openQuoteDialog() {
                let form_data = {
                    'type': this.type,
                    'asset_alpha_id': this.asset.alpha_id
                };

                axios.post('/client/collections', form_data)
                    .then(response => {
                        this.$store.commit('setBuyQuoteCollection', response.data);
                        this.$store.commit('setBuyQuoteAsset', this.asset);
                        this.$store.commit('setBuyQuoteType', this.type);
                        this.$store.commit('setQuoteDialog', true);

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            createCollection() {
                let form_data = {
                    'type': this.type,
                    'asset_alpha_id': this.asset.alpha_id
                };

                axios.post('/client/collections', form_data)
                    .then(response => {
                        this.$store.commit('setBuyQuoteCollection', response.data);
                        this.$store.commit('setBuyQuoteAsset', this.asset);
                        this.$store.commit('setBuyQuoteType', this.type);
                        this.$store.commit('setBuyDialog', true);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            checkLogin() {
                this.canBuy = (!this.client_logged_in || this.asset.class === 'exceptional' || this.asset.class === '' || !this.asset.class || this.user.active === 0) ? false : true;
            },

            getVidePurchased() {
                if (this.asset.video_collections && this.asset.video_collections.length > 0) {
                    return true;
                }
                return false;
            },

            onDownloadVideo() {
                this.loader = 'loading';
                var url = '/client/videos/' + this.asset.id + '/download';
                window.location = url;
            }
        }
    }
</script>
