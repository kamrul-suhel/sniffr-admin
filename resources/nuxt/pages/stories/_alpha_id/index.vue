<template>
    <section class="client-story-detail-section section-space">
        <v-container grid-list-lg class="py-0" v-if="story">
            <v-layout row wrap >
                <v-flex xs12 class="pt-0">
                    <v-btn
                            outline @click="onGoback()"
                            class="ml-0 mt-0"
                    ><v-icon>chevron_left</v-icon>Go back</v-btn>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 sm12 md8 lg8 xl8>
                    <div class="story-content">
                        <v-badge right color="black" v-if="order">
                            <span slot="badge"><v-icon dark color="white">done</v-icon></span>
                            <h2 v-html="story.title"></h2>
                        </v-badge>

                        <h2 v-html="story.title" v-else></h2>

                        <div class="caption">
                            <span>Author: {{ story.author }} | </span>
                            <span>Created at: {{ story.date_ingested | convertDate }}</span><br/>
                            <!--<span>State: <strong>{{ story.state }}</strong> |</span>-->
                            <!--<span>Status : {{ story.status }}</span>-->
                        </div>

                        <!--<v-divider style="margin: 15px 0"></v-divider>-->

                        <div v-html="story.description"></div>

                        <buy-quote-button-component
                                :type="'story'"
                                :asset="story">
                        </buy-quote-button-component>
                    </div>
                </v-flex>

                <v-flex xs12 sm12 md4 lg4 xl4 class="client-assets">
                    <h2>Assets</h2>

                    <v-divider style="margin-bottom:20px;"></v-divider>

                    <v-layout row wrap>
                        <asset-component v-if="assets"
                                         v-for="asset in assets"
                                         :key="asset.id"
                                         :asset="asset"
                                         :assets="assets"
                                         :story_id="story.alpha_id"
                        ></asset-component>

                        <v-flex xs12 v-else>
                            <h2>Sorry no assets with this story</h2>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
    import AssetComponent from '@/components/includes/StoryAssetsComponent';
    import VideoReloadServices from '@/plugins/services/VideoReloadServices';
    import BuyQuoteButtonComponent from "@/components/includes/BuyQuoteButtonComponent";

    import {mapGetters} from 'vuex';

    export default {
        components: {
            BuyQuoteButtonComponent,
            assetComponent: AssetComponent
        },

        computed:{
            ...mapGetters({
                story: 'getCurrentStory',
                assets: 'getCurrentStoryAssets'
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
            video_reload.reloadAll();
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
            }
        }
    }
</script>
