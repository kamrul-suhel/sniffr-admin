<template>
    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
        <v-layout row wrap>
            <v-flex xs5>
                <v-card height="100%">
                    <v-card-media :src="story.thumb" height="100%"/>
                </v-card>
            </v-flex>

            <v-flex xs7>
                <h2 v-html="getFilterText(story.title, 50)"></h2>
                <div v-html="getFilterText(story.description, 100)" class="description"></div>
                <v-layout row wrap align-end>
                    <v-flex xs6>
                        <v-btn dark color="dark" block class="mb-0">Request Quote</v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn dark color="dark" block class="mb-0" @click="onStoryDetail">View</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    export default  {
        data(){
            return {
            }
        },

        props:['story'],

        created(){
        },

        methods:{
            getFilterText(text, length){
                return text.substring(0, length) + '...';
            },

            onStoryDetail(){
                this.$router.push({name: 'client_story_detail', params: {'alpha_id': this.story.alpha_id}})
            }
        }
    }
</script>