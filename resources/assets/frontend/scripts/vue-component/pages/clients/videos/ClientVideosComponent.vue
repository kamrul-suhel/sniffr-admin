<template>
    <div class="client-video-mail-section" v-if="ini_state">

        <v-container grid-list-lg v-if="videos" pt-0>
            <v-layout row wrap>
                <v-flex xs12 pt-0 mb-4>
                    <div>
                        <h2 class="text-center text-uppercase">Your Videos</h2>
                    </div>
                </v-flex>
            </v-layout>

            <asset-video-download-component
                    v-for="(video, index) in videos.data"
                    :key="index"
                    :video="video"></asset-video-download-component>
        </v-container>

        <v-container grid-list-xl v-if="videos.data.length <= 0">
            <v-layout row wrap>
                <h2 class="text-xs-center no-stories mt-0">
                    Sorry, we cannot find any videos associated with your account.  Please contact <a
                        href="mailto:mel@unilad.co.uk?Subject=Enquiry" target="_top">mel@unilad.co.uk</a>
                    for more information.</h2>
            </v-layout>
        </v-container>

        <v-container grid-list-lg v-if="videos && videos.total > videos.per_page">
            <pagination-component :pagination="videos" :page="'client_videos'"></pagination-component>
        </v-container>
    </div>
</template>

<script>
    import AssetVideoDownloadComponent from '../partials/AssetVideoDownloadComponent'
    import PaginationComponent from '../../../includes/PaginationComponent'
    export default {
        components: {
            assetVideoDownloadComponent: AssetVideoDownloadComponent,
            paginationComponent: PaginationComponent
        },

        data() {
            return {
                videos: '',
                ini_state: false,
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.getClientMailVideos();

                console.log(videos);
            }
        },

        created() {
            this.getClientMailVideos();
        },

        methods: {
            getClientMailVideos(){
                var user = this.$store.getters.getUser;

                var url = this.$route.query.page;
                var mail_obj = {
                    user: user,
                    page: url
                };

                this.$store.dispatch('getClientMailVideos', mail_obj)
                    .then(() => {
                        this.videos = this.$store.getters.getClientMailVideos;
                        this.ini_state = true;
                    });
            }
        }
    }
</script>