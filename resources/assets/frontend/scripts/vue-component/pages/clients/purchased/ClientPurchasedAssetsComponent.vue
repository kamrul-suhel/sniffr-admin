<template>
    <div class="admin-mailer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <h1>Purchases</h1>
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
                            <purchased-videos-component></purchased-videos-component>
                        </v-tab-item>

                        <v-tab>
                            Stories
                        </v-tab>

                        <v-tab-item>
                            <purchased-stories-component></purchased-stories-component>
                        </v-tab-item>
                    </v-tabs>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import PurchasedStoriesComponent from './modules/PurchasedStoriesComponents';
    import PurchasedVideosComponent from './modules/PurchasedVideosComponents';

    export default {
        components: {
            PurchasedStoriesComponent,
            PurchasedVideosComponent
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