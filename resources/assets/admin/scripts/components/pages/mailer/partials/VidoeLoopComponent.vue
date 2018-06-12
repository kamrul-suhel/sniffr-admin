<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-card flat>
                <v-card-media height="200px"
                              :src="video.thumb ? video.thumb : '/assets/frontend/images/placeholder.png'"></v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs4>
            <strong>{{ video.title }}</strong>
            <p><br/>{{ video.excerpt | readmore(300, '...') }}</p>
        </v-flex>

        <v-flex xs2>
            {{ getAuthor()}}
        </v-flex>

        <v-flex xs2>
            {{ video.created_at | convertDate }}
        </v-flex>

        <v-flex xs1>
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
    export default {
        data() {
            return {
                selected: false,
            }
        },

        props: ['video', 'index'],

        watch: {
            selected(selected) {
                console.log(selected);
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
            getAuthor(){
                return this.video.created_user ? this.video.created_user.username : '';
            }
        }
    }
</script>