import Vue from 'vue'

const RequestQuoteEventBus = new Vue({
    data(){
        return {

        }
    },

    methods:{
        //Need to pass what type is it video or story & asset object
        openRequestQuoteDialog(type, asset){
            this.$emit('openRequestQuoteDialog', type, asset)
        },

        closeRequestQuoteDIalog(){
            this.$emit('closeReuestQuoteDialog')
        }
    }
})

export default RequestQuoteEventBus;