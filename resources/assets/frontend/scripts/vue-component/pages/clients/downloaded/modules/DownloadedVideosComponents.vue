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
                v-for="(video, index) in videos.data"
                :key="index"
                :video="video"></asset-video-downloaded-component>


        <div class="text-xs-center" v-if="videos.total > videos.per_page">
            <v-pagination
                    :length="totalPage"
                    v-model="page"
                    :total-visible="7"
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
                videos: {},
                totalPage: 0,
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
                let url = '/client/videos/downloaded';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if(queryObject.searchTerm != ''){
                    url += '&search='+ queryObject.searchTerm;
                }
                axios.get(url)
                    .then((videos) => {
                        console.log(videos);
                        this.videos = videos.data.videos;
                        this.totalPage = videos.data.videos.last_page;
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