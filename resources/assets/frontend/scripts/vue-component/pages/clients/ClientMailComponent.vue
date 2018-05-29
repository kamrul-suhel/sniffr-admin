<template>
    <div class="client-video-download-section">
        <v-container grid-list-lg>
            <h2 class="text-xs-center no-stories" v-if="!stories">Sorry, we cannot find any stories associated with your account.  Please contact mel@unilad.co.uk for more information.</h2>
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
                stories: '',
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
                    });
            }
        }
    }
</script>