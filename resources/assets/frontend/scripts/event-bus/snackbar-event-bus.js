import Vue from 'vue';
var SnackbarEventBus = new Vue({
    data(){
        return {

        }
    },

    methods: {
        displayMessage(timeOut= 500, message = ''){
            this.$emit('displayMessage', timeOut, message);
        }
    }
});

export default SnackbarEventBus;