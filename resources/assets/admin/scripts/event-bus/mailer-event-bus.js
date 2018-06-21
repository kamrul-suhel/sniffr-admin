import Vue from 'vue'

const MailerEventBus = new Vue({
    data(){
        return {

        }
    },

    methods: {
        storiesUpdated(){
            this.$emit('storiesUpdated')
        }
    }


})

export default MailerEventBus;