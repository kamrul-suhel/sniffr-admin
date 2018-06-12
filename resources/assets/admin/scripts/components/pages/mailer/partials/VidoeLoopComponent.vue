<template>
    <tr >
        <td style="width:30%;">
            <v-card flat>
                <v-card-media height="200px" :src="video.thumb ? video.thumb : '/assets/frontend/images/placeholder.png'"></v-card-media>
            </v-card>
        </td>
        <td style="width:39%;">
            <strong>{{ video.title }}</strong>
            <p><br/>{{ video.description | readmore(300, '...') }}</p>
        </td>
        <td style="width:10%;">
            {{ video.user_id ? video.user_id : 'N/A' }}
        </td>
        <td style="width:10%;">
            {{ video.created_at }}
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

        props:['video','index'],

        watch: {
          selected(selected){
              console.log(selected);
              if(selected){
                  this.$store.commit('addVideo', this.video);
              }else{
                  this.$store.commit('removeVideo', this.video);
              }
          }
        },

        created(){
            let videos = this.$store.getters.getAllSelectedVideos;

            videos.forEach((video)=>{
                if(video.id === this.video.id){
                    this.selected = true;
                }
            });
        },


        methods:{
        }
    }
</script>