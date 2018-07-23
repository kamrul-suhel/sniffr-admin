<template>
    <div class="client-offer-section">
        <!-- End refresh stories dialog box -->
        <v-container grid-list-lg class="pt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2 class="text-center text-uppercase">Your Offers</h2>
                </v-flex>

                <v-flex xs12>
                    <v-tabs
                            dark
                            color="white"
                            slider-color="black">
                        <v-tab>
                            <v-badge right color="black">
                                <span slot="badge">{{ totalVideos }}</span>
                                Videos
                            </v-badge>
                        </v-tab>

                        <v-tab-item>
                            <videos-component
                                :type="'offered'"
                            ></videos-component>
                        </v-tab-item>

                        <v-tab>
                            <v-badge right color="black">
                                <span slot="badge">{{totalStories}}</span>
                                Stories
                            </v-badge>
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

        computed:{
            initStories(){
                // return this.$store.getters.getInitStories;
            },

            initVideos(){
              return this.$store.getters.getinitVideo;
            },

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

        created() {},

        methods: {},
    }
</script>