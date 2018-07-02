<template>
    <div class="stories-component">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Stories</h1>
                </div>
            </div>
        </section>

        <search-component @searchOption="searchOption($event)"></search-component>

        <section class="section-space videos-section">
            <v-container grid-list-lg class="stories">
                <v-layout row wrap>
                    <story-loop-component
                            v-for="(story, index) in stories"
                            :story="story"
                            :key="story.id"></story-loop-component>
                </v-layout>
            </v-container>

            <pagination-component :pagination="paginateObj" :page="'stories'" v-if="stories.length > paginateObj.last_page"></pagination-component>

        </section>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent'
    import StoryLoopComponent from './modules/StoryLoopComponent'
    import PaginationComponent from '../../includes/PaginationComponent'

    export default {
        components: {
            SearchComponent,
            StoryLoopComponent,
            PaginationComponent
        },

        data() {
            return {
                stories: '',
                paginateObj: '',
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.getStoriesData(this.getQueryParam());
            }
        },

        created() {
            this.getStoriesData(this.getQueryParam());
        },

        methods: {
            getStoriesData(query = {page: 1, search:''}) {
                this.$store.dispatch('getStoriesDataAsync', query)
                    .then(() => {
                        this.stories = this.$store.getters.getStoriesData;
                        this.paginateObj = this.$store.getters.getStoriesPaginateData;
                    })
            },

            getQueryParam() {
                return {
                    page: this.$route.query.page,
                    search: this.$route.query.search
                };
            }
        }
    }
</script>