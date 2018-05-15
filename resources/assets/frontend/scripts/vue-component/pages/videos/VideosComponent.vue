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
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="dark">
                    <v-btn icon dark @click.native="video_dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Sniffr media</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-layout row wrap justify-center>
                        <v-flex justify-start>
                            <v-btn color="dark ma-0" fab small dark>
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-flex>

                        <v-flex>
                            <router-view></router-view>
                        </v-flex>

                        <v-flex justify-start class="text-xs-right">
                            <v-btn color="dark ma-0" fab small dark>
                                <v-icon>chevron_right</v-icon>
                            </v-btn>
                        </v-flex>
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
                video_dialog: false
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
            if(this.$route.query.page){
                this.current_page = this.$route.query.page;
            }
            this.setAlldata();

            // Video dialog box
            VideoDialogBoxEventBus.$on('videoDialogStateChange', () => {
                this.video_dialog = this.$store.getters.getVideoDialogBox;
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
            }
        }
    }
</script>