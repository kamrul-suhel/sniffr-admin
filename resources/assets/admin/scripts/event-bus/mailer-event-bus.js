import Vue from 'vue'

const MailerEventBus = new Vue({
    data(){
        return {

        }
    },

    methods: {
        storiesUpdated(){
            console.log('Event working');
            this.$emit('storiesUpdated')
        }
    }


})

export default MailerEventBus;