<template>
    <!-- VIDEOS ITEM SECTION -->
    <div class="videos-section">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Videos</h1>
                </div>
            </div>
        </section>
        
        <search-component @searchOption="searchOption($event)"></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg>
                <transition-group name="slide-fade" tag="div" class="layout row wrap">
                        <videoloop-component
                                v-for="(video, index) in videos"
                                :video="video"
                                :key="video.alpha_id"
                                @click.stop="openVideoDialog(video)">
                        </videoloop-component>
                </transition-group>
            </v-container>
        </section>

        <!-- Pagination -->
        <pagination-component :pagination="paginate" :page="'video'"></pagination-component>


        <!-- Dialog box -->
        <v-dialog
                v-model="video_dialog"
                transition="dialog-bottom-transition"
                persistent
                scrollable
                class="video-dialog-container"
                content-class="video-dialog-container"
        >
            <v-card>
                <v-toolbar card dark color="dark">
                    <v-btn icon dark @click.native="video_dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Sniffr media</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text class="video-dialog-box">
                    <v-layout row wrap>
                        <div class="dialog-box-switch prev">
                            <v-btn color="dark ma-0" fab small dark @click="onPreviousVideo()">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </div>

                        <v-container grid-list-xs fluid :class="{'mx-5': margin_content}">
                            <router-view></router-view>
                        </v-container>

                        <div class="dialog-box-switch next">
                            <v-btn color="dark ma-0" fab small dark @click="onNextVideo()">
                                <v-icon>chevron_right</v-icon>
                            </v-btn>
                        </div>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent';
    import VideoLoopComponent from '../../includes/VideoLoopComponent';
    import PaginationComponent from '../../includes/PaginationComponent';
    import VideoDialogBoxEventBus from '../../../event-bus/video-dialog-box-event-bus';

    export default{
        components:{
            searchComponent: SearchComponent,
            videoloopComponent: VideoLoopComponent,
            paginationComponent: PaginationComponent
        },
        data(){
            return {
                data: '',
                videos: '',
                paginate: '',
                current_page: 0,
                video_dialog: false,

                margin_content: true
            }
        },
        watch: {
            '$route'(to, from, next){
                this.current_page = to.query.page;
                this.updateVideodata();
            }
        },

        beforeCreate(){
        },

        created(){
            let current_device = this.$vuetify.breakpoint.name;
            if(current_device == 'sm' || current_device == 'xs'){
                this.margin_content = false;
            }

            if(this.$route.query.page){
                this.current_page = this.$route.query.page;
            }
            this.setAlldata();

            // Video dialog box
            VideoDialogBoxEventBus.$on('videoDialogStateChange', () => {
                this.video_dialog = VideoDialogBoxEventBus.openVideoDialogBox;
            });

        },
        methods: {
            setAlldata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then(() => {
                    this.videos = this.$store.getters.getVideoData;
                    this.paginate = this.$store.getters.getPaginateObject;
                });
            },

            updateVideodata(){
                this.$store.dispatch('getVideoData', {page: this.current_page}).then( () => {
                    this.videos = this.$store.getters.getVideoData;
                });
            },

            onPreviousVideo(){
                let alpha_id = this.$store.getters.getPrevVideoAlphaId;
                this.$router.push({name: 'video_in_dialog', params: {alpha_id: alpha_id}});
            },

            onNextVideo(){
                let alpha_id = this.$store.getters.getNextVideoAlphaId;
                this.$router.push({name: 'video_in_dialog', params: {alpha_id: alpha_id}});
            }
        }
    }
</script>