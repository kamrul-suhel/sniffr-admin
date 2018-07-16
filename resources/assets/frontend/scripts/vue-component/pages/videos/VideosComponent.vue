<template>
    <!-- VIDEOS ITEM SECTION -->
    <div class="videos-section s-pagination-goto">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Videos</h1>
                </div>
            </div>
        </section>

        <search-component @searchOption="searchOption($event)"></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg class="py-0">
                <v-layout
                        row
                        wrap
                        v-if="client_logged_in && Object.keys(mailer_videos).length > 0">
                    <v-flex xs12>
                        <h3 class="sub-heading">Your Suggested Videos</h3>
                        <hr>
                        <p><b>We've gone ahead and procured a list of videos we think you will love!</b></p>
                    </v-flex>

                    <v-flex xs12>
                            <div style="overflow-x:scroll; display:flex">
                                <video-loop-component
                                        v-for="(mailer, index) in mailer_videos"
                                        :video="mailer"
                                        :key="mailer.id"
                                        :type="'suggest'"
                                ></video-loop-component>
                            </div>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <v-flex xs12 class="mb-3 pt-0">
                        <h3 class="sub-heading">All Videos</h3>
                        <hr>
                    </v-flex>
                </v-layout>

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
        <pagination-component v-if="paginate.last_page > 1" :pagination="paginate" :page="'video'"></pagination-component>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent';
    import LoginEventBus from '../../../event-bus/login-event-bus';

    import { mapGetters } from 'vuex';

    export default{
        components: {
            SearchComponent,
            VideoLoopComponent,
            PaginationComponent,
        },
        data(){
            return {
                data: '',
                current_page: 1,
                logged_in : false,
                client_logged_in : false
            }
        },

        computed: {
            ...mapGetters({
                videos : 'getVideoData',
                paginate: 'getVideoPaginateObject',
                mailer_videos: 'getMailerVideoData'
            })
        },

        watch: {
            '$route'(to, from, next){
                this.current_page = to.query.page;
                this.setAllVideoData(this.getQueryObject());
            }
        },

        created(){
            this.client_logged_in = this.$store.getters.isClientLogin;

            // If client has logged in
            LoginEventBus.$on('loginSuccess', () => {
                this.logged_in = this.$store.getters.isUserLogin;
                this.client_logged_in = this.$store.getters.isClientLogin;

                this.setAllVideoData(this.getQueryObject());
            });

            LoginEventBus.$on('logoutChangeState', () => {
                this.logged_in = false;
                this.client_logged_in = false;
            });

            if (this.$route.query.page) {
                this.current_page = this.$route.query.page;
            }

            this.setAllVideoData(this.getQueryObject());

        },

        methods: {
            setAllVideoData(query){
                this.$store.dispatch('getVideoData', query);
            },

            getQueryObject(){
                let query = {
                    page: this.current_page? this.current_page : 1,
                };

                if(this.$route.query.search && this.$route.query.search !== ''){
                    query.search = this.$route.query.search;
                }

                if(this.$route.query.tag && this.$route.query.tag !== ''){
                    query.tag = this.$route.query.tag;
                }

                return query;
            }
        }
    }
</script>