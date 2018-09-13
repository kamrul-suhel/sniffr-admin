<template>
    <v-flex xs12 sm6 md6 lg4 xl3
            class="asset-video-content">
        <v-card class="video-card block"
                :style="width ? {'min-width': width}: ''">
            <v-card-media class="video-card-thumb-wrapper"
                          :src="onGetThumbnailImage()">
                <a @click.stop="openVideoDialog(video)"
                        class="video-card-thumb">

                    <div class="thumbnail-overlay"></div>

                    <span class="play-button">
                        <v-icon color="white"
                                size="60px"
                        >play_circle_outline</v-icon>
                    </span>

                    <span class="label label-licensed"
                          v-if="getVideoPurchased()">Purchased</span>

                    <span v-if="video.nsfw == '1'" class="label"
                          :class="video.nsfw == '1' ? 'label-nsfw': 'label-danger'">
                        NSFW
                    </span>

                    <div class="video-duration" v-if="video.duration">
                        {{video.duration | convertTime}}
                    </div>
                </a>
            </v-card-media>

            <v-card-title class="pb-0">
                <h3 class="video-card-title mb-0"
                    @click.stop="goToDetail(video)">
                    {{ video.title }}
                </h3>
            </v-card-title>

            <v-card-text class="pt-0">
                <p class="video-card-text"
                   v-if="video.description !== 'null'">
                    {{ video.description | readmore(100, '...') }}
                </p>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
    export default {
        data() {
            return {
                video_image: '~/assets/images/placeholder.png',
            }
        },

        props: {
            video: {
                type: Object,
                required: true
            },

            type: {
                type: String,
                required: false
            },

            width: {
                type: String,
                required: false
            },

            index: {
                type: Number,
                required: false
            }
        },

        methods: {
            getVideoPurchased() {
                if (this.video.video_collections && this.video.video_collections.length > 0) {
                    return true;
                }
                return false;
            },

            defaultImage() {
                this.video_image = '~/assets/images/placeholder.png';
            },

            onGetThumbnailImage() {
                let thumb = '';
                if (new RegExp('instagram', 'i').test(this.video.image)) {
                    thumb = '~/assets/images/placeholder.png';
                } else {
                    thumb = this.video.image;
                }
                return thumb;
            },

            goToDetail() {
                if (this.$route.name === 'client_videos') {
                    this.$router.push({name: 'client_video_download', params: {alpha_id: this.video.alpha_id}});
                } else {
                    this.$router.push({path: 'videos/' + this.video.alpha_id});
                }
            },

            openVideoDialog(video) {
                let url = '/videos?id=' + video.alpha_id;

                if (this.$route.query.tag) {
                    url += '&tag=' + this.$route.query.tag;
                }

                if (this.$route.query.search) {
                    url += '&search=' + this.$route.query.search;
                }


                if (this.type === 'suggest') {

                    this.$store.commit('setVideoDialogBox', true);
                    this.$store.commit('setVideoLoading', true);

                    url = '/videos?id=' + video.alpha_id;
                    url += '&suggest=true';
                    window.history.pushState({}, null, url);
                    this.$route.query.type = 'suggest';
                    let index = this.index;

                    this.$store.commit('setEnterRouteObject', this.$route);
                    this.$store.commit('setMailerVideoCurrentIndex', index);
                    this.$store.commit('setSuggestNextPrevious');
                    return;
                }

                window.history.pushState({}, null, url);

                this.$store.commit('setEnterRouteObject', this.$route);

                this.$store.commit('setCurrentVideoAlphaId', video.alpha_id);
                this.$store.commit('setCurrentRouteObject', this.$route);
                this.$store.commit('setVideoDialogBox', true);
                this.$store.commit('setVideoLoading', true);

                this.$store.dispatch('getVideoNextAndPrevLink', {alpha_id: video.alpha_id});
            }
        },

        directives: {
            checkimage: {
                inserted: function (el, binding) {
                    let img_src = binding.value;
                    let image = new Image();
                    image.src = img_src;
                    image.onload = function () {
                        let img_tag = document.createElement('img');
                        img_tag.src = img_src;
                        el.appendChild(img_tag);
                    };

                    image.onerror = function () {
                        let default_img = '~/assets/images/placeholder.png';

                        let img_tag = document.createElement('img');
                        img_tag.src = default_img;
                        el.appendChild(img_tag);
                    };
                }
            }
        }
    }
</script>
