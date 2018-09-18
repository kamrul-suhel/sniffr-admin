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
                                :items="miniSeconds"
                                label="Min"
                        ></v-select>
                    </v-flex>

                    <v-flex d-flex>
                        <v-select
                                color="dark"
                                v-model="selectedMaxSecond"
                                :items="maxSeconds"
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
                miniSeconds: [
                    {
                        text: 'None',
                        value: 0
                    },
                    {
                        text: '10S',
                        value: 10
                    },
                    {
                        text: '30S',
                        value: 30
                    },
                    {
                        text: '1M',
                        value: 60
                    },
                    {
                        text: '3M',
                        value: 180
                    },
                    {
                        text: '5M',
                        value: 300
                    },
                    {
                        text: '10M',
                        value: 420
                    }
                ],

                maxSeconds: []
            }
        },

        computed: {
            selectedMiniSecond: {
                get(){
                    return this.getSelectedObject(this.$store.getters.getSearchByMiniLength);
                },

                set(miniLength){
                    this.$store.commit('setSearchByMiniLength', miniLength);
                    this.$store.commit('setSearchQuery');
                    SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
                }
            },

            selectedMaxSecond: {
                get(){
                    return this.getSelectedObject(this.$store.getters.getSearchByMaxLength);
                },

                set(maxLength){
                    this.$store.commit('setSearchByMaxLength', maxLength);
                    this.$store.commit('setSearchQuery');
                    SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
                }
            }

        },

        created(){
            this.maxSeconds = this.miniSeconds;
        },

        methods: {
            getSelectedObject(value){
                let selectedLength = null;
                this.miniSeconds.forEach((item) => {
                    if(item.value == value){
                        selectedLength = item;
                    }
                });

                return selectedLength;
            }
        }

    }
</script>
