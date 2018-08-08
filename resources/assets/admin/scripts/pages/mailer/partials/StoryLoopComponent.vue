<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-card flat hover>
                <v-card-media
                        height="200px"
                        :src="story.thumb ? story.thumb : '/assets/frontend/images/placeholder.png'"
                        @click="onOpenStoryDialog()">
                    <div class="hot-story" v-if="story.flagged === 1">
                        <div class="hot-story-content">HOT</div>
                    </div>
                </v-card-media>
            </v-card>
        </v-flex>

        <v-flex xs12 sm6 md3>
            <h4>{{ story.title }}</h4>
            <div v-html="story.excerpt"></div>
        </v-flex>

        <v-flex xs6 sm6 md1>
            {{ story.author }}
        </v-flex>

        <v-flex xs6 sm6 md1>
            {{ story.state }}
        </v-flex>

        <v-flex xs12 sm6 md1>
            {{ story.created_at | convertDate }}
        </v-flex>

        <v-flex xs6 sm6 md1 class="story-input">
            <v-checkbox
                    color="black"
                    v-model="selected"
            ></v-checkbox>
        </v-flex>

        <v-flex xs12>
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import StoryDialogBoxEventBus from '../../../event-bus/story-dialog-box-event-bus';
    export default {
        data() {
            return {
                selected: false,
                currStory: ''
            }
        },

        props: ['story', 'index'],

        watch: {
            selected(selected) {
                if (selected) {
                    this.$store.commit('addStory', this.currStory);
                } else {
                    this.$store.commit('removeStory', this.currStory);
                }
            }
        },

        created() {
            let stories = this.$store.getters.getAllSelectedStories;
            this.currStory = this.story;

            stories.forEach((story) => {
                if (story.id === this.story.id) {
                    this.selected = true;
                }
            });

            StoryDialogBoxEventBus.$on('addedStoryFromDialog', (addedStory)=> {
                if(addedStory === this.currStory.id){
                    this.selected = true;
                }
            })

            StoryDialogBoxEventBus.$on('removedStoryFromDialog', (removedStory)=> {
                if(removedStory === this.currStory.id){
                    this.selected = false;
                }
            })

        },


        methods: {
            onStorySelect() {
                console.log(this.selected);
            },

            onOpenStoryDialog(){
                StoryDialogBoxEventBus.openStoryDialog(this.story.alpha_id);
            },

            onEditStories() {
                window.location.href = '/admin/stories/edit/'+this.story.id;
            },
        }
    }
</script>

<style lang="scss">
    .story-input {
        .v-input{
            margin:0;
            padding:0
        }
    }
</style>
