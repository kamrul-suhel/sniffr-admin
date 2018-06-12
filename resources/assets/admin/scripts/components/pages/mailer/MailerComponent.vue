<template>
    <div class="admin-mailer-section">
        <v-container fluid grid-list-lg>
            <v-tabs
                    v-model="active"
                    color="dark"
                    dark
                    slider-color="yellow"
            >
                <v-tab>
                    Stories
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-stories-component></mailer-stories-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab>
                    Videos
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-videos-component></mailer-videos-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-container>

    </div>
</template>

<script>
    import MailerVideosComponent from './modules/VideosComponents';
    import MailerStoriesComponent from './modules/StoriesComponents';
    export default {
        components: {
            mailerVideosComponent: MailerVideosComponent,
            mailerStoriesComponent: MailerStoriesComponent
        },

        data() {
            return {
                active: null,
            }
        },

        created() {
            console.log('asldkf');
        },

        methods: {
            next() {
                const active = parseInt(this.active)
                this.active = (active < 2 ? active + 1 : 0).toString()
            }
        },
    }
</script>

<style lang="css" scoped>
    @import"./plugins/vuetify.min.css";
</style>