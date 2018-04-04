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
                <v-layout row wrap>
                    <videoloop-component v-for="video in videos" :video="video"></videoloop-component>
                </v-layout>
            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component :pagination="paginate" :page="'video'"></pagination-component>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent'

    export default{
        components:{
            searchComponent: SearchComponent,
            videoloopComponent: VideoLoopComponent,
            paginationComponent: PaginationComponent
        },
        data(){
            return {
                data: '',
                videos: '',
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
        beforeCreate(){
        },
        created(){
            if(this.$route.query.page){
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
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then( () => {
                    this.videos = this.$store.getters.getVideoData;
                });
            }
        }
    }
</script>