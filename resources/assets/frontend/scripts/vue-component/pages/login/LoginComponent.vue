<template>
    <v-container grid-list-lg fill-height>
        <v-layout justify-center align-center>
            <v-flex shrink>
                <login-form></login-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import LoginForm from '../../forms/LoginFormComponent.vue';

    export default {
        components: {
            loginForm: LoginForm,
        },

        data() {
            return {

            }
        },

        watch: {

        },

        created() {

        },

        methods: {

        }
    }
</script>
