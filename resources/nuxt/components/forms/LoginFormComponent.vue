<template>
    <div class="login">
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
                                        label="Email:"
                                        name="email"
                                        type="email"
                                        color="dark"
                                        v-model="email"
                                        :rules="emailRules"
                                        validate-on-blur
                                        :error="validation.error"
                                        required
                                >
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        class="email"
                                        color="dark"
                                        name="password"
                                        label="Enter your password"
                                        v-model="password"
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

                        <v-layout row
                                  justify-center
                                  v-if="validation.error">
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

                            <v-flex xs12 pt-0>
                                <a @click.stop="onForgotforgotDialog()" class="forgot-password" id="btn-forgot-password">Forgot password</a>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-form>
            </v-card-text>
        </v-card>

        <v-dialog
                v-model="loginDelay"
                max-width="200"
                persistent
                flat
                style="background:none;box-shadow:none;"
                content-class="login-delay-dialog"
        >
            <div class="loading-delay-box text-xs-center">
                <v-progress-circular
                        :size="50"
                        :width="5"
                        color="white"
                        indeterminate
                ></v-progress-circular>
                <p class="white--text">Loading...</p>
            </div>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {

                showpassword: true,
                valid: false,
                login_progress: false,
                loginDelay: false,
                redirectUrl: false,

                email: '',
                password: '',
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
            openLoginDialog(){
                this.validation.error = false;
                this.$refs.login_form.reset();
            }
        },

        computed: {
            openLoginDialog(){
                return this.$store.getters.getLoginDialog;
            }
        },


        methods: {

            onSubmit() {
                if (this.$refs.login_form.validate()) {

                    this.redirectUrl = this.$route.query.redirect ? this.$route.query.redirect : false;

                    // make spinner visible
                    this.login_progress = true;
                    this.loading = true;

                    // prepare submitting data
                    let form_data = new FormData();
                    form_data.append('email', this.email);
                    form_data.append('password', this.password);
                    if(this.redirectUrl) {
                        form_data.append('redirect', this.redirectUrl);
                    }

                    // submit data with ajax request
                    this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
                    this.$axios.$post('/login', form_data)
                        .then(response => {
                            this.login_progress = true;
                            this.loading = false;

                            let data = response;
                            if (data.error) {
                                this.login_prosgress = false;
                                this.loading = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            this.$store.commit('setUserStatus', data);
                            this.$store.commit('setLoginDialog', false);

                            // if has previous page then do this
                            let request_url = this.$route.query.request_url;
                            if(request_url && request_url != ''){
                                request_url = '/'+ request_url;
                                this.$router.push({path: request_url});
                            }

                            if (data.redirect_url != '') {
                                this.loginDelay = true;
                                window.location.href = data.redirect_url;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            onForgotforgotDialog() {
                this.$store.commit('setLoginDialog', false);
                setTimeout(() => {
                    this.$store.commit('setForgotPasswordDialog', true);
                }, 500);

            },
        }
    }
</script>
