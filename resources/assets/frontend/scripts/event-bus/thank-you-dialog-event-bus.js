import Vue from 'vue';

const ThankYouDialogBoxEventBus = new Vue({
    data() {
      return {
      }
    },
    methods: {
        openThankYouDialog(message, passwordMessage){
            this.$emit('openThankYouDialog', message, passwordMessage);
        },

        closeThankYouDialog(){
            this.$emit('closeThankYouDialog');
        }
    }
})
export default ThankYouDialogBoxEventBus;