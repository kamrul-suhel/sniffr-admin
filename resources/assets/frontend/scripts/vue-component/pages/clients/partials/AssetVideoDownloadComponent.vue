<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <v-card>
                <v-card-media :src="video.thumb ? video.thumb :  (video.image ? video.image : '/assets/frontend/images/placeholder.png')" height="200px" class="client-video-thumbnail">
                    <div class="cdi-label" v-if="ordered || newOrder">
                        <v-tooltip top>
                            <v-btn slot="activator" flat icon raised light color="white">
                                <v-icon size="25px">cloud_done</v-icon>
                            </v-btn>
                            <span>Downloaded</span>
                        </v-tooltip>
                    </div>
                </v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6 xl6 pl-3>
            <v-layout row wrap>
                <v-flex xs12 pb-0>
                    <h2 v-html="video.title"></h2>
                    <div class="cd-time">{{ video.updated_at | convertDate }}</div>
                    <div>{{ video.description | readmore(300, ' ...')}}</div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 sm12 md3 lg3 xl3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    @click="goToDetail()"
                    color="dark"
                    class="mb-3">
                View
            </v-btn>

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDownloadVideo()"
                    :loading="loading"
                    :disabled="loading"
            >
                {{ button_text }}
            </v-btn>
        </v-flex>

        <v-flex xs12 class="my-4">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                button_text: 'Download Video',
                newOrder: false,
                loading: false,
                loader: null,
                showButton: false,
                ordered: false,
                hide_download_button: false,
            }
        },

        props: [
            'video'
        ],

        created() {
            // IAN:  Need to check if value exists in multiu dim array
            //var user = this.$store.getters.getUser;

            // console.log('client id: '+user.client_id);
            //
            // var obj = { a: 'test1', b: 'test2' };
            // if (Object.values(obj).indexOf('test1') > -1) {
            //     console.log('has test1');
            // }
            //
            // if(this.video.orders){
            //     console.log(this.video.orders);
            // }

            // if (this.video.order && this.video.order.client_id == user.client_id) {
            //     this.ordered = true;
            //     this.button_text = 'Re-download video';
            // }
        },

        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => {
                    this[l] = false;
                    this.newOrder = true;
                }, 3000)

                this.loader = null
            }
        },

        methods: {
            showDownloadButton() {
                this.showButton = !this.showButton;
            },

            goToDetail() {
                var mailer_id = '';
                var route_name = this.$route.name;
                if (route_name == 'client_downloaded_stories') {
                    mailer_id = this.video.orders.mailer_id;
                } else {
                    mailer_id = this.video.client_mailer_id;
                }


                this.$store.commit('setClient_mailer_id', mailer_id);
                this.$router.push({name: 'client_video_detail', params: {'alpha_id': this.video.alpha_id}})
            },

            getImage(image) {
                if (!image) {
                    return '/assets/frontend/images/placeholder.png';
                }
                return image;
            },

            onDownloadVideo() {
                this.loader = 'loading';
                var url = '/client/video/'+this.video.id+'/download';
                window.location = url;
            }
        }
    }
</script>
