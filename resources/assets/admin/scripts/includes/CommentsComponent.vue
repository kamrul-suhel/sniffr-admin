<template>
    <div class="admin-comments">
        <p v-if="!comments.length">No Comments</p>

        <template v-for="(comment, index) in comments">
            <div class="comment-wrapper">
                <p v-html="comment.comment"></p>
                <div class="text-right">
                    {{ comment.user.full_name }} |
                    {{ comment.created_at | moment('from', 'now') }}

                    <span v-if="user.id == comment.user_id || user.role == 'admin'">
                        <v-btn
                            class="fa fa-trash-o"
                            @click="deleteComment(comment.id, index)"></v-btn>
                    </span>
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
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                comments: [],
                new_comment: '',
            }
        },

        props: {
            assetType: '',
            asset: {
                type: Object,
                required: false
            }
        },

        computed: {
            ...mapGetters({
                user: 'getUserStatus'
            })
        },

        created() {
            this.getCommentData();
        },

        methods: {
            getCommentData() {
                let url = '/admin/comments/'+this.assetType+'/'+this.asset.id;

                axios.get(url)
                    .then((response) => {
                        this.comments = response.data.comments;
                    })
                    .catch((error) => {
                        reject();
                    });
            },

            addComment(){
                let form_data = new FormData();

                form_data.append('comment', this.new_comment);
                form_data.append('asset_id', this.asset.id)
                form_data.append('asset_type', this.assetType);

                axios.post('/admin/comment', form_data)
                    .then(response => {
                        if(response.data.status == 'success') {
                            this.comments.push(response.data.comment);
                            this.new_comment = '';
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            deleteComment(id, index){
                axios.delete('/admin/comment/' + id, {id: id})
                    .then(response => {
                        if(response.data.status == 'success'){
                            this.comments.splice(index, 1);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>
