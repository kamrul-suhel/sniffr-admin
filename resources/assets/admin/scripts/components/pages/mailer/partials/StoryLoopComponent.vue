<template>
    <tr >
        <td style="width:30%;">
            <v-card flat>
                <v-card-media height="200px" :src="story.thumb ? story.thumb : '/assets/frontend/images/placeholder.png'"></v-card-media>
            </v-card>
        </td>
        <td style="width:39%;">
            <strong>{{ story.title }}</strong>
            <p><br/>{{ story.excerpt | readmore(300, '...') }}</p>
        </td>
        <td style="width:10%;">
            {{ story.user_id ? story.user_id : 'N/A' }}
        </td>
        <td style="width:10%;">
            {{ story.created_at }}
        </td>
        <td style="width:10%;">
            <input type="checkbox" v-model="selected">
        </td>
    </tr>
</template>

<script>
    export default {
        data(){
            return {
                selected: false,
            }
        },

        props:['story','index'],

        watch: {
          selected(selected){
              if(selected){
                  this.$store.commit('setStory', this.story);
              }else{
                  this.$store.commit('removeStory', this.story);
              }
          }
        },

        created(){
            let stories = this.$store.getters.getAllSelectedStories;

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