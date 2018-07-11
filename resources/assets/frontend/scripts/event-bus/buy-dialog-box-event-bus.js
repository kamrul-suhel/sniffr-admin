import Vue from 'vue';

const BuyDialogBoxEventBus = new Vue({
    data() {
      return {
      }
    },
    methods: {
        openBuyDialog(collection, asset, type){
            this.$emit('buyDialogStateChange', collection, asset, type);
        },

        closeBuyDialog(){
            this.$emit('buyDialogBoxClose');
        }
    }
})
export default BuyDialogBoxEventBus;