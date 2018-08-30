<template>
	<!-- Login form -->
    <div class="login-dialog">
        <v-dialog
                transition="false"
                v-model="open_login_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onLoginDialogClose()">
                <login-form v-if="open_login_dialog"></login-form>
        </v-dialog>
	</div>
</template>
<script>
    import LoginForm from '../forms/LoginFormComponent.vue';

	export default {
        components: {
            loginForm: LoginForm,
        },

        computed: {
            open_login_dialog: {
                get(){
                    return this.$store.getters.getLoginDialog;
                },

                set(value){
                    this.$store.commit('setLoginDialog', value);
                }
            }
        },

		data() {
			return {
			}
		},

		watch: {
            open_login_dialog() {
			},
		},

		created() {
		},

		methods: {
			onLoginDialogClose() {
              this.login_dialog = false;
              this.loading = false;
              this.$refs.login_form.reset();
            }
		}
	}
</script>
