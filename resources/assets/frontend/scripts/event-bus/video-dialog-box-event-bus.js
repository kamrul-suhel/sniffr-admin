import Vue from 'vue';

const VideoDialogBoxEventBus = new Vue({
    data() {
      return {
          openVideoDialogBox : false
      }
    },
    methods: {
        openVideoDialog(){
            this.openVideoDialogBox = true;
            this.$emit('videoDialogStateChange');
        }
    }
})
export default VideoDialogBoxEventBus;