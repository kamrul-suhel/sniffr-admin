<template>
    <v-snackbar
            v-model="snackbar"
            right
            top
            :timeout="timeout"
    >
        {{ message }}
        <v-btn
                color="white"
                flat
                @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    import SnackbarEventBus from '../../event-bus/snackbar-event-bus'

    export default {
        data(){
            return {
                snackbar: false,
                timeout: 500,
                message: ''
            }
        },

        created(){
            SnackbarEventBus.$on('displayMessage', (timeout, message) => {
                console.log(message);
                this.timeout = Number(timeout);
                this.message = message;

                this.snackbar = true;
            });
        },

        methods: {

        }
    }
</script>