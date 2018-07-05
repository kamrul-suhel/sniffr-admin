import Vue from 'vue'

const ClientVideoPurchasedOfferEventBus = new Vue({
    data(){
        return {

        }
    },

    methods: {
        clientRemoveVideo(index){
            this.$emit('clientRemoveVideo', index)
        }
    }


})

export default ClientVideoPurchasedOfferEventBus;