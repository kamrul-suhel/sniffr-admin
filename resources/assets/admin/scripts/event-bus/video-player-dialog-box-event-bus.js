import Vue from 'vue';

const VideoPlayerDialogBoxEventBus = new Vue({
    data(){
        return {

        }
    },
    methods:{
        openPlayerDialogBox(asset){
            this.$emit('openPlayerDialogBox', asset)
        },

        closePlayerDialogBox(){
            this.$emit('closePlayerDialogBox');
        }
    }
});

export default VideoPlayerDialogBoxEventBus;