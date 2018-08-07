<template>
    <!-- FEATURE SECTION -->
    <section class="feature-section section-space">
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12 text-center class="py-0">
                    <div class="featured-section-title">
                        <h1 class="heading">FEATURED VIDEOS</h1>
                    </div>
                </v-flex>
            </v-layout>

            <v-layout row wrap class="videos-section">
                <video-loop-component v-for="video in videos" :video="video" :key="video.id"></video-loop-component>
            </v-layout>
        </v-container>
    </section>
</template>
<script>
    import VideoLoopComponent from '../includes/VideoLoopComponent.vue';

    export default{
        data(){
            return {
                videos:''
            }
        },

        components: {

            VideoLoopComponent
        },

        methods:{
        },

        created(){
            axios.post('/search/videos', {
                'featured':'true'
            })
            .then((response) => {
                this.videos = response.data.videos.data;
            });
        }
    }
</script>
