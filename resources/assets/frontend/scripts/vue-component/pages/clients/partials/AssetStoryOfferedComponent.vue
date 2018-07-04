<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <div class="cdi-content" :style="{backgroundImage: 'url(' + getImage(story.thumb) + ')' }">
                <div class="cdi-label" v-if="ordered || newOrder">
                    <v-tooltip top>
                        <v-btn slot="activator" flat icon raised light color="white">
                            <v-icon size="25px">cloud_done</v-icon>
                        </v-btn>
                        <span>Downloaded</span>
                    </v-tooltip>
                </div>

                <div class="hot-story" v-if="story.flagged === 1">
                    <div class="hot-story-content">HOT</div>
                </div>


            </div>
        </v-flex>
        <v-flex xs12 sm12 md6 lg6 xl6 pl-3>
            <v-layout row wrap>
                <v-flex xs12 pb-0>
                    <h2 v-html="story.title"></h2>
                    <div class="cd-time">{{ story.date_ingested | convertDate }}</div>
                    <div v-html="story.excerpt"></div>
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
                    @click.native="onDownloadAllAssets()"
                    :loading="loading"
                    :disabled="loading"
            >
                Download Story
            </v-btn>
        </v-flex>

        <v-flex xs12 class="my-4">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import ComponentServices from '../../../../services/ComponentServices';

    export default {
        data () {
            return {
                newOrder: false,
                loading: false,
                loader: null,
                showButton: false,
                order: false,
                ordered: false,
                hide_download_button: false,
            }
        },

        props: [
            'story'
        ],

        created() {
            var user = this.$store.getters.getUser;

            var componentServices = new ComponentServices();

            this.ordered = componentServices.checkOrderExists(this.story.orders, user);
        },

        watch: {
            loader () {
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
            showDownloadButton(){
                this.showButton = !this.showButton;
            },

            onDownloadAllAssets(){
                this.loader = 'loading';
                var url = '/client/stories/' + this.story.id + '/download';
                window.location = url;
            },

            goToDetail(){
                this.$router.push({name: 'client_story_detail', params: {'alpha_id': this.story.alpha_id}})
            },

            getImage(image){
                if (!image) {
                    return '/assets/frontend/images/placeholder.png';
                }
                return image;
            },

            onBuyStory(){
                var url = '/client/orders';
                var formData = new FormData();
                formData.append('story_id', this.story.id);
                formData.append('user_agent', navigator.userAgent);
                formData.append('user_id', this.$store.getters.getUser.id);

                axios.post(url, formData).then((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>