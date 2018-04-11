<template>
    <v-flex xs12 sm6 md4 lg4 xl4>
        <v-card class="block">
            <v-card-media height="200px"
                :src="video.image.includes('instagram.com') ? getInstagramImage(video) : video.image">
                <router-link 
                :to="{name:'videos_detail', params:{id: video.alpha_id}}"
                class="block-thumbnail"  
                >
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
                video_image: '/assets/img/default.jpg'
            }
        },
        props:['video'],
        created(){
        },
        methods:{
            defaultImage(){
                this.video_image = '/assets/img/default.jpg';
            },
            getInstagramImage(){
                axios.get('https://api.instagram.com/oembed/?url=https://www.instagram.com/p/BYzFX1dDVMn/')
                    .then((response) => {
                    console.log(response);
                });
                return '/assets/img/default.jpg';
            }
        },
        directives: {
            checkimage: {
                inserted: function (el, binding) {
                    console.log(el);
                    let img_src = binding.value;
                    let image = new Image();
                    image.src = img_src;
                    image.onload = function(){
                        let img_tag = document.createElement('img');
                        img_tag.src = img_src;
                        el.appendChild(img_tag);
                    }

                    image.onerror = function(){
                        let default_img = '/assets/img/default.jpg';

                        let img_tag = document.createElement('img');
                        img_tag.src = default_img;
                        el.appendChild(img_tag);
                    }
                }
            }
        }
    }
</script>