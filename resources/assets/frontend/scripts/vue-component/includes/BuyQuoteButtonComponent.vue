<template>
    <v-btn
            v-if="canBuy"
            dark
            block
            class="mb-0"
            @click.stop="createCollection()"
    >Buy now</v-btn>

    <v-btn
            v-else
            dark
            block
            class="mb-0"
            @click.stop="openQuoteDialog()"
    >Request Quote</v-btn>
</template>

<script>
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus';
    import BuyDialogBoxEventBus from '../../event-bus/buy-dialog-box-event-bus';
    import LoginEventBus from '../../event-bus/login-event-bus';
    export default {
        props:[
            'type',
            'asset'
        ],

        data() {
            return {
                client_logged_in:'',
                canBuy:false,
                user:''
            }
        },

        watch: {
          asset(){
              this.checkLogin();
          }
        },

        created() {
            // Set button component
            this.checkLogin();

            LoginEventBus.$on('loginSuccess', () => {
                this.checkLogin();
            })

            LoginEventBus.$on('logoutChangeState', () => {
                this.checkLogin();
            })
        },

        methods: {
            openQuoteDialog(){
                let form_data = {
                    'type': this.type,
                    'asset_alpha_id': this.asset.alpha_id
                };

                axios.post('/client/collections', form_data)
                    .then(response => {
                        QuoteDialogBoxEventBus.openQuoteDialog(response.data, this.asset, this.type);
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
                        BuyDialogBoxEventBus.openBuyDialog(response.data, this.asset, this.type);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            checkLogin(){
                // Set button component
                this.client_logged_in = this.$store.getters.isClientLogin;
                this.user = this.$store.getters.getUserStatus;
                this.canBuy = (!this.client_logged_in || this.asset.class === 'exceptional' || this.asset.class === '' || !this.asset.class || this.user.active === 0 ) ? false : true;
            }
        }
    }
</script>
