<template>
    <div class="admin-mailer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1>Your Offers</h1>
                </v-flex>

                <v-flex xs12>

                    <v-tabs
                            v-model="active"
                            dark
                            color="white"
                            slider-color="black"
                    >
                        <v-tab>
                            Videos
                        </v-tab>

                        <v-tab-item>
                            <offered-videos-component></offered-videos-component>
                        </v-tab-item>

                        <v-tab>
                            Stories
                        </v-tab>

                        <v-tab-item>
                            <offered-stories-component></offered-stories-component>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import OfferedStoriesComponent from './modules/OfferedStoriesComponents';
    import OfferedVideosComponent from './modules/OfferedVideosComponents';

    export default {
        components: {
            OfferedStoriesComponent,
            OfferedVideosComponent
        },

        data() {
            return {
                active: null,

                notSelectedError: false,
                errorMessage: '',

                indeterminate: true,
            }
        },

        created() {},

        methods: {},
    }
</script>