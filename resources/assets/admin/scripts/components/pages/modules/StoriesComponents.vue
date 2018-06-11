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
            <tr v-for="(story, index)  in stories.data" :key="story.id">
                <td>
                    <img :src="story.thumb ? story.thumb : '/assets/frontend/images/placeholder.png'" class="story_pic"/>
                </td>
                <td>
                    <strong>{{ story.title }}</strong>
                    <p><br />{{ story.excerpt | readmore(300, '...') }}</p>
                </td>
                <td>
                    {{ story.user_id ? story.user_id : 'N/A' }}
                </td>
                <td>
                    {{ story.date_created }}
                </td>
                <td>
                    <label class="btn btn-primary">
                        <input type="checkbox" value="story.id" name="stories" autocomplete="off">
                    </label>
                </td>
            </tr>
        </table>

        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                stories:{}
            }
        },

        created() {
            axios.get('/admin/stories')
                .then((stories) => {
                    console.log(stories);
                    this.stories = stories.data;
                });
        },

        methods: {

        },


    }
</script>