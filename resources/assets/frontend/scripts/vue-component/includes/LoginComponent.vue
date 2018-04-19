<template>
	<!-- Login form -->
    <div class="login-dialog">
        <v-dialog
                v-model="open_login_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onLoginDialogClose()">
            <v-card raised>
                <v-card-text class="login-section">
                    <v-form method="post" v-model="valid" ref="login_form">
                        <v-layout row wrap id="login-section">

                            <v-flex xs12>
                                <h2 class="login-title">LOGIN</h2>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        color="dark"
                                        label="Email:"
                                        v-model="user.email"
                                        :rules="emailRules"
                                        required
                                        :error="validation.error"
                                >
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        color="dark"
                                        name="password"
                                        label="Enter your password"
                                        v-model="user.password"
                                        :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                                        :append-icon-cb="() => (showpassword = !showpassword)"
                                        :type="showpassword ? 'password' : 'text'"
                                        :rules="passwordRules"
                                        @keyup.enter="onSubmit()"
                                        :error="validation.error"
                                        required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex>
                                <div v-if="validation.error" class="red--text text-xs-center">{{validation.message}}</div>
                            </v-flex>
                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex xs3>
                                <div class="login-button">
                                    <input type="hidden" name="_token"/>
                                    <v-btn
                                        raised
                                        dark
                                        :loading="loading"
                                        :disabled="loading"
                                        @click="onSubmit()">
                                        LOGIN
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex xs12 text-xs-center>
                                <a @click.stop="onForgotforgotDialog()" class="forgot-password">Forgot password</a>
                            </v-flex>
                        </v-layout>

                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
	</div>
</template>
<script>
    import LoginEventBus from '../../event-bus/login-event-bus.js';

	export default {
		data() {
			return {
				open_login_dialog: false,

                showpassword:true,
                valid:false,
                login_progress:false,
                user:{
                    email:'',
                    password:''
                },
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required'
                ],

                validation:{
                    error: false,
                    message:''
                },

                //Loading button
                loading: false,
                loader: null,
			}
		},

		watch: {
            open_login_dialog() {
				this.$emit('changeLogin_dialog', this.open_login_dialog);
			},
		},

		created() {
            LoginEventBus.$on('openLoginDialog',this.openLoginDialog);
		},

		methods: {
            openLoginDialog(event){
                this.open_login_dialog = event;
            },

			onLoginDialogClose() {
              this.login_dialog = false;
              this.loading = false;
              this.$refs.login_form.reset();
            },

            onSubmit() {
                if(this.$refs.login_form.validate()){

                    // make spinner visible
                    this.login_progress = true;
                    this.loading = true;

                    // prepare submitting data
                    let form_data = new FormData();
                    form_data.append('email', this.user.email);
                    form_data.append('password', this.user.password);

                    // submit data with ajax request
                    axios.post('/login', form_data)
                        .then(response => {
                            this.login_progress = true;
                            this.loading = false;

                            let data = response.data;
                            if(data.error){
                                this.login_progress = false;
                                this.loading = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            // Set the user store
                            this.$store.dispatch('getLoginStatus').then((response) => {
                                this.is_login = this.$store.getters.is_login;
                            });

                            if(data.redirect_url){
                                window.location.href = data.redirect_url;
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            onForgotforgotDialog(){
                this.open_login_dialog = false;
                setTimeout(() => {
                    LoginEventBus.openPasswordResetDialog();
                }, 500);
                
            },
		}
	}
</script>