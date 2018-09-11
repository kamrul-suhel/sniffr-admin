<template>
    <v-card class="mt-4 tags-search">
        <v-card-title class="search-title">
            <h3>Search by locations</h3>
        </v-card-title>

        <v-card-text class="search-content">
            <v-layout row wrap>
                <v-flex py-0>
                    <v-autocomplete
                            v-model="selectedLocations"
                            :items="locations"
                            :loading="isLoading"
                            @change="onSearchLocationChange"
                            :search="search"
                            color="light"
                            item-text="Description"
                            placeholder="Start typing to Search"
                            multiple
                    ></v-autocomplete>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>

</template>

<script>
    import {mapGetters} from 'vuex';
    import SearchServices from '@/plugins/services/SearchServices';

    export default {
        data() {
            return {
                isLoading: false,
                selectedLocations: [],
                search:null
            }
        },

        computed: {
            ...mapGetters({
                locations: 'getSearchAllLocations',
            })
        },

        created() {

        },

        methods: {

            onSearchLocationChange() {
                this.$store.commit('setSearchByLocation', this.selectedLocations);
                this.$store.commit('setSearchQuery');
                SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            }
        }
    }
</script>
