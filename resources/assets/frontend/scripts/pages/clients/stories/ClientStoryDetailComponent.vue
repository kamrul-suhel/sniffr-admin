<template>
    <div class="client-video-detail-section">
        <v-container grid-list-lg class="client-story-detail-section" pt-0>
            <v-layout row wrap v-if="story">
                <v-flex xs12 pt-0>
                    <v-btn outline @click="onGoback()" class="ml-0">
                        <v-icon>chevron_left</v-icon>
                        Go back
                    </v-btn>
                </v-flex>

                <v-flex xs12 sm12 md7 lg8 xl8>
                    <div class="story-content">
                        <v-badge right color="black" v-if="order">
                            <span slot="badge"><v-icon dark color="white">done</v-icon></span>
                            <h2 v-html="story.title"></h2>
                        </v-badge>
                        <h2 v-html="story.title" v-else></h2>

                        <div class="caption">
                            <span>Author: {{ story.author }} | </span>
                            <span>Created at: {{ dateFormater(story.date_ingested) }}</span><br/>
                            <!--<span>State: <strong>{{ story.state }}</strong> |</span>-->
                            <!--<span>Status : {{ story.status }}</span>-->
                        </div>

                        <v-divider style="margin: 15px 0"></v-divider>

                        <div v-html="story.description"></div>

                        <quote-button-component :type="'story'" :asset="story"></quote-button-component>
                    </div>
                </v-flex>

                <v-flex xs12 sm12 md5 lg4 xl4 class="client-assets">
                    <h2>Assets</h2>

                    <v-divider class="header-divider"></v-divider>

                    <v-layout row wrap>
                        <asset-component v-for="asset in story.assets"
                                         :key="asset.alpha_id"
                                         :asset="asset"
                                         :assets="story.assets"
                                         :story_id="story.alpha_id"></asset-component>
                    </v-layout>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import AssetComponent from '../../../includes/StoryAssetsComponent';
    import VideoReloadServices from '../../../services/VideoReloadServices';
    import QuoteButtonComponent from "../../../includes/BuyQuoteButtonComponent";

    import {mapGetters} from 'vuex';

    export default {
        components: {
            QuoteButtonComponent,
            assetComponent: AssetComponent
        },

        computed :{
            ...mapGetters({
                story: 'getCurrentStory',
                assets: 'getCurrentStoryAssets',
                user: 'getUserStatus'
            })
        },

        data() {
            return {
                loading: false,
                loader: null,
                order: false,
            }
        },

        created() {
            this.getStoryDetail();

            var video_reload = new VideoReloadServices();
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
            onGoback() {
                let prevRoute = this.$store.getters.getRouteUrl;
                if(prevRoute != ''){
                    this.$router.push({name : this.$store.getters.getRouteUrl});
                }else{
                    this.$router.go(-1);
                }
            },

            getStoryDetail(){
                let alpha_id = this.$route.params.alpha_id;
                this.$store.dispatch('fetchCurrentStory', alpha_id);
            },

            dateFormater(date){
                var current_date = new Date(Date.parse(date.replace('-', '/', 'g')));
                return current_date.toDateString();
            }
        }
    }
</script>
