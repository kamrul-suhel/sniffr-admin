import Vue from 'vue';

const VideoDialogBoxEventBus = new Vue({
    methods: {
        openVideoDialog(){
            this.$emit('videoDialogStateChange');
        }
    }
})
export default VideoDialogBoxEventBus;