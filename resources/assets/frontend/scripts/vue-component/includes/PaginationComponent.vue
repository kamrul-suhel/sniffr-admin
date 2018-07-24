<template>
    <div class="text-xs-center pagination-section">
        <v-container grid-list-lg class="py-0 mb-5">
            <v-layout justify-center>
                <v-flex xs12 class="pa-0">
                    <v-pagination
                            color="black"
                            class="dark"
                            :length="pagination.last_page"
                            v-model="current_page"
                            :total-visible="total_visible"
                    ></v-pagination>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
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

                if (this.page === 'video') {
                    this.$router.push({
                        path: '/videos',
                        query: {page: this.current_page, search: this.$route.query.search}
                    });
                }

                if (this.page === 'stories') {
                    let value = this.$route.query.search;
                    let page = this.current_page;
                    this.$router.push({name: 'stories', query: {search: value, page: page}});
                }

            }
        },

        created() {
            //this.current_page = Number(this.$route.query.page);
            let device = this.$vuetify.breakpoint.name;

            if (device === 'xs') {
                this.total_visible = 5;
            }
        },

        methods: {}
    }
</script>