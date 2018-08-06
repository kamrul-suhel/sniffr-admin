<template>
    <v-layout row wrap>
        <v-flex xs12>
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
            }
        },

        watch: {
            asset() {
                this.checkLogin();
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
            }
        }
    }
</script>
