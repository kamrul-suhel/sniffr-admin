<template>
    <div class="mailer-stories">
        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th style="width: 25%">Thumbnail</th>
                <th style="width: 30%">Title / Excerpt</th>
                <th>Author</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            <story-loop-component v-for="(story, index)  in stories.data" :key="story.id" :index="index"
                                  :story="story"></story-loop-component>

        </table>

        <div class="text-xs-center">
            <v-pagination
                    :length="totalPage"
                    v-model="page"
                    :total-visible="7"
                    dark color="black"></v-pagination>
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
                stories: {},
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