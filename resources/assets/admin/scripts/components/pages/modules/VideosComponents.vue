<template>
    <div class="mailer-videos">
        <table class="table table-striped pages-table">
            <tr class="table-header">
                <th style="width: 25%">Thumbnail</th>
                <th style="width: 30%">Title / Excerpt</th>
                <th>Author</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(video, index)  in videos.data" :key="video.id">
                <td>
                    <img :src="video.thumb ? video.thumb : '/assets/frontend/images/placeholder.png'" class="story_pic"/>
                </td>
                <td>
                    <strong>{{ video.title }}</strong>
                    <p><br />{{ video.description | readmore(300, '...') }}</p>
                </td>
                <td>
                    {{ video.user_id ? video.user_id : 'N/A' }}
                </td>
                <td>
                    {{ video.date_created }}
                </td>
                <td>
                    <label class="btn btn-primary">
                        <input type="checkbox" value="video.id" name="videos" autocomplete="off">
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
                videos: {}
            }
        },

        created() {
            axios.get('/admin/mailers/videos')
                .then((videos) => {
                    this.videos = videos.data;
                    console.log(this.videos);
                });
        },

        methods: {

        },


    }
</script>

<style>
    .story_pic {
        display: flex;
        height: 200px;
        width: auto;
        border: none
    }
</style>