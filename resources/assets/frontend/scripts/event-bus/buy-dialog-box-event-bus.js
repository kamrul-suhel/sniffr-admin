import Vue from 'vue';

const BuyDialogBoxEventBus = new Vue({
    data() {
      return {
          openBuyDialogBox : false
      }
    },
    methods: {
        openBuyDialog(video){
            this.openBuyDialogBox = true;
            console.log(video);
            this.$emit('buyDialogStateChange', video);
        },

        closeBuyDialog(video){
            this.openBuyDialogBox = false;
            this.$emit('buyDialogBoxClose', video);
        }
    }
})
export default BuyDialogBoxEventBus;