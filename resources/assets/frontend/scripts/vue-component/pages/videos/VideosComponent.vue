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
    </section>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent.vue';

    export default{
        components:{
            searchComponent: SearchComponent,
            videoloopComponent: VideoLoopComponent
        },
        data(){
            return {
                data: '',
                videos: '',
            }
        },
        beforeCreate(){

        },
        created(){
            this.$store.dispatch('getVideoData').then(() => {
                this.data = this.$store.getters.getVideoData;
                this.videos = this.data.videos.data;
            });
        },
        methods: {
        }
    }
</script>