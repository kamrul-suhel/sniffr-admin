<template>
    <div class="mailer-videos">
        <v-layout row wrap>
            <v-flex xs3>
                <strong>Thumbnail</strong>
            </v-flex>

            <v-flex xs4>
                <strong>Title / Excerpt</strong>
            </v-flex>

            <v-flex xs2>
                <strong>Author</strong>
            </v-flex>

            <v-flex xs2>
                <strong>Updated At</strong>
            </v-flex>

            <v-flex xs1>
                <strong>Actions</strong>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-divider class="header"></v-divider>
        </v-layout>

        <video-loop-component
                v-for="(video, index)  in videos.data"
                :key="video.id"
                :index="index"
                :video="video">
        </video-loop-component>

        <div class="text-xs-center">
            <v-pagination
                    :length="totalPage"
                    v-model="page"
                    :total-visible="7"
                    dark color="black"></v-pagination>
        </div>
    </div>
</template>

<script>
    import VideoLoopComponent from '../partials/VidoeLoopComponent';
    export default {
        components: {
            VideoLoopComponent
        },

        data() {
            return {
                videos: {},
                totalPage:0,
                page: 1,
            }
        },

        watch: {
            page(page) {
                this.getVideosData(page);
            }
        },

        created() {
           this.getVideosData();
        },

        methods: {
            getVideosData(page = null) {
                let url = '/admin/mailers/videos';
                if (page != null) {
                    url += '?page=' + page;
                }
                axios.get(url)
                    .then((videos) => {
                        this.videos = videos.data.videos;
                        this.totalPage = videos.data.videos.last_page;
                    });
            }
        },


    }
</script>

<style>
    .story_pic {
        display: flex;
        height: 200px;
        width: auto;
        border: none
    }
</style>