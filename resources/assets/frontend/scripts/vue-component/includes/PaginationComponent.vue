<template>
    <div class="text-xs-center">
        <v-container grid-list-lg>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-pagination
                        class="dark"
                        :length="pagination.last_page"
                        v-model="page"
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
                page: 1,
                current_page: 0,
            }
        },
        props:[
            'pagination'
        ],
        watch: {
            pagination(){
                this.page = this.pagination.current_page;
                return this.pagination;
            },
            '$route'(to, from){
                this.current_page = to.query.page;
                this.updateVideodata();
            },
            page(){
                this.$router.push({path: '/videos', query: {page: this.page}});
            }
        },
        created(){
        },
        methods: {
            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then( () => {
                    this.$emit('changediveodata');
                });
            }
        }
    }
</script>