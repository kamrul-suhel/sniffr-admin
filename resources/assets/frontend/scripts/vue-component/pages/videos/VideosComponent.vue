<template>
    <!-- VIDEOS ITEM SECTION -->
    <div class="videos-section">
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
            <v-container grid-list-lg>

                <div v-if="client_logged_in && mailer_videos.length > 0">
                    <h3 class="sub-heading">Your Suggested Videos</h3>
                    <hr>
                    <p><b>We've gone ahead and procured a list of videos we think you will love!</b></p>
                    <v-card-text class="overflow-hidden" style="overflow:auto; height:352px; width:100% !important; margin: 0px; padding:0px;">
                        <v-layout align-content-center style="overflow-x:scroll;">
                            <video-loop-component
                                    v-if="mailer_videos && mailer_videos > 0"
                                    v-for="(mailer, index) in mailer_videos"
                                    :video="mailer"
                                    :key="mailer.alpha_id"
                            ></video-loop-component>
                        </v-layout>
                    </v-card-text>
                    <br>
                </div>
                <v-layout row wrap>
                    <v-flex xs12 class="px-0 mb-3">
                        <h3 class="sub-heading">All Videos</h3>
                        <hr>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <transition-group
                            name="slide-fade"
                            tag="div"
                            class="layout row wrap"
                            v-if="videos.length > 0">
                        <video-loop-component
                                v-for="(video, index) in videos"
                                :video="video"
                                :key="video.alpha_id"
                        ></video-loop-component>
                    </transition-group>
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

    export default{
        components: {
            searchComponent: SearchComponent,
            videoLoopComponent: VideoLoopComponent,
            paginationComponent: PaginationComponent,
        },
        data(){
            return {
                data: '',
                videos: [],
                mailer_videos: [],
                paginate: '',
                current_page: 1,
                logged_in : false,
                client_logged_in : false
            }
        },
        watch: {
            '$route'(to, from, next){
                this.current_page = to.query.page;
                this.setAlldata(this.getQueryObject());
            }
        },

        created(){
            this.client_logged_in = this.$store.getters.isClientLogin;

            // If client has logged in
            LoginEventBus.$on('loginSuccess', () => {
                this.logged_in = this.$store.getters.isUserLogin;
                this.client_logged_in = this.$store.getters.isClientLogin;
                this.setAlldata(this.getQueryObject());
            });

            LoginEventBus.$on('logoutChangeState', () => {
                this.logged_in = false;
                this.client_logged_in = false;
            });

            if (this.$route.query.page) {
                this.current_page = this.$route.query.page;
            }

            this.setAlldata(this.getQueryObject());
        },

        methods: {
            setAlldata(query){
                this.$store.dispatch('getVideoData', query).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                    this.paginate = this.$store.getters.getPaginateObject;
                    this.mailer_videos = this.$store.getters.getMailerVideoData;
                });
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                });
            },

            getQueryObject(){
                let query = {
                    page: this.current_page? this.current_page : 1,
                };

                if(this.$route.query.search && this.$route.query.search != ''){
                    query.search = this.$route.query.search;
                }

                if(this.$route.query.tag && this.$route.query.tag != ''){
                    query.tag = this.$route.query.tag;
                }

                return query;
            }
        }
    }
</script>