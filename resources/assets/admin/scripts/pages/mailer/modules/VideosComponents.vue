<template>
    <div class="mailer-videos">
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-right">
                <v-text-field
                        color="dark"
                        append-icon="search"
                        v-model="searchTerm"
                        label="Search">

                </v-text-field>
            </v-flex>
        </v-layout>

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
                <strong>Select</strong>
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
    import VideoLoopComponent from '../partials/VideoLoopComponent';

    export default {
        components: {
            VideoLoopComponent
        },

        data() {
            return {
                page: 1,
                videos: {},
                totalPage: 0,
                searchTerm:''
            }
        },

        watch: {
            page() {
                this.getVideosData(this.getQueryObject());
            },

            searchTerm(){
                this.page = 1;
                this.getVideosData(this.getQueryObject());
            }

        },

        created() {
            this.getVideosData(this.getQueryObject());
        },

        methods: {
            getVideosData(queryObject = null) {
                let url = '/api/search/videos';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if(queryObject.searchTerm != ''){
                    url += '&search='+ queryObject.searchTerm;

                }

                axios.post(url)
                    .then((videos) => {
                    this.$store.commit('setVideoData', videos.data.videos);
                    this.videos = videos.data.videos;
                    this.totalPage = this.videos.last_page;
                },
                (error) => {
                    return reject();
                });
            },

            getQueryObject(){
                return  {
                    page: this.page,
                    searchTerm: this.searchTerm
                };
            }
        },
    }
</script>
