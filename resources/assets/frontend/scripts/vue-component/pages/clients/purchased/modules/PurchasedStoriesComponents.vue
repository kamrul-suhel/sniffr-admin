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


        <div class="text-xs-center" v-if="stories.total > stories.per_page">
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
    import ClientDownloadedEventBus from '../../../../../event-bus/client-downloaded-event-bus';
    import AssetStoryDownloadedComponent from '../../partials/AssetStoryDownloadComponent'

    export default {
        components: {
            AssetStoryDownloadedComponent
        },
        data() {
            return {
                page: 1,
                stories: '',
                totalPage: 0,
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

            ClientDownloadedEventBus.$on('storiesUpdated', () => {
                setTimeout(() => {
                    this.getStoriesData();
                }, 1000)
            });
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

                this.$store.dispatch('setDownloadedStories', url)
                    .then(() => {
                        this.stories = this.$store.getters.getDownloadedStories;
                        this.totalPage = this.stories.last_page;
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