import Vue from 'vue';

const VideoDialogBoxEventBus = new Vue({
    data() {
      return {
          openVideoDialogBox : false
      }
    },
    methods: {
        openVideoDialog(alpha_id){
            this.openVideoDialogBox = true;
            this.$emit('videoDialogStateChange', alpha_id);
        },

        videoDialogNextButtonClick(){
            this.$emit('onDialogClickNext');
        },

        videoDialogPrevButtonClick(){
            this.$emit('onDialogClickPrev');
        }
    }
})
export default VideoDialogBoxEventBus;