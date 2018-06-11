<template>
    <div class="admin-mailer-section" id="admin-mailer">

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
                <v-card flat>
                    <mailer-videos-component></mailer-videos-component>
                </v-card>
            </v-tab-item>
        </v-tabs>

    </div>
</template>

<script>
    import MailerVideosComponent from './modules/VideosComponents';
    import MailerStoriesComponent from './modules/StoriesComponents';
    import 'vuetify/dist/vuetify.min.css'
    export default {
        components: {
            mailerVideosComponent: MailerVideosComponent,
            mailerStoriesComponent: MailerStoriesComponent
        },

        data() {
            return {
                active: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        },

        created() {
        },

        methods: {
            next() {
                const active = parseInt(this.active)
                this.active = (active < 2 ? active + 1 : 0).toString()
            }
        },
    }
</script>