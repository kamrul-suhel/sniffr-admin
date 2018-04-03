<template>
    <v-flex xs12 sm6 md4 lg4 xl4>
        <v-card class="block">
            <v-card-media :src="video.image" height="200px">
                <router-link 
                :to="/video/+video.alpha_id" 
                class="block-thumbnail"  
                :style="{'background-image': video.image}">
                    <div class="thumbnail-overlay"></div>
                    <span class="play-button"><i class="far fa-play-circle fa-4x"></i></span>
                    <span class="label" :class="video.state == 'licensed' ? 'label-success': 'label-danger'">
                        {{video.state}}
                    </span>

                    <div class="video-duration">
                        {{video.duration | convertTime}}
                    </div>
                </router-link>
            </v-card-media>

            <v-card-title pb0>
                <img :src="video.image | checkimage"/>

                <h3 class="headline mb-0">
                    {{ video.image | checkimage }}
                    {{ video.title | readmore(10, '...') }}
                </h3>
                <div class="video-content">
                    {{ video.description | readmore(50, '...') }}
                </div>
            </v-card-title>

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

        }
    }
</script>