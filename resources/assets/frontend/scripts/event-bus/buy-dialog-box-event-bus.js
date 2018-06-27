import Vue from 'vue';

const BuyDialogBoxEventBus = new Vue({
    data() {
      return {
          openBuyDialogBox : false
      }
    },
    methods: {
        openBuyDialog(collection, video){
            this.openBuyDialogBox = true;
            this.$emit('buyDialogStateChange', collection, video);
        },

        closeBuyDialog(video){
            this.openBuyDialogBox = false;
            this.$emit('buyDialogBoxClose', video);
        }
    }
})
export default BuyDialogBoxEventBus;