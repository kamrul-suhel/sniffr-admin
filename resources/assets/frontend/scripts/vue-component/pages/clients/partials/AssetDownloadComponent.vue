<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <div class="cdi-content" style="background:url('https://picsum.photos/500/1300/?random')">
            </div>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6 xl6>
            <v-layout row wrap>
                <v-flex class="text-xs-left">
                    <div class="cd-type">Story</div>
                </v-flex>

                <v-spacer></v-spacer>

                <v-flex class="text-xs-right">
                    <div class="cd-time">3 month ago</div>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <h2>Is simply dummy text of the printing and ....</h2>
                    <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                    <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                    <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 sm12 md3 lg3 xl3>
            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    class="mb-3">
                View
            </v-btn>

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDownloadAllAssets()"
                    :loading="loading"
                    :disabled="loading"
            >
                Download all assets
            </v-btn>
        </v-flex>
        <v-flex xs12 class="my-4"><v-divider></v-divider></v-flex>
    </v-layout>
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

            onDownloadAllAssets(){
                this.loader = 'loading';
                console.log("Send the download all assets request ");
            }
        }
    }
</script>

<style scoped>

</style>