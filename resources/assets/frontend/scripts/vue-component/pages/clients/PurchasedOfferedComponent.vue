<template>
    <div class="client-offer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">{{ headingText }}</h2>
                </v-flex>

                <v-flex xs12 class="text-xs-center" v-if="totalStories <= 0 && totalVideos <= 0 && !searchVideoTerm">
                    <h2>Sorry history is empty</h2>
                </v-flex>

                <v-flex xs12 v-else>
                    <v-tabs
                            v-model="active"
                            dark
                            color="white"
                            slider-color="black">
                        <v-tab v-if="totalVideos > 0 || searchVideoTerm">
                            <v-badge right color="black">
                                <span slot="badge">{{ totalVideos }}</span>
                                Videos
                            </v-badge>
                        </v-tab>

                        <v-tab v-if="totalStories > 0 || searchStoryTerm">
                            <v-badge right color="black">
                                <span slot="badge">{{totalStories}}</span>
                                Stories
                            </v-badge>
                        </v-tab>

                        <v-tab-item v-if="totalVideos > 0 || searchVideoTerm">
                            <v-layout row wrap>
                                <v-flex xs12 class="text-xs-right">
                                    <v-text-field
                                            color="dark"
                                            append-icon="search"
                                            v-model="searchVideoTerm"
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
                                        :length="numberOfVideoPages"
                                        v-model="videoPage"
                                        :total-visible="7"
                                        dark color="black">
                                </v-pagination>
                            </div>
                        </v-tab-item>

                        <v-tab-item v-if="totalStories > 0 || searchStoryTerm">
                            <v-layout row wrap>
                                <v-flex xs12 class="text-xs-right">
                                    <v-text-field
                                            color="dark"
                                            append-icon="search"
                                            v-model="searchStoryTerm"
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
                                        :length="numberOfStoryPages"
                                        v-model="storyPage"
                                        :total-visible="7"
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

        data() {
            return {
                active: null,
                headingText:'',
                page:1,
                videoPage: 1,
                storyPage:1,
                searchTerm: '',
                searchVideoTerm:'',
                searchStoryTerm:'',
                tabItems:['Video', 'Stories']
            }
        },

        computed: {
            type: {
                get(){
                    return this.$route.query.type;
                },

                set(value){
                    return value;
                }
            },

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

            numberOfStoryPages() {
                return this.$store.getters.getStoriesPaginateObject.last_page;
            },

            totalStories() {
                return this.$store.getters.getStoriesPaginateObject.total;
            },

            videos: {
                get() {
                    if(this.type === 'offered'){
                        return this.$store.getters.getOfferedVideos;
                    }

                    if(this.type === 'purchased'){
                        return this.$store.getters.getPurchasedVideos;
                    }
                }
            },

            videosPerPage(){
                return this.$store.getters.getVideoPaginateObject.per_page;
            },

            totalVideos(){
                return this.$store.getters.getVideoPaginateObject.total;
            },

            numberOfVideoPages(){
                return this.$store.getters.getVideoPaginateObject.last_page;
            }

        },

        watch: {
            videoPage() {
                this.setData('video');
            },

            storyPage(){
                this.setData('story');
            },

            // searchTerm() {
            //     this.page = 1;
            //     this.setData();
            // },

            '$route'(to, next, previous){
                this.type = this.$route.query.type;
                this.searchVideoTerm = '';
                this.searchStoryTerm = '';
                this.setData();
            },

            searchVideoTerm(value){
                this.searchTerm = this.searchVideoTerm;
                this.page = 1;
                this.setData('video');
            },

            searchStoryTerm(){
                this.searchTerm = this.searchStoryTerm;
                this.page = 1;
                this.setData('story');
            }
        },

        created() {
            this.type = this.$route.query.type;
            this.setData();
        },

        methods: {

            setData(term = null) {
                //before set store clear all data

                if (this.type === 'offered') {
                        this.headingText = 'Your offers'
                    if(term === 'video'){
                        this.getOfferedVideosData(this.getQueryObject(term));
                        return;
                    }

                    if(term === 'story'){
                        this.getOfferedStoriesData(this.getQueryObject(term));
                        return;
                    }

                    this.$store.commit('setResetStories');
                    this.$store.commit('setResetVideos');
                    this.getOfferedVideosData(this.getQueryObject(term));
                    this.getOfferedStoriesData(this.getQueryObject(term));

                }

                if (this.type === 'purchased') {
                    this.headingText = 'Purchases'
                    if(term === 'video'){
                        this.getPurchasedVideosData(this.getQueryObject(term));
                        return;
                    }

                    if(term === 'story'){
                        this.getPurchasedStoriesData(this.getQueryObject(term));
                        return;
                    }
                    this.$store.commit('setResetStories');
                    this.$store.commit('setResetVideos');
                    this.getPurchasedVideosData(this.getQueryObject(term));
                    this.getPurchasedStoriesData(this.getQueryObject(term));
                }
            },

            getOfferedVideosData(queryObject = null) {
                let url = this.generateUrl(queryObject, 'video', 'offered');
                this.$store.dispatch('fetchOfferedVideos', url)
            },

            getPurchasedVideosData(queryObject = null) {
                let url = this.generateUrl(queryObject, 'video', 'purchased')
                this.$store.dispatch('fetchPurchasedVideos', url);
            },

            getOfferedStoriesData(queryObject = null) {

                let url = this.generateUrl(queryObject, 'story', 'offered');
                this.$store.dispatch('fetchOfferedStories', url);
            },

            getPurchasedStoriesData(queryObject = null) {
                let url = this.generateUrl(queryObject, 'story', 'purchased');
                this.$store.dispatch('fetchPurchasedStories', url);
            },

            getQueryObject(term = null) {

                if(term === 'video'){
                    return {
                        page: this.videoPage,
                        searchTerm: this.searchTerm
                    };
                }

                if(term === 'story'){
                    return {
                        page: this.storyPage,
                        searchTerm: this.searchTerm
                    };
                }


                return {
                    page: this.page,
                    searchTerm: this.searchTerm
                };
            },

            generateUrl(queryObject, type = null, term= null) {
                let url ='';
                if(type === 'video'){
                    if(term === 'offered'){
                        url = '/client/videos/offered';
                    }

                    if(term === 'purchased'){
                        url = '/client/videos/purchased';
                    }
                }

                if(type === 'story'){
                    if(term === 'offered'){
                        url = '/client/stories/offered';
                    }

                    if(term === 'purchased'){
                        url = '/client/stories/purchased';
                    }
                }

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