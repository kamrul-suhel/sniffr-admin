<template>
    <div class="search-container">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Search results</h1>
                </div>
            </div>

        </section>

        <search-component></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2 class="text--blue-grey text--lighten-1">Your search for: {{ search_title }}</h2>
                        <hr/>
                    </v-flex>
                </v-layout>

                <transition-group name="slide-fade" tag="div" class="layout row wrap" v-if="videos.length > 0">
                        <videoloop-component v-for="(video, index) in videos"            :video="video"       :key="video.alpha_id"></videoloop-component>
                </transition-group>

                <v-layout row wrap v-else align-content-center>
                    <v-flex >No video found</v-flex>
                </v-layout>

            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component :pagination="paginate" :page="'search'" v-if="paginate.last_page > 1"></pagination-component>
    </div>
</template>
<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent'

    export default {
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
                current_page: 1,
                search_title: '',
            }
        },

        watch: {
            '$route'(to, from , next){
                this.search_title = to.query.value;
                this.current_page = to.query.page;
                this.updateSearch();
            }
        },

        created(){
            this.search_title = this.$route.query.value;
            this.current_page = this.$route.query.page ? this.$route.query.page : this.current_page;
            this.updateSearch();
        },

        methods: {
            updateSearch(){
                let data = {
                    page : this.current_page,
                    value: this.search_title
                };
                this.$store.dispatch('getSearchVideoData', data).then(() => {
                    this.videos = this.$store.getters.getSearchData;
                    this.paginate = this.$store.getters.getSearchPaginateObject;
                });
            }
        }
    }
</script>