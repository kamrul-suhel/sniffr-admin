<template>
    <v-flex xs12 sm6 md4 lg4 xl3>
        <v-card class="video-card block">
            <v-card-media class="video-card-thumb-wrapper"
                :src="onGetThumbnailImage()">
                <a
                @click.stop="openVideoDialog(video)"
                class="video-card-thumb"
                >
                    <div class="thumbnail-overlay"></div>
                    <span class="play-button">
                        <v-icon color="white" size="60px">play_circle_outline</v-icon>
                    </span>

                    <span class="label" :class="video.state == 'licensed' ? 'label-licensed': 'label-danger'">
                        {{video.state}}
                    </span>

                    <span v-if="video.nsfw == '1'" class="label" :class="video.nsfw == '1' ? 'label-nsfw': 'label-danger'">
                        NSFW
                    </span>

                    <div class="video-duration" v-if="video.duration">
                        {{video.duration | convertTime}}
                    </div>
                </a>
            </v-card-media>

            <v-card-title class="pb-0">
                <h3 class="video-card-title mb-0" @click.stop="goToDetail(video)">
                    {{ video.title }}
                </h3>
            </v-card-title>

            <v-card-text class="pt-0">
                <p class="video-card-text" v-if="video.description != 'null'">
                    {{ video.description | readmore(100, '...') }}
                </p>
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
        props:{
            video: {
                type: Object,
                required: true
            },

            type: {
                type: String,
                required: false
            }
        },

        created(){
        },

        methods:{
            defaultImage(){
                this.video_image = '/assets/frontend/images/placeholder.png';
            },

            onGetThumbnailImage(){
                let thumb = '';
                if(new RegExp('instagram', 'i').test(this.video.image)){
                    thumb = '/assets/frontend/images/placeholder.png';
                }else{
                    thumb = this.video.image;
                }
                return thumb;
            },

            goToDetail() {
                if(this.$route.name === 'client_videos'){
                    this.$router.push({name: 'client_video_download', params: {alpha_id: this.video.alpha_id}});
                }else{
                    this.$router.push({name: 'videos_detail', params: {alpha_id: this.video.alpha_id}});
                }
            },

            openVideoDialog(video){
                let url = '/videos/'+video.alpha_id;

                if(this.$route.query.tag){
                    url += '?tag='+this.$route.query.tag;
                }

                if(this.$route.query.search){
                    url += '?search='+this.$route.query.search;
                }

                if(this.type === 'suggest'){
                    url = '/videos/'+video.alpha_id;
                    url += '?suggest=true';
                }

                window.history.pushState(null, "page 2",url);

                this.$store.commit('setCurrentVideoAlphaId', video.alpha_id);
                this.$store.commit('setRouteObject', this.$route);
                this.$store.commit('setVideoDialogBox', true);

                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: video.alpha_id});

                // VideoDialogBoxEventBus.openVideoDialog(video.alpha_id);
            }
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