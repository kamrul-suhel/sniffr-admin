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
                :type="type"
                :index="index"
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
    import AssetVideoOfferedComponent from '../AssetVideoOfferedComponent';
    import ClientVideoOfferPurchasedEventBus from '../../../../../event-bus/client-video-offer-purchased-event-bus'

    export default {
        components: {
            AssetVideoOfferedComponent
        },

        props: ['type'],

        data() {
            return {
                page: 1,
                searchTerm: '',
            }
        },

        computed:{
            videos: {
                get() {
                    if(this.type === 'offered'){
                        return this.$store.getters.getOfferedVideos;
                    }

                    if(this.type === 'purchased'){
                        return this.$store.getters.getPurchasedVideos;
                    }
                },

                set(value){
                    console.log(value);
                }
            },

            videosPerPage(){
                return this.$store.getters.getVideoPaginateObject.per_page;
            },

            totalVideos(){
                return this.$store.getters.getVideoPaginateObject.total;
            },

            numberOfPages(){
                return this.$store.getters.getVideoPaginateObject.last_page;
            }

        },

        watch: {
            page() {
                this.setData();
            },

            searchTerm() {
                this.page = 1;
                this.setData();
            },

        },

        created() {
            this.setData();

            ClientVideoOfferPurchasedEventBus.$on("clientRemoveVideo", (videoIndex) => {
                let currentVideo = this.videos[videoIndex];
                let temp_video = [];
                currentVideo.purchased = true;
                temp_video.push(currentVideo);

                this.videos.splice(videoIndex, 1);

                this.videos.forEach((video, index) => {
                    if(videoIndex === index){
                        temp_video.push(currentVideo);
                    }

                    video.change_value = !video.change_value;

                    if (currentVideo.type === "exclusive") {
                        if (video.alpha_id === currentVideo.alpha_id) {
                            video.expired = true;
                        }
                    }

                    temp_video.push(video);
                })

                this.videos = [];
                setTimeout(() => {
                    this.videos = temp_video;
                }, 100);
            })
        },

        methods: {
            setData() {
                if (this.type === 'offered') {
                    this.getOfferedVideosData(this.getQueryObject());
                }

                if (this.type === 'purchased') {
                    this.getPurchasedVideosData(this.getQueryObject());
                }
            },

            getOfferedVideosData(queryObject = null) {
                let url = '/client/videos/offered';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if (queryObject.searchTerm != '') {
                    url += '&search=' + queryObject.searchTerm;
                }

                this.$store.dispatch('fetchOfferedVideos', url)
            },

            getPurchasedVideosData(queryObject = null) {
                let url = '/client/videos/purchased';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if (queryObject.searchTerm != '') {
                    url += '&search=' + queryObject.searchTerm;
                }

                this.$store.dispatch('fetchPurchasedVideos', url);
            },

            getQueryObject() {
                return {
                    page: this.page,
                    searchTerm: this.searchTerm
                };
            }
        },
    }
</script>