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
    import LoginForm from '../component/forms/LoginFormComponent.vue';

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
            // openLoginDialog(event){
            //     this.open_login_dialog = event;
            // },
            //
			onLoginDialogClose() {
              this.login_dialog = false;
              this.loading = false;
              this.$refs.login_form.reset();
            }
		}
	}
</script>
