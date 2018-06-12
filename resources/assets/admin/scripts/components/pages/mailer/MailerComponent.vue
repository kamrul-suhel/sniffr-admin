<template>
    <div class="admin-mailer-section">
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-text>
                    <div class="text-xs-center"><h3 class="red--text text-uppercase">{{errorMessage}}</h3></div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-1" flat="flat" @click.native="dialog = false">Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-container grid-list-lg fluid >
            <v-layout row wrap>
                <v-flex xs-6>
                    <h3>
                        <i class="fa fa-users"></i> Mail
                        <!-- <a href="{{ url('admin/stories/create') }}" class="btn btn-success pull-right">
                            <i class="fa fa-plus-circle"></i> Add New Story
                        </a> -->
                    </h3>
                </v-flex>

                <v-flex xs6 class="text-xs-right">
                    <v-btn dark raised tag="a" href="/admin/stories/refresh" >
                        <v-icon>refresh</v-icon> Refresh Stories
                    </v-btn>

                    <v-btn dark raised @click="onCreateMailer()">
                        <v-icon>add</v-icon>Create Mailer
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid grid-list-lg>
            <v-tabs
                    v-model="active"
                    color="dark"
                    dark
                    slider-color="yellow"
            >
                <v-tab>
                    Stories
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-stories-component></mailer-stories-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab>
                    Videos
                </v-tab>
                <v-tab-item>
                    <v-card>
                        <v-card-text>
                            <mailer-videos-component></mailer-videos-component>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-container>

    </div>
</template>

<script>
    import MailerVideosComponent from './modules/VideosComponents';
    import MailerStoriesComponent from './modules/StoriesComponents';
    export default {
        components: {
            mailerVideosComponent: MailerVideosComponent,
            mailerStoriesComponent: MailerStoriesComponent
        },

        data() {
            return {
                active: null,
                dialog: false,
                errorMessage:''
            }
        },

        created() {
        },

        methods: {

            onCreateMailer(){
                // get the selected stories
                let stories = this.$store.getters.getAllSelectedStories;
                let videos = this.$store.getters.getAllSelectedVideos;
                console.log(stories);
                console.log(videos);
                if(stories.length === 0 && videos.length === 0){
                    this.errorMessage = "this.Please select A story or video";
                    this.dialog = true;
                    return;
                }

                let storiesId = [];
                let videosId = [];
                stories.forEach((story)=>{
                    storiesId.push(story.id);
                });

                videos.forEach((video)=>{
                    videosId.push(video.id);
                });

                let storiesString = JSON.stringify(storiesId);
                let videosString = JSON.stringify(videosId);


                // send the data to mailer
                let url = '/admin/mailers/create?videos='+videosString + '&stories='+storiesString;

                axios.get(url)
                    .then((response) => {
                        if(response.data.status === 'success'){
                            window.location = '/admin/mailers/edit/' + response.data.mailer_id;
                        }else{
                           this.errorMessage = "Something went wrong";
                           this.dialog = true;
                        }
                    });
            }
        },
    }
</script>

<style lang="css" scoped>
    @import"./plugins/vuetify.min.css";
</style>