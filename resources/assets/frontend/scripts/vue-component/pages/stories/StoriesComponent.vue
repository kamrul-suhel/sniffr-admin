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

            <pagination-component :pagination="paginate" :page="'stories'" v-if="paginate.last_page > 1"></pagination-component>
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
                paginate: '',
                mailer_stories: []
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.setAllStoryData(this.getQueryObject());
            }
        },

        created() {
            this.setAllStoryData(this.getQueryObject());
        },

        methods: {
            setAllStoryData(query) {
                this.$store.dispatch('getStoryData', query).then(() => {
                    this.stories = this.$store.getters.getStoriesData;
                    this.paginate = this.$store.getters.getStoriesPaginateObject;
                    this.mailer_stories = this.$store.getters.getMailerStoriesData;
                })
            },

            getQueryObject() {
                return {
                    page: this.$route.query.page,
                    search: this.$route.query.search
                };
            }
        }
    }
</script>