<template>
    <v-layout row wrap>
        <v-flex xs12 md6 lg3 xl3>
            <v-card flat>
                <v-card-media height="200px" :src="story.thumb ? story.thumb : '/assets/frontend/images/placeholder.png'"></v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs12 md6 lg4 xl4>
            <strong>{{ story.title }}</strong>
            <p><br/>{{ story.excerpt | readmore(300, '...') }}</p>
        </v-flex>

        <v-flex xs6 md6 lg2 xl2>
            {{ story.author }}
        </v-flex>

        <v-flex xs6 md6 lg2 xl2>
            {{ story.created_at | convertDate }}
        </v-flex>

        <v-flex xs6 md6 lg1 xl1>
            <!--<input type="checkbox" v-model="selected">-->
            <v-switch
                    color="black"
                    v-model="selected"
            ></v-switch>
        </v-flex>

        <v-flex xs12>
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data(){
            return {
                selected: false,
                currStory: ''
            }
        },

        props:['story','index'],

        watch: {
          selected(selected){
              if(selected){
                  this.$store.commit('setStory', this.currStory);
              }else{
                  this.$store.commit('removeStory', this.currStory);
              }
          }
        },

        created(){
            let stories = this.$store.getters.getAllSelectedStories;
            this.currStory = this.story;

            stories.forEach((story)=>{
                if(story.id === this.story.id){
                    this.selected = true;
                }
            });
        },


        methods:{
            onStorySelect(){
                console.log(this.selected);
            }
        }
    }
</script>