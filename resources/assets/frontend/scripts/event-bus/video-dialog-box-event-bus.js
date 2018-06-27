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
            console.log(alpha_id);
            this.$emit('videoDialogStateChange', alpha_id);
        },

        closeVideoDialog(video){
            this.openVideoDialogBox = false;
            this.$emit('videoDialogBoxClose', video);
        },

        closeVideoDialogFromBuy(){
            this.openVideoDialogBox = false;
            this.$emit('videoDialogBoxCloseFromBuy');
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
        }
    }
})
export default VideoDialogBoxEventBus;