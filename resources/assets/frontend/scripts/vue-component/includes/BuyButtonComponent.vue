<template>
    <v-flex xs12>
        <v-layout column wrap align-end class="video-detail-sidebar">
            <div class="video-detail-social-share">
                <v-btn dark block class="dark" @click.stop="createCollection()">{{ button_text }}</v-btn>
            </div>
        </v-layout>
    </v-flex>
</template>

<script>
    import BuyDialogBoxEventBus from '../../event-bus/buy-dialog-box-event-bus';

    export default {
        components: {
        },
        data() {
            return {
                video_detail: '',
                tags: [],
                button_text: 'Buy Now',
                ready_to_show: true,
                content_padding: true,
            }
        },

        watch: {

        },

        created() {
            // IAN: Hackiest of hacky hacks
            if(this.$store.getters.getCurrentVideoForDialog){
                this.video_detail = this.$store.getters.getCurrentVideoForDialog;
            }else{
                this.video_detail = this.$store.getters.getVideoDetailData;
                this.video_detail = this.video_detail.video;
            }

            this.button_text = this.video_detail.class == 'exceptional' || this.video_detail.class == '' ? 'Request Quote' : 'Buy Now';
        },

        mounted() {
        },

        methods: {
            createCollection() {
                axios.post('/client/collections', {
                    'video_id': this.video_detail.id
                })
                .then(response => {
                    BuyDialogBoxEventBus.openBuyDialog(response.data, this.video_detail);
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
