<template>
    <!-- Client section -->
    <div class="client-section">

        <!-- Client content SECTION -->
        <section class="client-content" align-content-end v-if="content_show">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex class="text-xs-right">
                        <div class="client-nav">
                            <v-speed-dial
                                    v-model="fab"
                                    left
                                    :direction="direction"
                                    :open-on-hover="hover"
                                    transition="slide-y-reverse-transition"
                            >
                                <v-btn
                                        slot="activator"
                                        v-model="fab"
                                        small
                                        color="dark"
                                        dark
                                        fab
                                >
                                    <v-icon>account_circle</v-icon>
                                    <v-icon>close</v-icon>
                                </v-btn>
                                <!--<v-btn-->
                                        <!--fab-->
                                        <!--dark-->
                                        <!--small-->
                                        <!--color="dark"-->
                                        <!--@click="onClientStories()"-->
                                <!--&gt;-->
                                    <!--<v-tooltip bottom>-->
                                        <!--<v-icon slot="activator">alternate_email</v-icon>-->
                                        <!--<span>Email</span>-->
                                    <!--</v-tooltip>-->
                                <!--</v-btn>-->

                                <v-btn
                                        fab
                                        dark
                                        small
                                        color="dark"
                                        @click="onClientEmail()"
                                >
                                    <v-tooltip>

                                        <v-icon slot="activator">library_books</v-icon>
                                        <span>Stories</span>
                                    </v-tooltip>
                                </v-btn>

                            </v-speed-dial>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>

            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    import LoginEventBus from "../../../event-bus/login-event-bus";

    export default {
        data() {
            return {
                content_show: false,
                direction: 'right',
                fab: false,
                fling: false,
                hover: true,
            }
        },

        created() {
            LoginEventBus.$on('clientLoginSuccess', () => {
                this.content_show = true;
            })

            //Logout button click then you can not see any of page
            LoginEventBus.$on('logoutChangeState', () => {
                this.$router.push({name: 'home'});
            });
            this.checklogin();
        },

        updated(){

        },

        methods: {
            checklogin(){
                this.$store.dispatch('getLoginStatus').then((response) => {
                    let login_status = this.$store.getters.isUserLogin;
                    if (!login_status) {
                        this.$store.commit('setAttemptRoute', this.$route);
                        LoginEventBus.openLoginDialog();
                    } else {
                        this.content_show = true;
                    }
                });


            },

            onClientEmail(){
                this.$router.push({name: 'client_mail'});
            },

            onClientStories(){
                this.$router.push({name: 'client'});
            }
        }
    }
</script>

<style scoped>

</style>