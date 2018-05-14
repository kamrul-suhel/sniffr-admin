import Vue from 'vue';

const VideoDialogBoxEventBus = new Vue({
    methods: {
        openVideoDialog(){
            console.log('Method called');
            this.$emit('videoDialogStateChange');
        }
    }
})
export default VideoDialogBoxEventBus;