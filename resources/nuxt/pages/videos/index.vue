<template>
    <!-- VIDEOS ITEM SECTION -->
    <div class="videos-section s-pagination-goto">
        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg class="py-0">
                <v-layout row wrap>
                    <v-flex xs12 class="mb-0 pt-0">
                        <h2 class="text-center text-uppercase">All Videos</h2>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12 md3 xl2>
                        <search-component/>
                    </v-flex>

                    <v-flex xs12 md9 xl10>
                        <v-layout row wrap v-if="client_logged_in && Object.keys(mailerVideos).length > 0">
                            <v-flex xs12 class="text-center">
                                <h2 class="text-uppercase">Your Suggested Videos</h2>
                                <p class="mb-0 ">We've gone ahead and procured a list of videos we think you will love!</p>
                            </v-flex>

                            <v-flex xs12>
                                <v-layout align-content-center style="overflow-x:scroll;" class="mb-4">
                                    <video-loop-component
                                            v-for="(mailer, index) in mailerVideos"
                                            :video="mailer"
                                            :key="mailer.alpha_id"
                                            :type="'suggest'"
                                            :index="index"
                                            :width="'350px'"
                                    ></video-loop-component>
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                                <video-loop-component
                                        v-for="(video, index) in videos"
                                        :video="video"
                                        :key="video.id"
                                ></video-loop-component>
                            </v-layout>

                        <!-- Pagination -->
                        <pagination-component
                                v-if="paginate.last_page > 1"
                                :pagination="paginate"
                                :page="'video'"
                        ></pagination-component>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </div>
</template>

<script>
    import SearchComponent from '@/components/search/index';
    import VideoLoopComponent from '@/components/includes/VideoLoopComponent';
    import PaginationComponent from '@/components/includes/PaginationComponent';
    import SearchServices from '@/plugins/services/SearchServices';

    import {mapGetters} from 'vuex';

    export default {
        asyncData(){

        },

        components: {
            SearchComponent,
            VideoLoopComponent,
            PaginationComponent,
        },
        data() {
            return {
            }
        },

        computed: {
            ...mapGetters({
                client_logged_in: 'getClientLogin',
                videos: 'getVideos',
                paginate: 'getVideoPaginateObject',
                mailerVideos: 'getMailerVideoData',
            }),

        },

        head: {
          title: 'Sniffr videos'
        },

        beforeCreate(){
            SearchServices.populateSearchStore(this.$store, this.$route, this.$router);
        },


        watch: {
            '$route'(to, from, next) {
                this.setAllVideoData();
            }
        },

        created() {
            this.setAllVideoData();
        },

        methods: {
            setAllVideoData() {
                this.$store.dispatch('getVideoData', {queryUrl: this.$store.getters.getSearchQueryUrl, queryObject: this.$store.getters.getQueryObject});
            }
        }
    }
</script>
