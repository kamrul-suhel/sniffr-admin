import Vue from 'vue';

const StoryDialogBoxEventBus = new Vue({
    data() {
      return {
          openStoryDialogBox : false
      }
    },
    methods: {
        openStoryDialog(alpha_id){
            this.openStoryDialogBox = true;
            this.$emit('StoryDialogStateChange', alpha_id);
        },

        closeStoryDialog(Story){
            this.openStoryDialogBox = false;
            this.$emit('StoryDialogBoxClose', Story);
        },

        storyDialogNextButtonClick(){
            this.$emit('onStoryDialogClickNext');
        },

        storyDialogPrevButtonClick(){
            this.$emit('onStoryDialogClickPrev');
        },

        onResetCurrentStoryIndialog(){
            this.$emit('onResetCurrentStoryIndialog');
        }
    }
})
export default StoryDialogBoxEventBus;