<template>
    <v-dialog
            v-model="story_dialog"
            scrollable
            content-class="video-dialog-container"
    >
        <div class="dialog-box-switch prev">
            <v-btn fab
                   small
                   dark
                   color="dark ma-0 hidden-xs-only"
                   @click="onPreviousStory()"
                   :disabled="!previousPageExists" >
                <v-icon>chevron_left</v-icon>
            </v-btn>
        </div>

        <div class="dialog-box-switch next">
            <v-btn fab
                   small
                   dark
                   @click="onNextStory()"
                   color="dark ma-0 hidden-xs-only"
                   :disabled="!nextPageExists" >
                <v-icon>chevron_right</v-icon>
            </v-btn>
        </div>

        <v-card>
            <v-toolbar card
                       dark
                       color="dark">
                <v-btn icon
                       dark
                       @click.native="onCloseDialogBox()">
                    <v-icon>close</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <div class="mailer-label">
                        Add to mailer
                    </div>
                    <v-checkbox
                            v-model="selected"
                            @change="onStoryClick()"
                            ></v-checkbox>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <div class="video-dialog-loading"></div>

                    <v-container grid-list-xl fluid
                                 v-touch="{
                                      left: () => swipe('Left'),
                                      right: () => swipe('Right')
                                }">
                        <story-dialog-component></story-dialog-component>
                    </v-container>


                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import StoryDialogBoxEventBus from '../../../event-bus/story-dialog-box-event-bus';
    import StoryDialogComponent from '../../../includes/StoryInDialogComponent';

    export default {
        data() {
            return {
                selected: false,

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

                //check story is selected or not
                this.isStorySelected();
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

            onStoryClick(){

                if (this.selected) {
                    this.$store.commit('addStory', this.current_story);
                    StoryDialogBoxEventBus.$emit('addedStoryFromDialog', this.current_story.id);
                } else {
                    StoryDialogBoxEventBus.$emit('removedStoryFromDialog', this.current_story.id);
                    this.$store.commit('removeStory', this.current_story);
                }
            },

            isStorySelected(){
                let stories = this.$store.getters.getAllSelectedStories;

                //set initialize state
                this.selected = false;
                stories.forEach((story) => {
                    if (story.id === this.current_story.id) {
                        this.selected = true;
                    }
                });
            }

        }
    }
</script>
