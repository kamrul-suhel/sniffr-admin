<template>
    <div class="client-video-download-section">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex>
                    <h2>Mail</h2>
                </v-flex>
            </v-layout>

            <asset-download-component
                    v-for="story in stories"
                    :key="story.id"
                    :story="story"></asset-download-component>

        </v-container>
    </div>
</template>

<script>
    import AssetDownloadComponent from './partials/AssetDownloadComponent'
    export default {
        components: {
            assetDownloadComponent: AssetDownloadComponent
        },

        data() {
            return {
                stories:'',
            }
        },

        created() {
            this.getMailStories();
        },

        methods: {
            getMailStories(){
                let user = this.$store.getters.getUser;
                this.$store.dispatch('getMailStories', user)
                    .then(() => {
                    this.stories = this.$store.getters.getMailStories;
                    console.log(this.stories);
                });
            }
        }
    }
</script>