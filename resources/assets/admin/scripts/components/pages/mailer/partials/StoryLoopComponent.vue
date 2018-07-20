<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md6 lg3 xl3>
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

        <v-flex xs12 sm6 md6 lg4 xl4>
            <h4 v-html="story.title"></h4>
            <div v-html="story.excerpt"></div>
        </v-flex>

        <v-flex xs6 sm6 md6 lg2 xl2>
            {{ story.author }}
        </v-flex>

        <v-flex xs12 sm6 md6 lg2 xl2>
            {{ story.created_at | convertDate }}
        </v-flex>

        <v-flex xs6 sm6 md6 lg1 xl1>
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
    import StoryDialogBoxEventBus from '../../../../event-bus/story-dialog-box-event-bus';
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
