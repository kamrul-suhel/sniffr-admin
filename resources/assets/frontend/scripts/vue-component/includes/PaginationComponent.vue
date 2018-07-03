<template>
    <div class="text-xs-center pagination-section">
        <v-container grid-list-lg>
            <v-layout justify-center>
                <v-flex xs12>
                    <v-pagination
                            color="black"
                            class="dark"
                            :length="pagination.last_page"
                            v-model="current_page"
                            :total-visible="total_visiable"
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
                current_page: 1,
                total_visiable: 10,
            }
        },

        props:[
            'pagination',
            'page'
        ],



        watch: {
            pagination(){
                this.current_page = this.pagination.current_page;
                return this.pagination;
            },

            '$route'() {
                this.current_page = Number(this.$route.query.page);
            },

            current_page(){
                this.$vuetify.goTo('.videos-section',{ duration: 1, easing:'easeInCubic' });

                setTimeout(() => {
                    if(this.page === 'video'){
                        this.$router.push({path: '/videos', query: {page: this.current_page, search: this.$route.query.search}});
                    }

                    if(this.page === 'search'){
                        let value = this.$route.query.value;
                        let page =  this.current_page;
                        this.$router.push({name: 'videos_search', query:{value: value, page: page}});
                    }

                    if(this.page === 'tagsearch'){
                        let value = this.$route.params.value;
                        let page =  this.current_page;
                        this.$router.push({name: 'videos_tag', params:{value: value}, query:{ page: page}});
                    }

                    if(this.page === 'stories'){
                        let value = this.$route.query.search;
                        let page =  this.current_page;
                        this.$router.push({name: 'stories', query:{search: value, page: page}});
                    }

                }, 1);
            }
        },

        created(){
            //this.current_page = Number(this.$route.query.page);
            let device = this.$vuetify.breakpoint.name;

            if(device === 'xs'){
                this.total_visiable = 5;
            }
        },

        methods: {

        }
    }
</script>