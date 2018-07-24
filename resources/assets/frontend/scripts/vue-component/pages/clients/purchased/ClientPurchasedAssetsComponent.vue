<template>
    <div class="client-purchased-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Purchases</h2>
                </v-flex>

                <v-flex xs12>

                    <v-tabs
                            v-model="active"
                            dark
                            color="white"
                            slider-color="black"
                    >
                        <v-tab v-if="totalVideos > 0">
                            <v-badge right color="black">
                                <span slot="badge">{{ totalVideos }}</span>
                                Videos
                            </v-badge>
                        </v-tab>

                        <v-tab-item v-if="totalVideos > 0">
                            <videos-component
                                :type="'purchased'"
                            ></videos-component>
                        </v-tab-item>

                        <v-tab v-if="totalStories > 0">
                            <v-badge right color="black">
                                <span slot="badge">{{ totalStories }}</span>
                                Stories
                            </v-badge>
                        </v-tab>

                        <v-tab-item v-if="totalStories > 0">
                            <stories-component
                                :type="'purchased'"
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

        computed:{
            totalStories() {
                return this.$store.getters.getTotalOfferedStories;
            },

            totalVideos(){
                return this.$store.getters.getTotalOfferedVideos;
            },

        },

        data() {
            return {
                active: null,
            }
        },

        created() {
        },

        methods: {},
    }
</script>