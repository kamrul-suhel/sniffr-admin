import Vue from 'Vue';

const LoginEventBus = new Vue({
    data(){
        return {
            //login dialog
            login_dialog: false,

            //Password reset section
            password_reset_dialog: false,

            //user auth
            is_login: false,
        }
    },
    methods: {

        openLoginDialog(){
            this.login_dialog = true;
            this.$emit('openLoginDialog', this.login_dialog);
        },

        closeLoginDialog(){
            this.login_dialog = false;
            this.$emit('closeLoginDialog', this.login_dialog);
        },

        openPasswordResetDialog() {
            this.password_reset_dialog = true;
            this.$emit('openPasswordResetDialog', this.password_reset_dialog);
        },

        closePasswordresetDialog() {
            this.password_reset_dialog = false;
            this.$emit('closePasswordresetDialog', this.password_reset_dialog);
        },

        logoutStateChange(){
            this.is_login = false;
            this.$emit('logoutChangeState');
        }
    }
});

export default LoginEventBus;