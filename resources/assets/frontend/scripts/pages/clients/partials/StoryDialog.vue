<template>
    <!-- Dialog box -->
    <v-dialog
            v-model="story_dialog"
            scrollable
            content-class="video-dialog-container"
    >

        <v-card>
            <v-toolbar card dark color="dark">
                <v-btn icon dark @click.native="onCloseDialogBox()">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="video-dialog-box">
                <v-layout row wrap>
                    <v-container grid-list-xl fluid class="pa-0" >
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
                story_dialog: false,
            }
        },

        components: {
            StoryDialogComponent
        },

        created() {
            StoryDialogBoxEventBus.$on('openStoryDialog', (story) => {
                this.story_dialog = true;
            })
        },


        methods: {
            onCloseDialogBox() {
                this.story_dialog = false;
            }
        }
    }
</script>
