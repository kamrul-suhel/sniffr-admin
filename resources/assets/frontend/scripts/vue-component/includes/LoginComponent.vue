<template>
	<!-- Login form -->
    <div class="login-dialog">
        <v-dialog
                v-model="open_login_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onLoginDialogClose()">
                <login-form></login-form>
        </v-dialog>
	</div>
</template>
<script>
    import LoginEventBus from '../../event-bus/login-event-bus.js';
    import LoginForm from '../forms/LoginFormComponent.vue';

	export default {
        components: {
            loginForm: LoginForm,
        },

		data() {
			return {
				open_login_dialog: false,
			}
		},

		watch: {
            open_login_dialog() {
				this.$emit('changeLogin_dialog', this.open_login_dialog);
			},
		},

		created() {
            LoginEventBus.$on('openLoginDialog',this.openLoginDialog);
            LoginEventBus.$on('closeLoginDialog', () => {
                this.open_login_dialog = false;
            });
		},

		methods: {
            openLoginDialog(event){
                this.open_login_dialog = event;
            },

			onLoginDialogClose() {
              this.login_dialog = false;
              this.loading = false;
              this.$refs.login_form.reset();
            }
		}
	}
</script>