<template>
    <v-card class="title-search">
        <v-card-title class="pb-0 search-title">
            <h3>Search</h3>
        </v-card-title>
        <v-card-text class="pt-0 search-content">
            <div class="form-group">
                <v-text-field
                        type="text"
                        name="value"
                        v-model="value"
                        color="dark"
                        label="Search by title"
                        append-icon="search"
                        aria-describedby="filterhelp"
                        @change="onSearchActive"
                        @keyup.enter="onSearchActive"
                        autocomplete="off">
                </v-text-field>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import SearchServices from '@/plugins/services/SearchServices';
    export default {
        data(){
            return {
                value: ''
            }
        },

        props: [
            'searchOption'
        ],

        created() {

        },

        methods: {
            onSearchActive() {
                this.$store.commit('setSearchByTitle', this.value);
                this.$store.commit('setSearchQuery');
                SearchServices.changeSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            }
        }
    }
</script>
