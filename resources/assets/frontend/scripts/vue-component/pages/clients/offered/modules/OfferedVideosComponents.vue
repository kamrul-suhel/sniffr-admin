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

        <asset-video-offered-component
                v-for="(video, index) in videos"
                :key="index"
                :video="video"></asset-video-offered-component>

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
    import AssetVideoOfferedComponent from '../../partials/AssetVideoOfferedComponent';

    export default {
        components: {
            AssetVideoOfferedComponent
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
                let url = '/client/videos/offered';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if(queryObject.searchTerm != ''){
                    url += '&search='+ queryObject.searchTerm;
                }

                this.$store.dispatch('fetchPurchasedVideos', url)
                    .then(() => {
                        var videos = this.$store.getters.getPurchasedVideos;

                        // IAN: Need to convert it to an arrray if it returns an object, for some stupid reason the pagination returns an object
                        if(typeof videos.data == 'object'){
                            videos.data = Object.values(videos.data);
                        }
                        this.videos = [];
                        videos.data.forEach((video) => {
                            this.videos.push(video[0].video);
                        });

                        this.videosPerPage = videos.per_page;
                        this.totalVideos = videos.total;
                        this.numberOfPages = videos.last_page;
                    })
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