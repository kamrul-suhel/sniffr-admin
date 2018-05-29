<template>
    <div class="client-mail-section" v-if="ini_state">
        <v-container grid-list-lg v-if="stories">
            <h2 class="text-xs-center no-stories" v-if="!stories">Sorry, we cannot find any stories associated with your account.  Please contact <a href="mailto:mel@unilad.co.uk?Subject=Enquiry" target="_top">mel@unilad.co.uk</a> for more information.</h2>
            <div v-for="items in stories">
                <!--<h2 class="client-title">Sent Mail: {{ items.sent_at | convertDate }}</h2>-->
                <asset-download-component
                        v-for="story in items.stories"
                        :key="story.id"
                        :story="story"></asset-download-component>
            </div>


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
                ini_state: false,
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
                        this.ini_state = true;
                    });
            }
        }
    }
</script>