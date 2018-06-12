<template>
    <div class="mailer-videos">
        <table class="table">
            <tr class="table-header">
                <th style="width:30%;">Thumbnail</th>
                <th style="width:39%;">Title / Excerpt</th>
                <th style="width:10%;">Author</th>
                <th style="width:10%;">Updated At</th>
                <th style="width:10%;">Actions</th>
            </tr>
            <video-loop-component v-for="(video, index)  in videos.data" :key="video.id" :index="index" :video="video">
            </video-loop-component>
        </table>

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