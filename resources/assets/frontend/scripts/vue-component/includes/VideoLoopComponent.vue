<template>
    <v-flex xs12 sm6 md4 lg4 xl4>
        <v-card class="block">
            <v-card-media class="sniffr-media-thumbnail"
                :src="video.image.includes('instagram.com') ? getInstagramImage(video) : video.image">
                <a
                @click.stop="openVideoDialog(video)"
                class="block-thumbnail"
                >
                    <div class="thumbnail-overlay"></div>
                    <span class="play-button">
                        <v-icon color="white" size="60px">play_circle_outline</v-icon>
                    </span>
                    <span class="label" :class="video.state == 'licensed' ? 'label-success': 'label-danger'">
                        {{video.state}}
                    </span>

                    <div class="video-duration" v-if="video.duration">
                        {{video.duration | convertTime}}
                    </div>
                </a>
            </v-card-media>

            <v-card-title class="pb-0">
                <h3 class="headline mb-0" @click.stop="goToDetail(video)">
                    {{ video.title }}
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
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus'
    export default {
        data() {
            return {
                video_image: '/assets/frontend/images/placeholder.png',
            }
        },
        props:['video'],

        created(){
        },

        methods:{
            defaultImage(){
                this.video_image = '/assets/frontend/images/placeholder.png';
            },

            getInstagramImage(){
                return '/assets/frontend/images/placeholder.png';
            },

            goToDetail(video) {
                this.$vuetify.goTo('.videos-section', {duration: 500, easing:'easeInCubic'});
                setTimeout(() => {
                    this.$router.push({name: 'videos_detail', params: {id: this.video.alpha_id}});
                }, 800);

            },

            openVideoDialog(video){
                    this.$store.dispatch('getVideoDetailData', {alpha_id: video.alpha_id}).then(() => {
                    let video_detail = this.$store.getters.getVideoDetailData;

                    this.$store.commit('setVideoDialogBox', video_detail);
                    VideoDialogBoxEventBus.openVideoDialog();
                    this.$router.push({name: 'video_in_dialog', params: {id: video_detail.video.alpha_id}});
                });
            },
        },

        directives: {
            checkimage: {
                inserted: function (el, binding) {
                    let img_src = binding.value;
                    let image = new Image();
                    image.src = img_src;
                    image.onload = function(){
                        let img_tag = document.createElement('img');
                        img_tag.src = img_src;
                        el.appendChild(img_tag);
                    }

                    image.onerror = function(){
                        let default_img = '/assets/frontend/images/placeholder.png';

                        let img_tag = document.createElement('img');
                        img_tag.src = default_img;
                        el.appendChild(img_tag);
                    }
                }
            }
        }
    }
</script>