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
                                    <v-icon color="white" left>file_upload</v-icon> Upload
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/videos">
                                    <v-icon color="white" left>videocam</v-icon> Videos
                                </router-link>
                            </li>

                            <li>
                                <a  @click.stop.prevent="onLoginClick()" v-if="!is_login">
                                    <v-icon color="white" left>lock_open</v-icon> Login
                                </a>
                                <v-menu bottom open-on-hover offset-y v-else min-width="140px">
                                    <a slot="activator"><v-icon color="white">face</v-icon> {{ user.name }}</a>
                                    <v-list>
                                        <v-list-tile>
                                            <v-list-tile-title>
                                                <a href="/admin">
                                                    <v-icon color="white" left size="20px">settings</v-icon> Admin
                                                </a>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-title>
                                                <a @click.prevent.stop="onLogout()">
                                                    <v-icon color="white" left size="20px">lock_out</v-icon> Logout
                                                </a>
                                            </v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </li>
                        </ul>
                    </nav>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Login component -->
        <login-component></login-component>
        <!-- End login component -->
            
        <!-- Password reset dialog box -->
        <forgot-password-component></forgot-password-component>
        <!-- End password reset -->

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
    import LoginComponent from '../includes/LoginComponent';
    import ForgotPasswordComponent from '../includes/ForgotPasswordComponent';
    import LoginEventBus from '../../event-bus/login-event-bus.js';
    export default {
        components: {
            LoginComponent,
            ForgotPasswordComponent
        },
        data() {
            return {
                nav_background: false,
                //Password reset section
                password_reset_dialog: false,
                //user auth
                is_login: false,
                //logout
                logout: false,
                logoutTime: 3000,
                logout_text: 'you are successfully logout',
                //if user login all data
                user: '',
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
                // see user status
                this.$store.dispatch('getLoginStatus').then((response) => {
                    this.is_login = this.$store.getters.isUserLogin;
                    if(this.is_login){
                        this.user = this.$store.getters.getUser;
                    }
                });
            },
            
            is_login(){
            }
        },
        created(){
            this.$store.dispatch('getLoginStatus').then((response) => {
                this.is_login = this.$store.getters.isUserLogin;
                if(this.is_login){
                    this.user = this.$store.getters.getUser;
                    console.log(this.user);
                }
            });
            if(this.$route.name != 'home'){
                this.nav_background = true;
            }else{
                this.nav_background = false;
            }
        },
        methods: {
            onLogout(){
                this.$store.dispatch('userLogout')
                    .then((response) => {
                        this.logout = true;
                        this.is_login = this.$store.getters.isUserLogin;
                        setTimeout(() => {
                            this.logout = false;
                        }, 3500);
                    });
            },
            // ForgotPasswordComponent trigger this methods when value change
            onChangeForgotPassword(changeForgot) {
                this.password_reset_dialog = true;
            },
            onClosePasswordDialog(changeForgotPassword){
                if(!changeForgotPassword){
                    this.password_reset_dialog = false;
                }
            },
            // Login component trigger this methods when change any value
            onChangeLogin(changeLogin){
                if(!changeLogin){
                    this.login_dialog = false; 
                }
            },
            onLoginClick(){
                LoginEventBus.openLoginDialog();
            }
        }
    }
</script>