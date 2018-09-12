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
                    <v-flex xs12 class="pt-0 mb-0" style="position:relative">
                        <h2 class="text-center text-uppercase ">All Stories</h2>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg py-0>
                <v-layout row wrap>
                    <v-flex>
                        <search-title-component :cardLayout="false"/>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-lg class="stories" v-if="stories.length > 0">
                <v-layout row wrap>
                    <story-loop-component
                            v-for="story in stories"
                            :story="story"
                            :key="story.id"
                    ></story-loop-component>
                </v-layout>

                <pagination-component
                        :pagination="paginate"
                        :page="'stories'"
                        v-if="paginate.last_page > 1"
                ></pagination-component>
            </v-container>

            <v-container grid-list-lg class="stories" v-else>
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h2>Sorry no story found</h2>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>

    </div>
</template>

<script>
    import SearchTitleComponent from '@/components/search/SearchByTitleDescription';
    import StoryLoopComponent from '@/components/StoryLoopComponent';
    import PaginationComponent from '@/components/includes/PaginationComponent';
    import SearchServices from '@/plugins/services/SearchServices';
    import {mapGetters} from 'vuex';

    export default {
        components: {
            SearchTitleComponent,
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
            return {
                searchDrawer: null
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.fetchStories();
            }
        },

        beforeCreate() {
            SearchServices.populateSearchStore(this.$store, this.$route, this.$router);
        },

        created() {
            this.fetchStories();
        },

        methods: {
            fetchStories(query) {
                this.$store.dispatch('fetchStories',  {
                    queryUrl: this.$store.getters.getSearchQueryUrl,
                    queryObject: this.$store.getters.getQueryObject
                });
            }
        },

        destroyed() {
            //reset stories store
            this.$store.commit('setResetStories');
        }
    }
</script>
