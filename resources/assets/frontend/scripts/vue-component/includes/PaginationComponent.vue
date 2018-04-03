<template>
    <div class="text-xs-center">
        <v-container>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-card>
                        <v-card-text>
                            <v-pagination
                                class="dark"
                                :length="pagination.last_page" 
                                v-model="page" 
                                :total-visible="10"
                                ></v-pagination>
                        </v-card-text>
                    </v-card>
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