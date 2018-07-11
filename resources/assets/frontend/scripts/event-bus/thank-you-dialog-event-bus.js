import Vue from 'vue';

const ThankYouDialogBoxEventBus = new Vue({
    data() {
      return {
      }
    },
    methods: {
        openThankYouDialog(message){
            this.$emit('openThankYouDialog', message);
        },

        closeThankYouDialog(){
            this.$emit('closeThankYouDialog');
        }
    }
})
export default ThankYouDialogBoxEventBus;