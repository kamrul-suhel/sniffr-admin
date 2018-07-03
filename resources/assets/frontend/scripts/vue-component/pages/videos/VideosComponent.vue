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

                <div v-if="client_logged_in && mailer_videos.length">
                    <h3 class="sub-heading">Your Suggested Videos</h3>
                    <hr>
                    <p><b>We've gone ahead and procured a list of videos we think you will love!</b></p>
                    <v-card-text class="overflow-hidden" style="overflow:auto; height:352px; width:100% !important; margin: 0px; padding:0px;">
                        <v-layout align-content-center style="overflow-x:scroll;">
                            <videoloop-component v-if="mailer_videos && mailer_videos.length > 0" v-for="(mailer, index) in mailer_videos" :video="mailer" :key="mailer.alpha_id"></videoloop-component>
                        </v-layout>
                    </v-card-text>
                    <br>
                </div>

                <h3 class="sub-heading">All Videos</h3>
                <hr>
                <transition-group name="slide-fade" tag="div" class="layout row wrap" v-if="videos.length > 0">
                    <videoloop-component v-for="(video, index) in videos" :video="video" :key="video.alpha_id"></videoloop-component>
                </transition-group>
            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component
                :pagination="paginate"
                :page="'video'"
        ></pagination-component>
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
            videoloopComponent: VideoLoopComponent,
            paginationComponent: PaginationComponent,
        },
        data(){
            return {
                data: '',
                videos: '',
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
                this.setAllData();
            }
        },

        created(){
            this.client_logged_in = this.$store.getters.isClientLogin;

            // If client has logged in
            LoginEventBus.$on('loginSuccess', () => {
                this.logged_in = this.$store.getters.isUserLogin;
                this.client_logged_in = this.$store.getters.isClientLogin;
                this.setAlldata();
            });

            LoginEventBus.$on('logoutChangeState', () => {
                this.logged_in = false;
                this.client_logged_in = false;
            });

            if (this.$route.query.page) {
                this.current_page = this.$route.query.page;
            }
            this.setAlldata();

            this.setAllData();
        },

        methods: {
            setAlldata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                    this.paginate = this.$store.getters.getPaginateObject;
                });

                if(this.client_logged_in){
                    this.$store.dispatch('getMailerVideoData', {page: this.current_page}).then(() => {
                        this.mailer_videos = this.$store.getters.getMailerVideoData;
                    });
                }
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                });

                if(this.client_logged_in){
                    this.$store.dispatch('getMailerVideoData', {page: this.current_page}).then(() => {
                        this.mailer_videos = this.$store.getters.getMailerVideoData;
                    });
                }

                    //getting the recommended data
                    this.recommended = this.$store.getters.getRecommendedData;
                });
            },

            getQueryObject(){
                let query = {
                    page: this.current_page,
                };

                if(this.$route.query.search && this.$route.query.search != ''){
                    query.search = this.$route.query.search;
                }

                return query;
            }
        }
    }
</script>