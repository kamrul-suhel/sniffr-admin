<template>
    <v-card class="title-search" v-if="cardLayout">
        <v-card-title class="pb-0 search-title">
            <h3>Search</h3>
        </v-card-title>
        <v-card-text class="pt-0 search-content">
            <div class="form-group">
                <v-text-field
                        v-model="title"
                        color="dark"
                        label="Search by title"
                        append-icon="search">
                </v-text-field>
            </div>
        </v-card-text>
    </v-card>

    <div class="form-group" v-else>
        <v-text-field
                v-model="title"
                color="dark"
                label="Search by title"
                append-icon="search">
        </v-text-field>
    </div>
</template>

<script>
    import SearchServices from '@/plugins/services/SearchServices';

    export default {
        data() {
            return {}
        },

        props: {
            cardLayout: {
                type: Boolean,
                required: false
            }
        },

        computed: {
            title: {
                get() {
                    return this.$store.getters.getSearchByTitle;
                },

                set(title) {
                    this.$store.commit('setSearchByTitle', title);
                    this.$store.commit('setSearchQuery');
                    SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
                }
            }
        },

        created() {

        },

        methods: {}
    }
</script>
