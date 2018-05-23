<template>
    <v-flex xs6 sm4 lg4 xl3>
        <div class="thumbnail client-assets" @click="showDownloadButton" style="background:url('https://picsum.photos/500/1300/?random')">
            <div class="download_asset" :class="{show: showButton}">
                <v-btn fab dark small color="dark"
                       :loading="loading"
                       :disabled="loading"
                       @click.native="downloadAsset()">
                    <v-icon dark>cloud_download</v-icon>
                </v-btn>
            </div>
        </div>
    </v-flex>
</template>

<script>
    export default {
        data () {
            return {
                loading:false,
                loader: null,
                showButton : false
            }
        },

        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            }
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