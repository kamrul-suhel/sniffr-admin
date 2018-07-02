<template>
    <v-btn dark color="dark" block class="mb-0" @click="onRequestQuote()">Request Quote</v-btn>
</template>

<script>
    import RequestQuoteEventBus from '../../event-bus/request-quote-event-bus'
    export default {
        data(){
            return {

            }
        },

        props:['type', 'asset'],

        methods:{
            onRequestQuote(){
                RequestQuoteEventBus.openRequestQuoteDialog(this.type, this.asset)
            }
        }
    }
</script>