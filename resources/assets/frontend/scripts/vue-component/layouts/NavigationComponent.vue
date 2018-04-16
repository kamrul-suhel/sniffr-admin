<template>
    <section id="nav" class="section-space" :class="{ 'nav-background' : nav_background}">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg4>
                    <div class="logo">
                        <router-link to="/">
                            <img src="/assets/frontend/images/logo-sniffr-white.png"/>
                        </router-link>
                    </div>
                </v-flex>

                <v-flex xs12 sm6 md8 lg8>
                    <nav class="navigation">
                        <ul>
                            <li>
                                <router-link to="/upload">
                                    <i class="fas fa-upload"></i> Upload
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/videos">
                                    <i class="fas fa-video"></i> Videos
                                </router-link>
                            </li>

                            <li>
                                <a href="#" @click.stop.prevent="login_dialog = true" v-if="!is_login">
                                    <i class="fas fa-lock-alt"></i> Login
                                </a>
                                <a href="#" v-else @click.stop.prevent="onLogout()">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Login form -->
        <div class="login-dialog">
            <v-dialog
                    v-model="login_dialog"
                    max-width="500px"
                    class="login-section"
                    @keydown.esc="onLoginDialogClose()">
                <v-card>
                    <v-card-text class="login-section">
                        <v-form method="post" v-model="valid" ref="login_form">
                            <v-layout row wrap id="login-section">

                                <v-flex xs12>
                                    <h2 class="login-title">LOGIN</h2>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            color="dark"
                                            label="Full Name:"
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
                                        <!--<div class="login-progress">-->
                                            <!--<v-progress-circular v-if="login_progress" indeterminate color="dark"></v-progress-circular>-->
                                        <!--</div>-->
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


            <!-- Password reset dialog box -->
            <v-dialog v-model="password_reset_dialog" max-width="500px">
                <v-card>
                    <v-card-text class="login-section">
                        <v-form v-model="valid" ref="forgot_password_form" @submit.prevent="onForgotPassword()">
                            <v-container grid-list-xs>
                                <v-layout row wrap id="login-section">

                                    <v-flex xs12>
                                        <h2 class="login-title">FORGOT PASSWORD</h2>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-text-field
                                                color="dark"
                                                label="Email:"
                                                v-model="user.email"
                                                :rules="emailRules"
                                                required
                                                :error="validation.error"
                                                autofucus
                                        >
                                        </v-text-field>
                                    </v-flex>

                                    <v-flex xs12 v-if="active_password_reset">
                                        <p :class="{'red--text': password_reset_error, 'green--text': password_reset_success}">{{ password_reset_text }}</p>
                                    </v-flex>

                                </v-layout>

                                <v-layout row wrap>
                                    <v-flex xs12 class="text-xs-center">
                                        <v-btn
                                                raised
                                                dark
                                                @click="onForgotPassword()"
                                                :loading="loading"
                                                :disabled="loading"
                                        >
                                            SEND EMAIL
                                        </v-btn>
                                    </v-flex>

                                    <v-flex xs12 class="text-xs-center">
                                        <v-btn color="dark" flat @click.stop="password_reset_dialog=false">Close</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog><!-- End password reset -->
        </div>

        <!-- Logout snackbars -->
        <v-snackbar
                top="top"
                :timeout="logoutTime"
                v-model="logout">
            {{ logout_text }}
            <v-btn flat color="light" @click.native="logout = false">Close</v-btn>
        </v-snackbar>
        <!-- End logout -->
    </section>
</template>
<script>
    export default {
        data() {
            return {
                nav_background: false,
                csrf_token : $('meta[name="csrf-token"]').attr('content'),
                login_dialog: false,
                showpassword:true,
                valid:false,
                login_progress:false,
                user:{
                    email:'',
                    password:''
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
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

                //Password reset section
                password_reset_dialog: false,
                active_password_reset: false,
                password_reset_error: false,
                password_reset_success: false,
                password_reset_text:'',

                //user auth
                is_login: false,

                //logout
                logout: true,
                logoutTime: 3000,
                logout_text: 'you are successfully logout',

            }
        },

        watch: {
            // Detach which page and set navigation background
            $route(to, from, next){
                if(to.name != 'home'){
                    this.nav_background = true;
                }else{
                    this.nav_background = false;
                }
            },

            is_login(){
                console.log('login call');
            }
        },

        created(){
            this.$store.dispatch('getLoginStatus');
            if(this.$route.name != 'home'){
                this.nav_background = true;
            }else{
                this.nav_background = false;
            }
        },

        methods: {
            onForgotforgotDialog(){
                this.login_dialog = false;
                setTimeout(()=> {
                    this.password_reset_dialog = true;
                }, 500);
            },

            onLogout(){
                axios.get('/islogin')
                    .then(response => {
                        console.log(response);
                    });
            },

            onForgotPassword() {
                if(this.$refs.forgot_password_form.validate()){
                    this.loading = true;
                    this.password_reset_success = false;
                    this.password_reset_error = false;   
                    this.active_password_reset = false;
                    
                    let password_reset_form = new FormData();
                    password_reset_form.append('email', this.user.email);

                    axios.post('/password/reset', password_reset_form)
                        .then(response => {
                            let result = response.data;

                            if(!result.error){
                                // success to send email
                                setTimeout(() => {
                                    this.loading = false;

                                    this.password_reset_success = true;
                                    this.password_reset_text = result.success;
                                    this.active_password_reset = true;
                                    this.$refs.forgot_password_form.reset();

                                    setTimeout( ()=>{
                                        this.password_reset_dialog = false;
                                        
                                        //Clear all for next time use
                                        setTimeout(() => {
                                            this.password_reset_dialog= false,
                                            this.active_password_reset= false,
                                            this.password_reset_error= false,
                                            this.password_reset_success= false,
                                            this.password_reset_text= ''
                                        }, 2000);

                                    }, 3000);
                                }, 1000)
                            }else{
                                setTimeout(() => {
                                    this.loading = false;
                                    this.password_reset_error = true;
                                    this.password_reset_text = result.error;
                                    this.active_password_reset = true;
                                }, 1000);        
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }

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
                    console.log("process login");

                    // prepare submitting data
                    let form_data = new FormData();
                    form_data.append('email', this.user.email);
                    form_data.append('password', this.user.password);

                    // submit data with ajax request
                    axios.post('/login', form_data)
                        .then(response => {
                            this.login_progress = true;
                            this.loading = false;
                            console.log(response);
                            let data = response.data;
                            if(data.error){
                                this.login_progress = false;
                                this.loading = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            if(data.redirect_url){
                                window.location.href = data.redirect_url;
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        }
    }
</script>