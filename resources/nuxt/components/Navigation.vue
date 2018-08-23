<template>
    <section id="nav"
             class="section-space"
             :class="{ 'nav-background' : nav_background}">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex xs12 sm4>
                    <div class="logo">
                        <nuxt-link to="/">
                            <img src="~/assets/images/logo-sniffr-white.png"/>
                        </nuxt-link>
                    </div>
                </v-flex>

                <v-flex xs12 sm8>
                    <nav class="navigation">
                        <ul>
                            <li v-if="!client_login">
                                <nuxt-link to="/upload_video">
                                    <v-icon left
                                            color="white">file_upload
                                    </v-icon>
                                    Upload
                                </nuxt-link>
                            </li>

                            <li v-if="client_login && user.offers >= 1">
                                <nuxt-link :to="{name: 'client_offered_assets', query:{type: 'offered'}}">
                                    <v-icon left
                                            color="white">gavel
                                    </v-icon>
                                    My Offers ({{ user.offers }})
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link :to="{name: 'videos'}">
                                    <v-icon left
                                            color="white">videocam
                                    </v-icon>
                                    Videos
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link :to="{name: 'stories'}">
                                    <v-icon color="white" left>art_track</v-icon>
                                    Stories
                                </nuxt-link>
                            </li>

                            <li>
                                <a @click.stop.prevent="onLoginClick()"
                                   v-if="!user.user_login">
                                    <v-icon left
                                            color="white">lock_open
                                    </v-icon>
                                    Login
                                </a>
                                <v-menu bottom
                                        open-on-hover
                                        offset-y
                                        v-else
                                        min-width="140px">
                                    <a slot="activator">
                                        <v-icon color="white">face</v-icon>
                                        {{ user.name }}
                                    </a>

                                    <v-list>
                                        <v-list-tile v-if="!client_login">
                                            <v-list-tile-title>
                                                <a href="/admin">
                                                    <v-icon color="white"
                                                            left size="20px">settings
                                                    </v-icon>
                                                    Admin
                                                </a>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile v-if="client_login">
                                            <v-list-tile-title>
                                                <nuxt-link :to="{name: 'client_profile'}">
                                                    <v-icon left
                                                            size="20px"
                                                            color="white">settings
                                                    </v-icon>
                                                    Account Settings
                                                </nuxt-link>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile v-if="client_login">
                                            <v-list-tile-title>
                                                <nuxt-link
                                                        :to="{name: 'client_purchased_assets', query:{type: 'purchased'}}">
                                                    <v-icon left
                                                            size="20px"
                                                            color="white">history
                                                    </v-icon>
                                                    Order History
                                                </nuxt-link>
                                            </v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile>
                                            <v-list-tile-title>
                                                <a @click.prevent.stop="onLogout()">
                                                    <v-icon left
                                                            size="20px"
                                                            color="white">lock_out
                                                    </v-icon>
                                                    Logout
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
    </section>
</template>
<script>
    import LoginComponent from './includes/LoginComponent'
    import ForgotPasswordComponent from './ForgotPasswordComponent'
    import QuoteComponent from './QuoteComponent'

    import {mapGetters} from 'vuex';

    export default {
        components: {
            LoginComponent,
            ForgotPasswordComponent,
            QuoteComponent
        },
        data() {
            return {
                nav_background: false
            }
        },

        computed: {
            ...mapGetters({
                client_login: 'getClientLogin',
                user: 'getUserStatus'
            }),
        },

        watch: {
            $route(to, from, next) {
                this.onResetPrevRoute();
                if (to.name != 'index') {
                    this.nav_background = true;
                } else {
                    setTimeout(() => {
                        this.nav_background = false;
                    }, 800);
                }

                //set offered page or not
                this.$route.name === 'client_offered_assets' ? this.$store.commit('setIsOfferedPage', true) : this.$store.commit('setIsOfferedPage', false);
            }
        },
        created() {
            this.setPrevRoute();
            this.settings = this.$store.getters.getSettingsObject;

            if (this.$route.name !== 'home') {
                this.nav_background = true;
            } else {
                this.nav_background = false;
            }

            //set offered page or not
            this.$route.name === 'client_offered_assets' ? this.$store.commit('setIsOfferedPage', true) : this.$store.commit('setIsOfferedPage', false);
        },
        methods: {
            setPrevRoute() {
                let routeUrl = this.$store.getters.getRouteUrl;
                if (routeUrl === '') {
                    if (this.$route.name === 'client_story_detail') {
                        this.$store.commit('setRouteUrl', 'client_stories')
                    } else if (this.$route.name === 'client_video_detail') {
                        this.$store.commit('setRouteUrl', 'client_videos')
                    }
                } else {
                    this.$store.commit('setRouteUrl', '')
                }
            },

            onResetPrevRoute() {
                this.$store.commit('setRouteUrl', '');
            },

            onLogout() {
                let toast = {
                    message: 'You have successfully logged out'
                };
                this.$store.dispatch('userLogout');
                this.$store.commit('setToast', toast);
                return this.$router.push({path: '/'});
            },

            // Login component trigger this methods when change any value
            onLoginClick() {
                this.$store.commit('setLoginDialog', true);
            }
        }
    }
</script>
