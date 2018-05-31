<template>
    <section class="cliend-downloaded-stories">
        <v-container grid-list-xl v-if="stories == ''">
            <v-layout row wrap>
                <h2 class="text-xs-center no-stories">
                    Sorry, we cannot find any stories associated with your account.  Please contact <a
                        href="mailto:mel@unilad.co.uk?Subject=Enquiry" target="_top">mel@unilad.co.uk</a>
                    for more information.</h2>
            </v-layout>
        </v-container>

        <v-container grid-list-lg v-if="stories" pt-0>
            <v-layout row wrap>
                <v-flex xs12 pt-0 mb-4>
                    <div>
                        <h2 class="text-center text-uppercase">Downloaded Stories</h2>
                    </div>
                </v-flex>
            </v-layout>
            <!--<div v-for="items in stories">-->
            <!--<h2 class="client-title">Sent Mail: {{ items.sent_at | convertDate }}</h2>-->
            <asset-download-component
                    v-for="(story, index) in stories.data"
                    :key="index"
                    :story="story"></asset-download-component>
            <!--</div>-->


        </v-container>

        <v-container grid-list-lg v-if="stories && stories.total > stories.per_page">
            <pagination-component :pagination="stories" :page="'client_stories_download'"></pagination-component>
        </v-container>
    </section>
</template>

<script>
    import AssetDownloadComponent from './partials/AssetDownloadComponent'
    import PaginationComponent from '../../includes/PaginationComponent'
    export default {
        components: {
            assetDownloadComponent: AssetDownloadComponent,
            paginationComponent: PaginationComponent
        },

        data() {
            return {
                stories: '',
                ini_state: false,
            }
        },

        watch: {
            '$route'(to, from, next) {
                this.getMailStories();
            }
        },

        created() {
            this.getMailStories();
        },

        methods: {
            getMailStories(){
                var user = this.$store.getters.getUser;
                var url = this.$route.query.page;
                if(url == ''){
                    url = 1;
                }
                var mail_obj = {
                    user: user,
                    page: url
                };

                this.$store.dispatch('getDownloadedStories', mail_obj)
                    .then(() => {
                        this.stories = this.$store.getters.getMailStories;
                        this.ini_state = true;
                    });
            }
        }
    }
</script>