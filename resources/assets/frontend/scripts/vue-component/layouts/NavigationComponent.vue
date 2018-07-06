<template>
    <section id="nav" class="section-space" :class="{ 'nav-background' : nav_background}">
        <v-container grid-list-lg>
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
                            <li v-if="!client_login">
                                <router-link to="/upload">
                                    <v-icon color="white" left>file_upload</v-icon> Upload
                                </router-link>
                            </li>

                            <li v-if="client_login && this.$store.getters.getUser.offers >= 1">
                                <router-link :to="{name: 'client_offered_assets'}">
                                    <v-icon color="white" left>gavel</v-icon> My Offers ({{ this.$store.getters.getUser.offers }})
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/videos">
                                    <v-icon color="white" left>videocam</v-icon> Videos
                                </router-link>
                            </li>

                            <li v-if="client_login">
                                <router-link to="/stories">
                                    <v-icon color="white" left>art_track</v-icon> Stories
                                </router-link>
                            </li>

                            <li>
                                <a  @click.stop.prevent="onLoginClick()" v-if="!is_login">
                                    <v-icon color="white" left>lock_open</v-icon> Login
                                </a>
                                <v-menu bottom open-on-hover offset-y v-else min-width="140px">
                                    <a slot="activator"><v-icon color="white">face</v-icon> {{ user.name }}</a>
                                    <v-list>
                                        <v-list-tile v-if="!client_login">
                                            <v-list-tile-title>
                                                <a href="/admin">
                                                    <v-icon color="white" left size="20px">settings</v-icon> Admin
                                                </a>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile v-if="client_login">
                                            <v-list-tile-title>
                                                <a href="/client/profile">
                                                    <v-icon color="white" left size="20px">settings</v-icon> Account Settings
                                                </a>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile v-if="client_login">
                                            <v-list-tile-title>
                                                <router-link :to="{name: 'client_purchased_assets'}">
                                                    <v-icon color="white" left size="20px">attach_money</v-icon> Order History
                                                </router-link>
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

        <!-- Quote Component -->
        <quote-component></quote-component>
        <!-- End request quote component -->

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
    import LoginComponent from '../includes/LoginComponent'
    import ForgotPasswordComponent from '../includes/ForgotPasswordComponent'
    import QuoteComponent from '../includes/QuoteComponent'
    import LoginEventBus from '../../event-bus/login-event-bus'
    export default {
        components: {
            LoginComponent,
            ForgotPasswordComponent,
            QuoteComponent
        },
        data() {
            return {
                nav_background: false,
                //Password reset section
                password_reset_dialog: false,

                //user auth
                is_login: false,
                client_login: false,

                //logout
                logout: false,
                logoutTime: 3000,
                logout_text: 'You have successfully logged out',

                //if user login all data
                user: '',
            }
        },
        watch: {
            // Detach which page and set navigation background
            $route(to, from, next){
                this.onResetPrevRoute();

                if(to.name != 'home'){
                    this.nav_background = true;
                }else{
                    setTimeout(() => {
                        this.nav_background = false;
                    }, 800);
                }
            }
        },
        created(){
            this.setPrevRoute();

            this.user = this.$store.getters.getUser;

            LoginEventBus.$on('logoutChangeState', () => {
                this.is_login = false;
                this.client_login = false;
            });

            // If client has logged in
            LoginEventBus.$on('loginSuccess', () => {
                this.user = this.$store.getters.getUser;
                this.is_login = this.$store.getters.isUserLogin;
                this.client_login = this.$store.getters.isClientLogin;
            });

            // On every navigation load, check to see if user is logged in
            this.$store.dispatch('getLoginStatus').then((response) => {
                this.is_login = this.$store.getters.isUserLogin;
                this.client_login = this.$store.getters.isClientLogin;
            });

            this.$store.dispatch('setSettingObjectFromServer').then(() => {
                this.settings = this.$store.getters.getSettingsObject;
            });


            if(this.$route.name !== 'home'){
                this.nav_background = true;
            }else{
                this.nav_background = false;
            }
        },
        methods: {
            setPrevRoute(){
                let routeUrl = this.$store.getters.getRouteUrl;
                if(routeUrl === '' ){
                    if(this.$route.name === 'client_story_detail'){
                        this.$store.commit('setRouteUrl', 'client_stories')
                    }else if(this.$route.name === 'client_video_detail'){
                        this.$store.commit('setRouteUrl', 'client_videos')
                    }
                }else{
                    this.$store.commit('setRouteUrl', '')
                }
            },

            onResetPrevRoute(){
                this.$store.commit('setRouteUrl', '');
            },

            onLogout(){
                this.$store.dispatch('userLogout')
                    .then((response) => {
                        this.logout = true;
                        this.is_login = this.$store.getters.isUserLogin;
                        LoginEventBus.logoutStateChange();
                        setTimeout(() => {
                            this.logout = false;
                        }, 3500);
                    });
            },

            // Login component trigger this methods when change any value
            onChangeLogin(changeLogin){
                if(!changeLogin){
                    this.login_dialog = false;
                }
            },

            onLoginClick(){
                LoginEventBus.openLoginDialog();
            },

            logoutStateChange() {
              this.is_login = false;
            }
        }
    }
</script>