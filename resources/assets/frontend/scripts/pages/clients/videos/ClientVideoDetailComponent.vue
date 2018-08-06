<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section">
        <!--<div id="header" class="page-videos">-->
            <!--<div class="header-content">-->
                <!--<div class="position-center">-->
                    <!--<v-container grid-list-lg>-->
                        <!--<v-layout row wrap>-->
                            <!--<v-flex xs12>-->
                                <!--<h1 class="heading">{{video.title ? video.title : ''}}</h1>-->
                            <!--</v-flex>-->
                        <!--</v-layout>-->
                    <!--</v-container>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!-- VIDEOS DETAIL SECTION -->
        <div class="videos-detail-section section-space">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn outline @click="onGoback()" class="ml-0"><v-icon>chevron_left</v-icon>Go back</v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex
                            align-content-center
                            xs12 sm12 md7 lg7 xl7>
                        <video-player :video="video"></video-player>
                    </v-flex>

                    <v-flex xs12 sm12 md5 lg5 xl5>
                        <v-layout row wrap class="video-detail-content" :class="{'pl-4' : content_padding}">
                            <v-flex xs12>
                                <h2>{{ video.title }}</h2>

                                <div class="video-title-caption">
                                    <v-layout row wrap justify-center>
                                        <v-flex xs6 v-if="video.duration != null">
                                            <v-icon small>alarm</v-icon>{{video.duration | convertTime}}
                                        </v-flex>
                                        <v-spacer></v-spacer>

                                        <v-flex xs6 class="text-xs-right" v-if="video.views">
                                            <v-icon small >remove_red_eye</v-icon> {{ video.views+1}} views
                                        </v-flex>
                                    </v-layout>
                                </div>

                                <p v-if="video.description != 'null'">{{ video.description }}</p>
                                <div class="video-detail-tags" v-if="tags.length > 0">
                                    <h3 id="tags">Tags:</h3>
                                    <ul>
                                        <li v-for="tag in tags">
                                            <router-link :to="'/videos?tag='+tag.name">
                                                #{{ tag.name }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>

                                <buy-quote-button-component
                                        :type="'video'"
                                        :asset="video"
                                ></buy-quote-button-component>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </section>
</template>

<script>
    import VideoPlayer from '../../../../../share/scripts/vue-components/VideoPlayerComponent'
    import BuyQuoteButtonComponent from "../../../vue-component/includes/BuyQuoteButtonComponent";

    import {mapGetters } from 'vuex';

    export default {
        components: {
            BuyQuoteButtonComponent,
            videoPlayer: VideoPlayer,
        },

        data() {
            return {
                content_padding:true,
            }
        },

        computed: {
            ...mapGetters({

            }),

            video: {
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
            if(breakpoint === 'sm' || breakpoint === 'xs' ){
                this.content_padding = false;
            }

            let alpha_id = this.$route.params.alpha_id;

            this.$store.commit('setCurrentVideoAlphaId', alpha_id);
            this.$store.commit('setCurrentRouteObject', this.$route);
            this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: alpha_id});


        },

        methods: {
            onGoback() {
                this.$router.go(-1);
            }
        },


    }
</script>
