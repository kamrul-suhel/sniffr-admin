<template>
    <div class="text-xs-center pagination-section">
            <v-layout justify-center mt-4>
                <v-flex xs12>
                    <v-pagination
                            color="black"
                            class="dark"
                            :length="pagination.last_page"
                            v-model="current_page"
                            :total-visible="total_visible"
                    ></v-pagination>
                </v-flex>
            </v-layout>
    </div>
</template>

<script>
    import SearchService from '@/plugins/services/SearchServices'
    export default {
        data() {
            return {
                current_page: this.$route.query.page ? Number(this.$route.query.page): 1,
                total_visible: 10,
            }
        },

        props: [
            'pagination',
            'page'
        ],

        watch: {
            pagination() {
                this.current_page = this.pagination.current_page;
                return this.pagination;
            },

            current_page() {
                this.$vuetify.goTo('.s-pagination-goto', {duration: 1, easing: 'easeInCubic'});
                this.$store.commit('setSearchPage', this.current_page);
                SearchService.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            }
        },

        created() {
            if (this.$vuetify.breakpoint.name === 'xs') {
                this.total_visible = 5;
            }
        },

        methods: {}
    }
</script>
