<template>
    <v-flex xs6 sm6 md12>
        <div class="thumbnail"
             :style="{backgroundImage:'url('+thumbnailImg+')'}"
             @click="onOpenDialog(asset.id)">
            <div class="video-icon"
                 v-if="asset.mime_type === 'video/mp4'">
                <v-icon dark medium>play_circle_outline</v-icon>
            </div>
        </div>
    </v-flex>
</template>

<script>
    export default {
        data() {
            return {
                thumbnailImg: '',
            }
        },

        props: {
            asset: {
                type: Object,
                required: true
            }
        },

        watch: {
        },

        created() {
            this.setImageUrl(this.asset);
        },

        methods: {
            setImageUrl(asset) {
                if (asset.mime_type === "video/mp4") {
                    this.thumbnailImg = asset.thumbnail;
                } else {
                    this.thumbnailImg = asset.url;
                }
            },

            onOpenDialog(id) {
                this.$store.commit('setStoryAssetDialogBox', {open: true, id: id});
                return;


                this.story_dialog = true;
            }
        }
    }
</script>
