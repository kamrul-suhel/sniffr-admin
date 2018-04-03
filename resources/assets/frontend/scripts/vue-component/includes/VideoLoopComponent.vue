<template>
    <v-flex xs12 sm6 md4 lg4 xl4>
        <v-card class="block">
            <v-card-media :src="video.image" height="200px">
                <router-link :to="/video/+video.alpha_id" class="block-thumbnail"  :style="{'background-image': video.image}">
                    <div class="thumbnail-overlay"></div>
                    <span class="play-button"><i class="far fa-play-circle fa-4x"></i></span>
                    <span class="label" :class="video.state == 'licensed' ? 'label-success': 'label-danger'">
                        {{video.state}}
                    </span>

                    <div class="video-duration">
                        {{video.duration}}
                    </div>
                </router-link>
            </v-card-media>

            <v-card-title pb0>
                <h3 class="headline mb-0">
                    {{ video.title }}
                </h3>
                <div class="video-content">
                    {{ video.description }}
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