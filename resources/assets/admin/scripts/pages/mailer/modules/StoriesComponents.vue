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

        <v-layout row wrap class="hidden-sm-and-down">
            <v-flex xs12 sm3 md4>
                <strong>Thumbnail</strong>
            </v-flex>

            <v-flex xs12 sm3 md4>
                <strong>Details</strong>
            </v-flex>

            <v-flex xs6 sm6 md1>
                <strong>Author</strong>
            </v-flex>

            <v-flex xs6 sm6 md1>
                <strong>State</strong>
            </v-flex>

            <v-flex xs12 sm6 md1>
                <strong>Updated At</strong>
            </v-flex>

            <v-flex xs12 sm6 md1>
                <strong>Select</strong>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-divider class="header"></v-divider>
        </v-layout>

        <story-loop-component
                v-for="(story, index)  in stories.data"
                :key="story.id"
                :index="index"
                :story="story"></story-loop-component>

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
    import StoryLoopComponent from '../partials/StoryLoopComponent';
    import MailerEventBus from '../../../event-bus/mailer-event-bus';

    export default {
        components: {
            StoryLoopComponent
        },
        data() {
            return {
                page: 1,
                stories: '',
                totalPage: 0,
                searchTerm:''
            }
        },

        watch: {
            page() {
                this.getStoriesData(this.getQueryObject());
            },

            searchTerm(){
                this.page = 1;
                this.getStoriesData(this.getQueryObject());
            }
        },

        created() {
            this.getStoriesData(this.getQueryObject());

            MailerEventBus.$on('storiesUpdated', () => {
                setTimeout(() => {
                    this.getStoriesData();
                }, 1000)
            });
        },

        methods: {
            getStoriesData(queryObject = {page: 1, searchTerm: ''}) {
                let url = '/api/search/stories';
                if (queryObject.page != null) {
                    url += '?page=' + queryObject.page;
                }

                if(queryObject.searchTerm != ''){
                    url += '&search='+ queryObject.searchTerm;
                }

                url += '&mailer=true';

                axios.post(url)
                    .then(response => {
                        this.$store.commit('setStories', response.data.stories);
                        this.totalPage = response.data.stories.last_page;
                        this.stories = response.data.stories;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },

            getQueryObject(){
                return  {
                    page: this.page,
                    searchTerm: this.searchTerm
                };
            }
        },
    }
</script>
