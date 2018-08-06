<template>
    <!-- VIDEOS ITEM SECTION -->
    <div class="videos-section s-pagination-goto">
        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg
                         class="pt-0 pb-5"
                         v-if="client_logged_in && Object.keys(mailer_videos).length > 0">
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h2 class="text-uppercase">Your Suggested Videos</h2>
                        <p class="mb-0 ">We've gone ahead and procured a list of videos we think you will love!</p>
                    </v-flex>

                    <v-flex xs12>
                        <v-layout align-content-center style="overflow-x:scroll;" class="mb-4">
                            <video-loop-component
                                    v-for="(mailer, index) in mailer_videos"
                                    :video="mailer"
                                    :key="mailer.alpha_id"
                                    :type="'suggest'"
                                    :index="index"
                                    :width="'350px'"
                            ></video-loop-component>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg class="py-0">
                <v-layout row wrap>
                    <v-flex xs12 class="mb-0 pt-0">
                        <h2 class="text-center text-uppercase">All Videos</h2>
                    </v-flex>
                </v-layout>
            </v-container>

            <search-component @searchOption="searchOption($event)"></search-component>

            <v-container grid-list-lg class="py-0">
                <v-layout row wrap>
                    <video-loop-component
                            v-for="(video, index) in videos"
                            :video="video"
                            :key="video.id"
                    ></video-loop-component>
                </v-layout>

            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component
                v-if="paginate.last_page > 1"
                :pagination="paginate"
                :page="'video'"
        ></pagination-component>
    </div>
</template>

<script>
    import SearchComponent from '../../vue-component/includes/SearchComponent';
    import VideoLoopComponent from '../../vue-component/includes/VideoLoopComponent';
    import PaginationComponent from '../../vue-component/includes/PaginationComponent';

    import {mapGetters} from 'vuex';

    export default {
        components: {
            SearchComponent,
            VideoLoopComponent,
            PaginationComponent,
        },
        data() {
            return {
                data: '',
                logged_in: false,
            }
        },

        computed: {
            ...mapGetters({
                client_logged_in: 'getClientLogin',
                videos: 'getVideos',
                paginate: 'getVideoPaginateObject',
                mailer_videos: 'getMailerVideoData',
            }),

        },

        watch: {
            '$route'(to, from, next) {
                this.setAllVideoData(this.getQueryObject());
            }
        },

        created() {
            this.setAllVideoData(this.getQueryObject());
        },

        methods: {
            setAllVideoData(query) {
                this.$store.dispatch('getVideoData', query);
            },

            getQueryObject() {
                let query = {
                    page: this.$route.query.page ? this.$route.query.page : '',
                };

                if (this.$route.query.search && this.$route.query.search !== '') {
                    query.search = this.$route.query.search;
                }

                if (this.$route.query.tag && this.$route.query.tag !== '') {
                    query.tag = this.$route.query.tag;
                }

                return query;
            }
        }
    }
</script>
