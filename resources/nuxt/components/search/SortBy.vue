<template>
    <v-card class="mt-4 sort-search">
        <v-card-title class="search-title">
            <h3>Sort videos by</h3>
        </v-card-title>

        <v-card-text class="search-content">
            <v-layout row wrap>
                <v-flex xs12 py-0 v-for="(sort, index) in sortItems" :key="index">
                    <v-checkbox color="dark"
                                class="checkbox"
                                v-model="sortBy"
                                :label="sort.text"
                                :value="sort.value"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>

</template>

<script>
    import SearchServices from '@/plugins/services/SearchServices';
    export default {
        data(){
            return {
                sortItems:[
                    {
                        text: 'Newest',
                        value: 'newVideo'
                    },
                    {
                        text: 'Oldest',
                        value: 'newVideoLast'
                    },
                    {
                        text: 'Longest',
                        value: 'videoMaxLength'
                    },
                    {
                        text: 'Shortest',
                        value: 'videoMinLength'
                    }
                ]
            }
        },

        computed: {
            sortBy: {
                get(){
                    return this.$store.getters.getSearchSortBy;
                },

                set(sortBy){
                    this.$store.commit('setSortBy', sortBy);
                    this.$store.commit('setSearchQuery')
                    SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
                }
            }
        }
    }
</script>
