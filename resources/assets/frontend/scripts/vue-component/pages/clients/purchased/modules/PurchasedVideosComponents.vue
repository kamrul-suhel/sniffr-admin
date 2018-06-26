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

        <asset-video-downloaded-component
                v-for="(video, index) in videos"
                :key="index"
                :video="video"></asset-video-downloaded-component>


        <div class="text-xs-center" v-if="totalVideos > videosPerPage">
            <v-pagination
                    :length="numberOfPages"
                    v-model="page"
                    :total-visible="3"
                    dark color="black">
            </v-pagination>
        </div>
    </div>
</template>

<script>
    import AssetVideoDownloadedComponent from '../../partials/AssetVideoDownloadComponent';

    export default {
        components: {
            AssetVideoDownloadedComponent
        },

        data() {
            return {
                videos: [],
                numberOfPages: 1,
                totalVideos: 0,
                videosPerPage: 0,
                page: 1,
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
                let url = '/client/videos/purchased';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if(queryObject.searchTerm != ''){
                    url += '&search='+ queryObject.searchTerm;
                }
                axios.get(url)
                    .then((videos) => {
                        console.log(videos.data.videos);
                        videos.data.videos.data.forEach((video) => {
                            this.videos.push(video[0].video);
                        });

                        this.videosPerPage = videos.data.videos.per_page;
                        this.totalVideos = videos.data.videos.total;
                        this.numberOfPages = videos.data.videos.last_page
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