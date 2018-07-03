<template>
    <v-btn dark block class="mb-0" @click.stop="createCollection()">{{ button_text }}</v-btn>
</template>

<script>
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus';

    export default {
        props:['type', 'asset'],

        components: {
        },

        data() {
            return {
                tags: [],
                post_asset_name: '',
                button_text: 'Buy Now',
                ready_to_show: true,
                content_padding: true,
            }
        },

        watch: {

        },

        created() {
            this.button_text = (this.type == 'story' || this.asset.class == 'exceptional' || this.asset.class == '') ? 'Request Quote' : 'Buy Now';
        },

        mounted() {
        },

        methods: {
            createCollection() {
                axios.post('/client/collections', {
                    'type': this.type,
                    'asset_alpha_id': this.asset.alpha_id
                })
                    .then(response => {
                        QuoteDialogBoxEventBus.openQuoteDialog(response.data, this.asset, this.type);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        destroyed() {
        }
    }
</script>
