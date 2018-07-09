<template>
    <v-btn
            dark
            block
            class="mb-0"
            @click.stop="createCollection()"
    >Buy now</v-btn>
</template>

<script>
    import BuyDialogBoxEventBus from '../../event-bus/buy-dialog-box-event-bus';

    export default {
        props:[
            'type',
            'asset'
        ],

        components: {
        },

        data() {
            return {
                tags: [],
                post_asset_name: '',
                ready_to_show: true,
                content_padding: true,
                client_logged_in: false
            }
        },

        created() {

        },

        methods: {
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
            }
        }
    }
</script>
