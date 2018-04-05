<template>
    <div class="text-xs-center">
        <v-container grid-list-lg>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-pagination
                        class="dark"
                        :length="pagination.last_page"
                        v-model="current_page"
                        :total-visible="10"
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

            current_page(){
                if(this.page === 'video'){
                    this.$router.push({path: '/videos', query: {page: this.current_page}});
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
            }
        },

        created(){
        },

        methods: {

        }
    }
</script>