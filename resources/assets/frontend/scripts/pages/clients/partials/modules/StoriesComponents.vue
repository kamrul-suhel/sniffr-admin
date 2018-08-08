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

        computed:{
            stories: {
                get(){
                    if(this.type === 'offered'){
                        return this.$store.getters.getOfferedStories;
                    }

                    if(this.type === 'purchased'){
                        return this.$store.getters.getPurchasedStories;
                    }
                }
            },

            storiesPerPage () {
                return this.$store.getters.getStoriesPaginateObject.per_page;
            },

            numberOfPages () {
                return this.$store.getters.getStoriesPaginateObject.last_page;
            },

            totalStories() {
                return this.$store.getters.getStoriesPaginateObject.total;
            }
        },

        props: ['type'],

        data() {
            return {
                page: 1,
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

            generateUrl(queryObject){
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