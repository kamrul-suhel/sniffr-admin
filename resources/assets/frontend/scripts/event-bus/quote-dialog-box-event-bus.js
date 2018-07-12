import Vue from 'vue';

const QuoteDialogBoxEventBus = new Vue({
    data() {
      return {
      }
    },
    methods: {
        openQuoteDialog(collection, asset, type){
            this.$emit('quoteDialogStateChange',collection, asset, type);
        },

        closeQuoteDialog(asset){
            this.$emit('quoteDialogBoxClose');
        }
    }
})
export default QuoteDialogBoxEventBus;