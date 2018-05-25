<template>
    <div class="thumbnail mb-4" @click="showDownloadButton" :style="{backgroundImage:'url('+asset.url+')'}">
        <div class="download_asset" :class="{show: showButton}">
            <v-btn fab dark small color="dark"
                   :loading="loading"
                   :disabled="loading"
                   @click.native="downloadAsset()">
                <v-icon dark>cloud_download</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loading:false,
                loader: null,
                showButton : false,
                img :'',
            }
        },

        props:['asset'],

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
                console.log("Download individual asset");
            }
        }
    }
</script>