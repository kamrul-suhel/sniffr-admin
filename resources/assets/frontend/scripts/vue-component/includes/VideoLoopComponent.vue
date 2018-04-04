<template>
    <v-flex xs12 sm6 md4 lg4 xl4>
        <v-card class="block">
            <v-card-media :src="video.image" height="200px">
                <router-link 
                :to="{name:'videos_detail', params:{id: video.alpha_id}}"
                class="block-thumbnail"  
                :style="{'background-image': video.image}">
                    <div class="thumbnail-overlay"></div>
                    <span class="play-button"><i class="far fa-play-circle fa-4x"></i></span>
                    <span class="label" :class="video.state == 'licensed' ? 'label-success': 'label-danger'">
                        {{video.state}}
                    </span>
                    <img :src="video.image" @error="imageLoad"/>
                    <div class="video-duration">
                        {{video.duration | convertTime}}
                    </div>
                </router-link>
            </v-card-media>

            <v-card-title class="pb-0">
                <h3 class="headline mb-0">
                    {{ video.title | readmore(20, '...') }}
                </h3>
            </v-card-title>
            <v-card-text class="pt-0">
                <div class="video-content">
                    {{ video.description | readmore(100, '...') }}
                </div>
            </v-card-text>

        </v-card>
    </v-flex>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props:['video'],
        created(){
        },
        methods:{
            imageLoad(ref){
                console.log(ref);
                console.log('Not load do some action');
            }
        }
    }
</script>