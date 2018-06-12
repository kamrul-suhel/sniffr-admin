<template>
    <div class="mailer-stories">
        <v-layout row wrap class="hidden-sm-and-down">
            <v-flex xs12 sm3 md3 lg3 xl3>
                <strong>Thumbnail</strong>
            </v-flex>

            <v-flex xs12 sm3 md3 lg4 xl4>
                <strong>Title / Excerpt</strong>
            </v-flex>

            <v-flex xs6 sm6 md6 lg2 xl2>
                <strong>Author</strong>
            </v-flex>

            <v-flex xs12 sm6 md6 lg2 xl2>
                <strong>Updated At</strong>
            </v-flex>

            <v-flex xs12 sm6 md6 lg1 xl1>
                <strong>Actions</strong>
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

        <div class="text-xs-center">
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

    export default {
        components: {
            StoryLoopComponent
        },
        data() {
            return {
                page: 1,
                stories: '',
                totalPage: 0,
            }
        },

        watch: {
            page(page) {
                this.getStoriesData(page);
            }
        },

        created() {
            this.getStoriesData();
        },

        methods: {
            getStoriesData(page = null) {
                let url = '/admin/stories';
                if (page != null) {
                    url += '?page=' + page;
                }

                axios.get(url)
                    .then((stories) => {
                        this.stories = stories.data.stories;
                        this.totalPage = stories.data.stories.last_page;
                    });
            }
        },


    }
</script>