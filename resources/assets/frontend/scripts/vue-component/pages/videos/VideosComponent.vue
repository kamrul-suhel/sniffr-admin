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

                <div v-if="logged_in && mailer_videos.length > 0 || recommended.length > 0">
                    <h3 class="sub-heading">Your Suggested Videos</h3>
                    <hr>
                    <p><b>We've gone ahead and procured a list of videos we think you will love!</b></p>
                    <v-card-text class="overflow-hidden" style="overflow:auto; height:352px; width:100% !important; margin: 0px; padding:0px;">
                    <v-layout align-content-center style="overflow-x:scroll;">
                        <videoloop-component v-if="mailer_videos && mailer_videos.length > 0" v-for="(mailer, index) in mailer_videos" :video="mailer" :key="mailer.alpha_id"></videoloop-component>
                            <videoloop-component v-if="recommended && recommended.length > 0" v-for="(recommend, index) in recommended" :video="recommend" :key="recommend.alpha_id"></videoloop-component>
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
        <pagination-component :pagination="paginate" :page="'video'"></pagination-component>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent';
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';
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
                recommended: '',
                mailer_videos: '',
                paginate: '',
                current_page: 0,
                logged_in : false,

            }
        },
        watch: {
            '$route'(to, from, next){
                this.current_page = to.query.page;
                this.updateVideodata();
            }
        },

        created(){
            this.logged_in = this.$store.getters.isClientLogin;

            // If client has logged in
            LoginEventBus.$on('clientLoginSuccess', () => {
                this.setAlldata();
                this.logged_in = this.$store.getters.isUserLogin;
                this.client_login = this.$store.getters.isClientLogin;
            });

            LoginEventBus.$on('logoutChangeState', () => {
                this.logged_in = false;
                this.client_login = false;
            });

            if (this.$route.query.page) {
                this.current_page = this.$route.query.page;
            }

            this.setAlldata();
        },
        methods: {
            setAlldata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                    this.paginate = this.$store.getters.getPaginateObject;
                });

                this.$store.dispatch('getRecommendedData', {page: 1}).then(() => {
                    this.recommended = this.$store.getters.getRecommendedData;
                });

                this.$store.dispatch('getMailerVideoData', {page: 1}).then(() => {
                    this.mailer_videos = this.$store.getters.getMailerVideoData;
                });
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                });

                this.$store.dispatch('getRecommendedData', {page: 1}).then(() => {
                    this.recommended = this.$store.getters.getRecommendedData;
                });

                this.$store.dispatch('getMailerVideoData', {page: 1}).then(() => {
                    this.mailer_videos = this.$store.getters.getMailerVideoData;
                });
            },
        }
    }
</script>