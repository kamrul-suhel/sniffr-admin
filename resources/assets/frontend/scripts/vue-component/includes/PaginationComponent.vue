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
                switch(this.page){
                    case 'client_stories':
                        this.$router.push({name: 'client_stories', query:{ page: this.current_page}});
                        break;

                    case 'client_stories_download':
                        this.$router.push({name: 'client_downloaded_stories', query:{ page: this.current_page}});
                        break;

                    case 'client_videos':
                        this.$router.push({name: 'client_videos', query:{ page: this.current_page}});
                        break;

                    default:
                        this.$vuetify.goTo('.videos-section',{ duration: 500, easing:'easeInCubic' });
                }

                setTimeout(() => {
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



                }, 500);
            }
        },

        created(){
            this.current_page = Number(this.$route.query.page);
            let device = this.$vuetify.breakpoint.name;

            if(device === 'xs'){
                this.total_visiable = 5;
            }
        },

        methods: {

        }
    }
</script>