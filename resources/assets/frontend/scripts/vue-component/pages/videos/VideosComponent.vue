<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Videos</h1>
                </div>
            </div>
        </section>
        
        <search-component></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <videoloop-component v-for="video in videos" :video="video"></videoloop-component>
                </v-layout>
            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component :pagination="paginate" @changediveodata="changeVidowdata()"></pagination-component>
    </section>
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
            }
        },
        beforeCreate(){
        },
        created(){
            this.$store.dispatch('getVideoData').then(() => {
                this.videos = this.$store.getters.getVideoData;
                this.paginate = this.$store.getters.getPaginateObject;
            });
        },
        methods: {
            changeVidowdata(){
                this.videos = this.$store.getters.getVideoData;
                console.log(this.$store.getters.getVideoData);
            }
        }
    }
</script>