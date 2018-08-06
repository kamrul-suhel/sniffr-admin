<template>
    <div class="video-dialog-content">
        <v-layout row wrap v-if="video_detail">

            <v-flex xs12 sm12 md7 lg7 xl7>
                <video-player :video="video_detail"></video-player>
            </v-flex>

            <v-flex xs12 sm12 md5 lg5 xl5 :class="{'pl-4' : content_padding, 'pt-4': !content_padding}">
                <v-layout row wrap class="video-detail-content">
                    <v-flex xs12>
                        <div clas="video-title">
                            <h2>{{ video_detail.title }}</h2>
                            <div class="video-title-caption">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6 v-if="this.video_detail.duration != null">
                                        <v-icon small>alarm</v-icon>
                                        {{video_detail.duration | convertTime}}
                                    </v-flex>
                                    <v-spacer></v-spacer>

                                    <v-flex xs6 class="text-xs-right" v-if="video_detail.views">
                                        <v-icon small>remove_red_eye</v-icon>
                                        {{ video_detail.views + 1}} views
                                    </v-flex>
                                </v-layout>
                            </div>
                        </div>

                        <div v-if="video_detail.description !== 'null'" class="content-description">
                            <p>{{ video_detail.description | readmore(300, '...')}}</p>
                        </div>

                        <div class="read-more text-xs-right" v-if="!isOfferedPage">
                            <a @click.stop="goToDetail()">
                                <v-icon small>keyboard_arrow_right</v-icon>
                                Read more</a>
                        </div>

                        <div class="video-detail-tags" v-if="tags.length > 0">
                            <h3 id="tags">Tags:</h3>
                            <ul>
                                <li v-for="tag in video_detail.tags">
                                    <a @click.stop="goToTagSearch(tag)">
                                        #{{ tag.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </v-flex>

                    <v-flex xs12 v-if="!isOfferedPage">
                        <buy-quote-button-component
                                :type="'video'"
                                :asset="video_detail"
                        ></buy-quote-button-component>
                    </v-flex>

                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import VideoPlayer from '../../../../share/scripts/vue-components/VideoPlayerComponent';
    import BuyQuoteButtonComponent from "../../vue-component/includes/BuyQuoteButtonComponent";
    import {mapGetters} from 'vuex';
    export default {
        components: {
            BuyQuoteButtonComponent,
            videoPlayer: VideoPlayer,
        },
        data() {
            return {
                content_padding: true,
                canBuy:false,
                isPurchasedPage: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'getUserStatus',
                isOfferedPage: 'getOsOfferedPage'
            }),

            video_detail: {
                get(){
                    return this.$store.getters.getCurrentVideo;
                }
            },

            tags(){
                return this.$store.getters.getCurrentVideoTags;
            }
        },

        created() {

            let breakpoint = this.$vuetify.breakpoint.name;
            if (breakpoint === 'sm' || breakpoint === 'xs') {
                this.content_padding = false;
            }
        },

        methods: {
            getVideoData(alpha_id) {
                this.$store.commit('setRouteObject', this.$route);

                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: alpha_id});
            },

            goToTagSearch(tag) {
                this.$store.commit('setVideoDialogBox', false);
                this.$router.push({name: 'videos', query:{page: 1, search: tag.name}});
            },

            goToDetail() {
                this.$store.commit('setVideoDialogBox', false);
                setTimeout(()=> {
                    this.$router.push({name: 'videos_detail', params:{'alpha_id': this.video_detail.alpha_id}});
                }, 500)
            }
        }
    }
</script>
