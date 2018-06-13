<template>
    <div class="mailer-videos">

        <v-layout row wrap class="hidden-sm-and-down">
            <v-flex xs12 sm3 md3 lg3 xl3>
                <strong>Thumbnail</strong>
            </v-flex>

            <v-flex xs12 sm3 md3 lg4 xl4>
                <strong>Title / Excerpt</strong>
            </v-flex>

            <v-flex xs6 sm6 md6 lg2 xl2>
                <strong>Author</strong>
            </v-flex>

            <v-flex xs12 sm6 md6 lg2 xl2>
                <strong>Updated At</strong>
            </v-flex>

            <v-flex xs12 sm6 md6 lg1 xl1>
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

        <div class="text-xs-center" v-if="videos.total > videos.per_page">
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
                totalPage: 0,
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