<template>
    <section id="nav" class="section-space" :class="{ 'nav-background' : nav_background}">
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg4>
                    <div class="logo">
                        <router-link to="/">
                            <img src="assets/frontend/images/logo-sniffr-white.png"/>
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
                                <a href="#" @click.stop.prevent="login_dialog = true">
                                    <i class="fas fa-lock-alt"></i> Login
                                </a>
                            </li>

                            <!--<li>-->
                                <!--<v-menu open-on-hover offset-y>-->
                                    <!--<v-btn color="white" outline slot="activator">-->
                                        <!--<v-icon left>keyboard_arrow_down</v-icon>{{Auth::user()->username}}-->
                                    <!--</v-btn>-->
                                    <!--<v-list>-->
                                        <!--<v-list-tile-title><a href="<?= url('user') ?><?= '/' . Auth::user()->username; ?>">My Profile</a></v-list-tile-title>-->
                                        <!--<v-list-tile-title><a href="<?= url('client/dashboard') ?>">Dailies</a></v-list-tile-title>-->
                                        <!--<v-list-title-title><a href="<?= url('logout') ?>" id="user-logout-mobile"><i class="fa fa-power-off"></i> Logout</a></v-list-title-title>-->
                                    <!--</v-list>-->
                                <!--</v-menu>-->
                            <!--</li>-->
                        </ul>
                    </nav>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Login form -->
        <section class="login-dialog">
            <v-dialog v-model="login_dialog" max-width="500px" class="login-section">
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
                                        <v-btn raised dark @click="onSubmit()">
                                            LOGIN
                                        </v-btn>
                                        <div class="login-progress">
                                            <v-progress-circular v-if="login_progress" indeterminate color="dark"></v-progress-circular>
                                        </div>
                                    </div>
                                </v-flex>
                            </v-layout>

                            <v-layout row justify-center>
                                <v-flex xs12 text-xs-center>
                                    <a href="password.remind" class="forgot-password">Forgot password</a>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </section>

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
                }
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
            }
        },
        methods: {
            onSubmit() {
                console.log("Process");
                if(this.$refs.login_form.validate()){
                    // make spinner visible
                    this.login_progress = true;
                    console.log("process login");

                    // prepare submitting data
                    let form_data = new FormData();
                    form_data.append('email', this.user.email);
                    form_data.append('password', this.user.password);

                    // submit data with ajax request
                    axios.post('/login', form_data)
                        .then(response => {
                            this.login_progress = true;

                            let data = response.data;
                            if(data.error){
                                this.login_progress = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            console.log(response);

                            if(data.redirect_url){
                                window.location.href = data.redirect_url;
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }else{
                    console.log('not valid');
                }
            }
        }
    }
</script>