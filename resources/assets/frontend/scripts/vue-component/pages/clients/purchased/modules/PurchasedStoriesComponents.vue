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

        <asset-story-downloaded-component
                v-for="(story, index) in stories.data"
                :key="index"
                :story="story"></asset-story-downloaded-component>


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
    import AssetStoryDownloadedComponent from '../../partials/AssetStoryDownloadComponent'

    export default {
        components: {
            AssetStoryDownloadedComponent
        },
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
                this.getStoriesData(this.getQueryObject());
            },

            searchTerm() {
                this.page = 1;
                this.getStoriesData(this.getQueryObject());
            }
        },

        created() {
            this.getStoriesData(this.getQueryObject());
        },

        methods: {
            getStoriesData(queryObject = null) {
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