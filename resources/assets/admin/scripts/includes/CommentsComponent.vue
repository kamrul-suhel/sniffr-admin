<template>
    <div class="admin-comments">
        <p v-if="!comments.length">No Comments</p>

        <template v-for="(comment, index) in comments">
            <div class="comment-wrapper">
                <p v-html="comment.comment"></p>
                <div class="text-right">
                    {{ comment.user.full_name }} |
                    {{ comment.created_at | moment('from', 'now') }}
                    <button class="fa fa-trash-o" @click="deleteComment(comment.id, index)"></button>
                </div>
                <hr>
            </div>
        </template>

        <div class="panel-footer clearfix">
            <div class="form-group">
                <label for="comment">Add a comment</label>
                <textarea v-model="new_comment" class="form-control" id="comment" name="comment"></textarea>
            </div>
            <v-btn
                class="btn btn-primary pull-right"
                @click="addComment()">Add Comment</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                comments: [],
                new_comment: '',
            }
        },

        props: {
            asset: {
                type: Object,
                required: false
            }
        },

        created() {
            this.getCommentData();
        },

        methods: {
            getCommentData() {
                let url = '/admin/comments/story/'+this.asset.id;

                axios.get(url)
                    .then((response) => {
                        this.comments = response.data.comments;
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                    });
            },

            addComment(){
                let form_data = new FormData();

                form_data.append('comment', this.new_comment);
                form_data.append('asset_id', 1)
                form_data.append('asset_type', 'story');

                axios.post('/admin/comment', form_data)
                    .then(response => {
                        this.comments.push(response.data.comment);
                        this.new_comment = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            deleteComment(id, index){
                console.log(id);
                console.log(index);
                axios.delete('/admin/comment/' + id, {id: id})
                    .then(response => {
                        this.comments.splice(index, 1);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>
