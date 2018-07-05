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

        <section class="stories-section section-space">
            <v-container grid-list-lg class="stories">
                <div v-if="client_logged_in && mailer_stories.length > 0">
                    <h3 class="sub-heading">Your Suggested Stories</h3>
                    <hr>
                    <p><b>We've gone ahead and procured a list of stories we think you will love!</b></p>
                    <v-card-text class="overflow-hidden" style="overflow:auto; width:100% !important; margin: 0px; padding:0px;">
                        <v-layout align-content-center style="overflow-x:scroll;">
                            <story-loop-component
                                    v-for="mailer in mailer_stories"
                                    :story="mailer"
                                    :key="mailer.alpha_id"
                            ></story-loop-component>
                        </v-layout>
                    </v-card-text>
                    <br>
                </div>

                <v-layout row wrap>
                    <v-flex xs12 class="px-0 mb-3">
                        <h3 class="sub-heading">All Videos</h3>
                        <hr>
                    </v-flex>
                </v-layout>

                <v-layout row wrap>
                    <story-loop-component
                            v-for="story in stories"
                            :story="story"
                            :key="story.id"></story-loop-component>
                </v-layout>
            </v-container>

            <pagination-component :pagination="paginate" :page="'stories'" v-if="paginate.last_page > 1"></pagination-component>
        </section>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import StoryLoopComponent from './modules/StoryLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent';
    import LoginEventBus from '../../../event-bus/login-event-bus';

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
                mailer_stories: [],
                logged_in : false,
                client_logged_in : false
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.setAllStoryData(this.getQueryObject());
            }
        },

        created() {
            this.client_logged_in = this.$store.getters.isClientLogin;

            // If client has logged in
            LoginEventBus.$on('loginSuccess', () => {
                this.logged_in = this.$store.getters.isUserLogin;
                this.client_logged_in = this.$store.getters.isClientLogin;

                this.setAllStoryData(this.getQueryObject());
            });

            LoginEventBus.$on('logoutChangeState', () => {
                this.logged_in = false;
                this.client_logged_in = false;
            });

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