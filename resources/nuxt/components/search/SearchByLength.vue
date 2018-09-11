<template>
    <div class="videos-filter-form mt-4 length-search">
        <v-card>
            <v-card-title class="search-title">
                <h3>Search by video length</h3>
            </v-card-title>
            <v-card-text class="search-content">
                <v-layout row wrap>
                    <v-flex d-flex>
                        <v-select
                                v-model="selectedMiniSecond"
                                color="dark"
                                @change="onMiniSecondChange"
                                :items="miniSeconds"
                                label="Min"
                        ></v-select>
                    </v-flex>

                    <v-flex d-flex>
                        <v-select
                                color="dark"
                                v-model="selectedMaxSecond"
                                :items="maxSeconds"
                                @change="onMaxSecondChange"
                                label="Max"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import SearchServices from '@/plugins/services/SearchServices';
    export default {
        data(){
            return {
                selectedMiniSecond: {},
                miniSeconds: [
                    {
                        text: 'None',
                        value: 0
                    },
                    {
                        text: '10 Seconds',
                        value: 10
                    },
                    {
                        text: '15 Seconds',
                        value: 15
                    },
                    {
                        text: '30 Seconds',
                        value: 30
                    },
                    {
                        text: '1 Minute',
                        value: 60
                    },
                    {
                        text: '1.5 Minute',
                        value: 90
                    },
                    {
                        text: '2 Minutes',
                        value: 120
                    },
                    {
                        text: '3 Minutes',
                        value: 180
                    },
                    {
                        text: '4 Minutes',
                        value: 240
                    },
                    {
                        text: '5 Minutes',
                        value: 300
                    },
                    {
                        text: '6 Minutes',
                        value: 360
                    },
                    {
                        text: '7 Minutes',
                        value: 420
                    }
                ],

                maxSeconds: [],
                selectedMaxSecond: {},
            }
        },

        created(){
            this.maxSeconds = this.miniSeconds;
        },

        methods: {
            onMiniSecondChange(){
                this.$store.commit('setSearchByMiniLength', this.selectedMiniSecond);
                this.$store.commit('setSearchQuery');
                SearchServices.changeSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            },

            onMaxSecondChange(){
                this.$store.commit('setSearchByMaxLength', this.selectedMaxSecond);
                this.$store.commit('setSearchQuery');
                SearchServices.changeSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            }
        }

    }
</script>
