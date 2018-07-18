<template>
    <div class="client-offer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Your Offers</h2>
                </v-flex>

                <v-flex xs12>
                    <v-tabs
                            dark
                            color="white"
                            slider-color="black">
                        <v-tab v-if="totalVideos">
                            <v-badge right color="black">
                                <span slot="badge">{{ totalVideos }}</span>
                                Videos
                            </v-badge>
                        </v-tab>

                        <v-tab-item>
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
                        </v-tab-item>

                        <v-tab>
                            <v-badge right color="black">
                                <span slot="badge">{{totalStories}}</span>
                                Stories
                            </v-badge>
                        </v-tab>

                        <v-tab-item>
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

                            <asset-story-offered-component
                                    v-for="(story, index) in stories"
                                    :key="index"
                                    :type="type"
                                    :story="story"></asset-story-offered-component>

                            <div class="text-xs-center" v-if="totalStories > storiesPerPage">
                                <v-pagination
                                        :length="numberOfPages"
                                        v-model="page"
                                        :total-visible="3"
                                        dark color="black">
                                </v-pagination>
                            </div>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import AssetStoryOfferedComponent from './partials/AssetStoryOfferedComponent'
    import AssetVideoOfferedComponent from './partials/AssetVideoOfferedComponent';

    export default {
        components: {
            AssetStoryOfferedComponent,
            AssetVideoOfferedComponent
        },

        computed: {
            stories: {
                get() {
                    if (this.type === 'offered') {
                        return this.$store.getters.getOfferedStories;
                    }

                    if (this.type === 'purchased') {
                        return this.$store.getters.getPurchasedStories;
                    }
                }
            },

            storiesPerPage() {
                return this.$store.getters.getStoriesPaginateObject.per_page;
            },

            numberOfPages() {
                return this.$store.getters.getStoriesPaginateObject.last_page;
            },

            totalStories() {
                return this.$store.getters.getStoriesPaginateObject.total;
            },

            totalVideos() {
                return this.$store.getters.getTotalOfferedVideos;
            },

        },

        watch: {
            page() {
                this.setData();
            },

            searchTerm() {
                this.page = 1;
                this.setData();
            }
        },

        data() {
            return {
                active: null,
                type: '',
                page: 1,
                searchTerm: ''
            }
        },

        created() {
            console.log('asldk');
            this.type = this.$route.query.type;
        },

        methods: {

            setData() {
                if (this.type === 'offered') {
                    this.getOfferedVideosData(this.getQueryObject());
                    this.getOfferedStoriesData(this.getQueryObject());
                }

                if (this.type === 'purchased') {
                    this.getPurchasedVideosData(this.getQueryObject());
                    this.getPurchasedStoriesData(this.getQueryObject());
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

            getOfferedStoriesData(queryObject = null) {

                let url = this.generateUrl(queryObject);
                this.$store.dispatch('fetchOfferedStories', url);
            },

            getPurchasedStoriesData(queryObject = null) {
                let url = this.generateUrl(queryObject);
                this.$store.dispatch('fetchPurchasedStories', url);
            },

            getQueryObject() {
                return {
                    page: this.page,
                    searchTerm: this.searchTerm
                };
            },

            generateUrl(queryObject) {
                let url = '/client/stories/offered';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if (queryObject.searchTerm != '') {
                    url += '&search=' + queryObject.searchTerm;
                }

                return url;
            }

        },
    }
</script>