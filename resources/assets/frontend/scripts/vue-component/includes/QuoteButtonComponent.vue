<template>
    <v-btn dark block class="mb-0" @click.stop="createCollection()">{{ button_text }}</v-btn>
</template>

<script>
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus';
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus';

    export default {
        props:['type', 'asset', 'user'],

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
            asset(){
                this.setButtonText();
            }
        },

        created() {
            VideoDialogBoxEventBus.$on('videoDialogStateChange', (alpha_id) => {
                this.setButtonText();
            });

            VideoDialogBoxEventBus.$on('onDialogClickNext', () => {
                this.setButtonText();
            });

            VideoDialogBoxEventBus.$on('onDialogClickPrev', () => {
                this.setButtonText();
            });

            this.setButtonText();
        },

        methods: {
            setButtonText(){
                this.button_text = (
                    this.type == 'story' ||
                    this.asset.class == 'exceptional' ||
                    this.asset.class == '') ? 'Request Quote' : 'Buy Now';

                if(!this.user) {
                    this.button_text = 'Register & Request Quote';
                }
            },
            createCollection() {
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
        },

        destroyed() {
        }
    }
</script>
