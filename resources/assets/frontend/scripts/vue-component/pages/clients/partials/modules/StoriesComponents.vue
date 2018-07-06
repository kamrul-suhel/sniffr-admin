<template>
    <div class="mailer-stories">
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
    </div>
</template>

<script>
    import AssetStoryOfferedComponent from '../AssetStoryOfferedComponent'

    export default {
        components: {
            AssetStoryOfferedComponent
        },

        props: ['type'],

        data() {
            return {
                page: 1,
                stories: [],
                numberOfPages: 1,
                totalStories: 0,
                storiesPerPage: 0,
                searchTerm: ''
            }
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

        created() {
            this.setData();
        },

        methods: {

            setData(){
                if(this.type === 'offered'){
                    this.getOfferedStoriesData(this.getQueryObject());
                }

                if(this.type === 'purchased'){
                    this.getPurchasedStoriesData(this.getQueryObject());
                }
            },

            getOfferedStoriesData(queryObject = null) {
                let url = '/client/stories/offered';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if (queryObject.searchTerm != '') {
                    url += '&search=' + queryObject.searchTerm;
                }

                this.$store.dispatch('fetchOfferedStories', url)
                    .then(() => {
                        let stories = this.$store.getters.getOfferedStories;

                        // IAN: Need to convert it to an array if it returns an object, for some stupid reason the pagination returns an object
                        if(typeof stories.data === 'object'){
                            stories.data = Object.values(stories.data);
                        }
                        this.stories = [];
                        stories.data.forEach((story) => {
                            story[0].story.final_price = story[0].final_price;
                            story[0].story.collection_story_id = story[0].id;
                            this.stories.push(story[0].story);
                        });

                        this.storiesPerPage = stories.per_page;
                        this.totalStories = stories.total;
                        this.numberOfPages = stories.last_page
                    })
            },

            getPurchasedStoriesData(queryObject = null) {
                let url = '/client/stories/purchased';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if (queryObject.searchTerm != '') {
                    url += '&search=' + queryObject.searchTerm;
                }

                this.$store.dispatch('fetchPurchasedStories', url)
                    .then(() => {
                        let stories = this.$store.getters.getPurchasedStories;

                        // IAN: Need to convert it to an array if it returns an object, for some stupid reason the pagination returns an object
                        if(typeof stories.data === 'object'){
                            stories.data = Object.values(stories.data);
                        }
                        this.stories = [];
                        stories.data.forEach((story) => {
                            story[0].story.final_price = story[0].final_price;
                            story[0].story.collection_story_id = story[0].id;
                            this.stories.push(story[0].story);
                        });

                        this.storiesPerPage = stories.per_page;
                        this.totalStories = stories.total;
                        this.numberOfPages = stories.last_page
                    })
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