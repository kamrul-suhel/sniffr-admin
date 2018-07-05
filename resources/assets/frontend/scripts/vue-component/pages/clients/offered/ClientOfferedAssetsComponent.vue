<template>
    <div class="admin-mailer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Your Offers</h2>
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
                            <videos-component
                                    :type="'offered'"
                                ></videos-component>
                        </v-tab-item>

                        <v-tab>
                            Stories
                        </v-tab>

                        <v-tab-item>
                            <stories-component
                                :type="'offered'"
                            ></stories-component>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import StoriesComponent from '../partials/modules/StoriesComponents';
    import VideosComponent from '../partials/modules/VideosComponents';

    export default {
        components: {
            StoriesComponent,
            VideosComponent
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