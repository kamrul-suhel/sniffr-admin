<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="story_dialog"
            scrollable
            content-class="video-dialog-container"
    >
        <div class="dialog-box-switch prev">
            <v-btn color="dark ma-0 hidden-xs-only" fab small  dark @click="onPreviousStory()" :disabled="!previousPageExists" >
                <v-icon>chevron_left</v-icon>
            </v-btn>
        </div>

        <div class="dialog-box-switch next">
            <v-btn color="dark ma-0 hidden-xs-only" fab small  dark @click="onNextStory()" :disabled="!nextPageExists" >
                <v-icon>chevron_right</v-icon>
            </v-btn>
        </div>

        <v-card>
            <v-toolbar card dark color="dark">
                <v-btn icon dark @click.native="onCloseDialogBox()">
                    <v-icon>close</v-icon>
                </v-btn>
                <!--<v-toolbar-title>Swipe Direction: {{ swipeDirection }}</v-toolbar-title>-->

            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="video-dialog-loading"></div>

                    <v-container grid-list-xl fluid
                                 v-touch="{
                                      left: () => swipe('Left'),
                                      right: () => swipe('Right')
                                }"
                    >
                        <story-dialog-component></story-dialog-component>
                    </v-container>


                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import StoryDialogBoxEventBus from '../../../../event-bus/story-dialog-box-event-bus';
    import StoryDialogComponent from '../../../../includes/StoryInDialogComponent';

    export default {
        data() {
            return {
                current_story: '',
                story_dialog: false,
                margin_content: true,
                current_page: 0,

                nextPageExists: true,
                nextPageAlphaId: '',

                previousPageExists: true,
                previousPageAlphaId: '',
                swipeDirection:'',

            }
        },

        watch: {
            story_dialog() {
                console.log(this.story_dialog);
                if(this.story_dialog === false){
                    setTimeout(() => {
                        this.$store.commit('setResetStoryDialogObject');

                        StoryDialogBoxEventBus.onResetCurrentStoryIndialog();
                    }, 500)
                }
            }
        },

        components: {
            StoryDialogComponent
        },

        created() {
            let current_device = this.$vuetify.breakpoint.name;
            if(current_device == 'sm' || current_device == 'xs'){
                this.margin_content = false;
            }

            StoryDialogBoxEventBus.$on('StoryDialogStateChange', (alpha_id) => {
                this.story_dialog = StoryDialogBoxEventBus.openStoryDialogBox;
            })

            StoryDialogBoxEventBus.$on('setNextPrevButton', () => {
                this.nextPageAlphaId = this.$store.getters.getNextStoryAlphaId;
                this.previousPageAlphaId = this.$store.getters.getPrevStoryAlphaId;

                this.checkAlphaIdExists();
                this.current_story = this.$store.getters.getCurrentStoryForDialog;
            })

            StoryDialogBoxEventBus.$on('videoDialogBoxClose', (video) => {
                this.story_dialog = false;
                setTimeout(()=> {
                    this.$router.push({name: 'videos_detail', params : {id : video.alpha_id}});
                }, 500);
            });

            StoryDialogBoxEventBus.$on('videoDialogBoxCloseByTag', (tag) => {
                this.story_dialog = false;
                setTimeout(() => {
                    this.$router.push({name: 'videos_tag', params: {value: tag.name}});
                }, 500);

            });

        },
        

        methods: {
            swipe (direction) {
                this.swipeDirection = direction;
                if(direction === 'Right'){
                    this.onPreviousVideo();
                }

                if(direction === 'Left'){
                    this.onNextVideo();
                }
            },

            onPreviousStory(){
                StoryDialogBoxEventBus.storyDialogPrevButtonClick()
            },

            onNextStory(){
                StoryDialogBoxEventBus.storyDialogNextButtonClick()
            },

            onCloseDialogBox() {
                this.story_dialog = false;
                this.$store.commit('setResetVideoDialogObject');
            },

            checkAlphaIdExists() {
                if (!this.nextPageAlphaId) {
                    this.nextPageExists = false;
                }else{
                    this.nextPageExists = true;
                }

                if (!this.previousPageAlphaId) {
                    this.previousPageExists = false;
                }else{
                    this.previousPageExists = true;
                }
            },

        }
    }
</script>