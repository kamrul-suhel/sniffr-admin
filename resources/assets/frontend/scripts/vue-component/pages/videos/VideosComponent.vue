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

                Your Recommended Videos
                <hr>
                <transition-group name="slide-fade" tag="div" class="layout row wrap" v-if="recommended.length > 0">
                    <videoloop-component v-for="(recommend, index) in recommended" :video="recommend" :key="recommend.alpha_id"></videoloop-component>
                </transition-group>

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

    export default{
        components: {
            searchComponent: SearchComponent,
            videoloopComponent: VideoLoopComponent,
            paginationComponent: PaginationComponent
        },
        data(){
            return {
                data: '',
                videos: '',
                recommended: '',
                paginate: '',
                current_page: 0,

            }
        },
        watch: {
            '$route'(to, from, next){
                this.current_page = to.query.page;
                this.updateVideodata();
            }
        },

        created(){
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
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                });

                this.$store.dispatch('getRecommendedData', {page: this.current_page}).then(() => {
                    this.recommended = this.$store.getters.getRecommendedData;
                });
            },
        }
    }
</script>