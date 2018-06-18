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

        closeVideoDialog(video){
            this.openVideoDialogBox = false;
            this.$emit('videoDialogBoxClose', video);
        },

        closeDialogByTagSearch(tag){
          this.openVideoDialogBox = false;
          this.$emit('videoDialogBoxCloseByTag', tag);
        },

        videoDialogNextButtonClick(){
            this.$emit('onDialogClickNext');
        },

        videoDialogPrevButtonClick(){
            this.$emit('onDialogClickPrev');
        },

        onResetCurrentVideoIndialog(){
            this.$emit('onResetCurrentVideoIndialog');
        }
    }
})
export default VideoDialogBoxEventBus;