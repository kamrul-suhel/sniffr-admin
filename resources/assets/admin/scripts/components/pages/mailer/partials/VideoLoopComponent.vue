<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg3 xl3>
            <v-card flat>
                <v-card-media
                        height="200px"
                        :src="video.thumb ? video.thumb :  (video.image ? video.image : '/assets/frontend/images/placeholder.png')"
                        @click="onOpenVideoDialog()"
                ></v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs12 sm6 md6 lg4 xl4 class="mailer-title">
            <strong @click="onOpenVideoDialog()">{{ video.title }}</strong>
            <p>{{ video.excerpt | readmore(300, '...') }}</p>
        </v-flex>

        <v-flex xs6 sm6 md6 lg2 xl2>
            {{ getAuthor()}}
        </v-flex>

        <v-flex xs12 sm6 md6 lg2 xl2>
            {{ video.created_at | convertDate }}
        </v-flex>

        <v-flex xs6 sm6 md6 lg1 xl1>
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
    import VideoDialogBoxEventBus from '../../../../event-bus/video-dialog-box-event-bus';
    export default {
        data() {
            return {
                selected: false,
            }
        },

        props: ['video', 'index'],
        watch: {
            selected(selected) {
                if (selected) {
                    this.$store.commit('addVideo', this.video);
                } else {
                    this.$store.commit('removeVideo', this.video);
                }
            }
        },

        created() {
            let videos = this.$store.getters.getAllSelectedVideos;
            videos.forEach((video) => {
                if (video.id === this.video.id) {
                    this.selected = true;
                }
            });
        },


        methods: {
            getAuthor() {
                return this.video.created_user ? this.video.created_user.username : '';
            },

            onOpenVideoDialog(){
                VideoDialogBoxEventBus.openVideoDialog(this.video.alpha_id);
            }
        }
    }
</script>