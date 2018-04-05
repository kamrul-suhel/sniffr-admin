<template>
    <div class="search-container">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">{{ tag_title }}</h1>
                </div>
            </div>

        </section>

        <search-component></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg>
                <v-layout row wrap v-if="videos.length > 0">
                    <videoloop-component v-for="video in videos" :video="video"></videoloop-component>
                </v-layout>

                <v-layout row wrap v-else align-content-center>
                    <v-flex >No video found</v-flex>
                </v-layout>

            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component :pagination="paginate" :page="'tagsearch'" v-if="videos.length > 0"></pagination-component>
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
                tag_title: '',
                videos: '',
                paginate: '',
                current_page: 0,
            }
        },
        watch: {
            '$route'(to, from , next){
                this.tag_title = to.params.value;
                this.current_page = to.query.page;
                this.updateSearch();
            }
        },

        created(){
            this.tag_title = this.$route.params.value;
            this.current_page = this.$route.query.page ? this.$route.query.page : this.current_page;
            this.updateSearch();
        },

        methods: {
            updateSearch(){
                let data = {
                    page : this.current_page,
                    value: this.tag_title
                };
                this.$store.dispatch('getTagSearchVideoData', data).then(() => {
                    this.videos = this.$store.getters.getTagSearchData;
                    this.paginate = this.$store.getters.getTagSearchPaginateObject;
                });
            }
        }
    }
</script>