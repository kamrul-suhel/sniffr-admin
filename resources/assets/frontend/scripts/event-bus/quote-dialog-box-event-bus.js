import Vue from 'vue';

const QuoteDialogBoxEventBus = new Vue({
    data() {
      return {
          openBuyDialogBox : false
      }
    },
    methods: {
        openQuoteDialog(collection, asset, type){
            this.openBuyDialogBox = true;
            this.$emit('quoteDialogStateChange', collection, asset, type);
        },

        closeQuoteDialog(asset){
            this.openBuyDialogBox = false;
            this.$emit('quoteDialogBoxClose', asset);
        }
    }
})
export default QuoteDialogBoxEventBus;