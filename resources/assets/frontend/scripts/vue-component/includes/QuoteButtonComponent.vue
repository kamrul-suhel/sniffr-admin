<template>
    <v-btn
            dark
            block
            class="mb-0"
            @click.stop="openQuoteDialog()"
    >Request Quote</v-btn>
</template>

<script>
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus';
    export default {
        props:[
            'type',
            'asset'
        ],

        data() {
            return {
            }
        },

        created() {

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
            }
        }
    }
</script>
