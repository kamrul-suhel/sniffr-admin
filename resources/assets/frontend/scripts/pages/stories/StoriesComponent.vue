<template>
    <div class="stories-component">
        <section class="stories-section section-space">

            <v-container grid-list-lg class="stories pt-0 pb-5"
                         v-if="client_logged_in && Object.keys(mailerStories).length > 0">
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h2 class="text-uppercase">Your Suggested Stories</h2>
                        <p>We've gone ahead and procured a list of stories we think you will love!</p>
                    </v-flex>
                </v-layout>

                <v-layout align-content-center style="overflow-x:scroll;">
                    <story-loop-component
                            v-for="(mailer) in mailerStories"
                            :story="mailer"
                            :key="mailer.alpha_id"
                    ></story-loop-component>
                </v-layout>
            </v-container>

            <v-container grid-lig-lg class="py-0">
                <v-layout row wrap class="s-pagination-goto">
                    <v-flex xs12 class="pt-0 mb-0">
                        <h2 class="text-center text-uppercase">All Stories</h2>
                    </v-flex>
                </v-layout>
            </v-container>

            <search-component
                    @searchOption="searchOption($event)"
                    v-if="stories.length > 0"></search-component>

            <v-container grid-list-lg class="stories pt-0" v-if="stories.length > 0">
                <v-layout row wrap>
                    <story-loop-component
                            v-for="story in stories"
                            :story="story"
                            :key="story.id"
                    ></story-loop-component>
                </v-layout>
            </v-container>

            <v-container grid-list-lg class="stories pt-0" v-else>
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h2>Sorry no story found</h2>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>

        <pagination-component
                :pagination="paginate"
                :page="'stories'"
                v-if="paginate.last_page > 1"
        ></pagination-component>

    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import StoryLoopComponent from './modules/StoryLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            SearchComponent,
            StoryLoopComponent,
            PaginationComponent
        },

        computed: {
            ...mapGetters({
                client_logged_in: 'getClientLogin',
                stories: 'getStories',
                paginate: 'getStoriesPaginateObject',
                mailerStories: 'getMailerStories'
            }),

        },

        data() {
            return {}
        },

        watch: {
            '$route'(to, from, next) {
                this.fetchStories(this.getQueryObject());
            }
        },

        created() {
            this.fetchStories(this.getQueryObject());
        },

        methods: {
            fetchStories(query) {
                this.$store.dispatch('fetchStories', query);
            },

            getQueryObject() {
                return {
                    page: this.$route.query.page,
                    search: this.$route.query.search
                };
            }
        },

        destroyed() {
            //reset stories store
            this.$store.commit('setResetStories');
        }
    }
</script>
