<template>
    <v-card raised>
        <v-card-text class="login-section pa-0">
            <v-form method="post" v-model="valid" ref="login_form">
                <v-container grid-list-lg>
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
                                    validate-on-blur
                                    :error="validation.error"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                    class="email"
                                    color="dark"
                                    label="Enter your password"
                                    v-model="user.password"
                                    :append-icon="showpassword ? 'visibility' : 'visibility_off'"
                                    @click:append="showpassword = !showpassword"
                                    :type="showpassword ? 'password' : 'text'"
                                    :rules="passwordRules"
                                    @keyup.enter="onSubmit()"
                                    :error="validation.error"
                                    required
                            ></v-text-field>
                        </v-flex>

                    </v-layout>

                    <v-layout row justify-center v-if="validation.error">
                        <v-flex>
                            <div class="red--text text-xs-center">{{validation.message}}</div>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap fluid class="text-xs-center">
                        <v-flex xs12>
                            <input type="hidden" name="_token"/>
                            <v-btn
                                    raised
                                    dark
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="onSubmit()">
                                LOGIN
                            </v-btn>
                        </v-flex>

                        <v-flex xs12>
                            <a @click.stop="onForgotforgotDialog()" class="forgot-password">Forgot password</a>
                        </v-flex>
                    </v-layout>
                </v-container>

            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
    import LoginEventBus from '../../event-bus/login-event-bus.js';

    export default {
        data() {
            return {
                open_login_dialog: false,

                showpassword: true,
                valid: false,
                login_progress: false,
                user: {
                    email: '',
                    password: ''
                },
                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required'
                ],

                validation: {
                    error: false,
                    message: ''
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
            LoginEventBus.$on('openLoginDialog', this.openLoginDialog);
            LoginEventBus.$on('closeLoginDialog', () => {
                this.open_login_dialog = false;
            });

        },

        methods: {
            openLoginDialog(event) {
                this.open_login_dialog = event;
            },

            onLoginDialogClose() {
                this.login_dialog = false;
                this.loading = false;
                this.$refs.login_form.reset();
            },

            onSubmit() {
                if (this.$refs.login_form.validate()) {

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
                            if (data.error) {
                                this.login_prosgress = false;
                                this.loading = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            this.$store.commit('setUserState', data);
                            LoginEventBus.loginSuccess();

                            // if has previous page then do this
                            let request_url = this.$route.query.request_url;
                            if(request_url && request_url != ''){
                                request_url = '/'+ request_url;
                                this.$router.push({path: request_url});
                            }

                            if (data.redirect_url != '') {
                                window.location.href = data.redirect_url;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            onForgotforgotDialog() {
                this.open_login_dialog = false;
                setTimeout(() => {
                    LoginEventBus.openPasswordResetDialog();
                }, 500);

            },
        }
    }
</script>
