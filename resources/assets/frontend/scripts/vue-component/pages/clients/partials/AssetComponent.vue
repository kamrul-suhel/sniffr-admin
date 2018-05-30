<template>
    <v-flex xs6 sm6 md12 lg12 xl12 @click="showDownloadButton" >
        <div class="thumbnail" :style="{backgroundImage:'url('+asset.url+')'}">
            <div class="download_asset" :class="{show: showButton}">
                <!--<v-btn fab dark small color="dark"-->
                       <!--:loading="loading"-->
                       <!--:disabled="loading"-->
                       <!--@click.native="downloadAsset()">-->
                    <!--<v-icon dark>cloud_download</v-icon>-->
                <!--</v-btn>-->
            </div>
        </div>
    </v-flex>
</template>

<script>
    export default {
        data () {
            return {
                loading: false,
                loader: null,
                showButton: false,
                img: '',
            }
        },

        props: ['asset','story_id'],

        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
        },
        created() {
        },

        methods: {
            showDownloadButton(){
                this.showButton = !this.showButton;
            },

            downloadAsset(){
                this.loader = 'loading';
                this.loader = 'loading';
                var url = '/client/stories/'+this.story_id+'/download';
                window.location = url;
            }
        }
    }
</script>