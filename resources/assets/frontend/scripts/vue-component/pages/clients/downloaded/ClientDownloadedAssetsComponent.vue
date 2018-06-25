<template>
    <div class="admin-mailer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>

                    <v-tabs
                            v-model="active"
                            dark
                            color="white"
                            slider-color="black"
                    >
                        <v-tab>
                            Stories
                        </v-tab>

                        <v-tab-item>
                            <downloaded-stories-component></downloaded-stories-component>
                        </v-tab-item>
                        <v-tab>
                            Videos
                        </v-tab>

                        <v-tab-item>
                            <downloaded-videos-component></downloaded-videos-component>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import DownloadedStoriesComponent from './modules/DownloadedStoriesComponents';
    import DownloadedVideosComponent from './modules/DownloadedVideosComponents';
    // import MailerEventBus from '../../../event-bus/downloaded-event-bus';

    export default {
        components: {
            DownloadedStoriesComponent,
            DownloadedVideosComponent
        },

        data() {
            return {
                active: null,

                notSelectedError: false,
                errorMessage: '',

                indeterminate: true,
            }
        },

        created() {
        },

        methods: {},
    }
</script>