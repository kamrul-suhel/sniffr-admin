<template>
    <!-- Client section -->
    <div class="client-section">

        <!-- Client content SECTION -->
        <section class="client-content section-space" align-content-end v-if="content_show">
            <!--<v-container grid-list-xl>-->
                <!--<v-layout row wrap>-->
                    <!--<v-flex class="text-xs-right">-->
                        <!--&lt;!&ndash;<div class="client-nav">&ndash;&gt;-->
                            <!--&lt;!&ndash;<v-speed-dial&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-model="fab"&ndash;&gt;-->
                                    <!--&lt;!&ndash;left&ndash;&gt;-->
                                    <!--&lt;!&ndash;:direction="direction"&ndash;&gt;-->
                                    <!--&lt;!&ndash;:open-on-hover="hover"&ndash;&gt;-->
                                    <!--&lt;!&ndash;transition="slide-y-reverse-transition"&ndash;&gt;-->
                            <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                                <!--&lt;!&ndash;<v-btn&ndash;&gt;-->
                                        <!--&lt;!&ndash;slot="activator"&ndash;&gt;-->
                                        <!--&lt;!&ndash;v-model="fab"&ndash;&gt;-->
                                        <!--&lt;!&ndash;small&ndash;&gt;-->
                                        <!--&lt;!&ndash;color="dark"&ndash;&gt;-->
                                        <!--&lt;!&ndash;dark&ndash;&gt;-->
                                        <!--&lt;!&ndash;fab&ndash;&gt;-->
                                <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-icon>account_circle</v-icon>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-icon>close</v-icon>&ndash;&gt;-->
                                <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
                                <!--&lt;!&ndash;&lt;!&ndash;<v-btn&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;fab&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;dark&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;small&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;color="dark"&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;@click="onClientStories()"&ndash;&gt;&ndash;&gt;-->
                                <!--&lt;!&ndash;&lt;!&ndash;&gt;&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;<v-tooltip bottom>&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;<v-icon slot="activator">alternate_email</v-icon>&ndash;&gt;&ndash;&gt;-->
                                        <!--&lt;!&ndash;&lt;!&ndash;<span>Email</span>&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;&lt;!&ndash;</v-tooltip>&ndash;&gt;&ndash;&gt;-->
                                <!--&lt;!&ndash;&lt;!&ndash;</v-btn>&ndash;&gt;&ndash;&gt;-->

                                <!--&lt;!&ndash;<v-btn&ndash;&gt;-->
                                        <!--&lt;!&ndash;fab&ndash;&gt;-->
                                        <!--&lt;!&ndash;dark&ndash;&gt;-->
                                        <!--&lt;!&ndash;small&ndash;&gt;-->
                                        <!--&lt;!&ndash;color="dark"&ndash;&gt;-->
                                        <!--&lt;!&ndash;@click="onClientEmail()"&ndash;&gt;-->
                                <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                                    <!--&lt;!&ndash;<v-tooltip>&ndash;&gt;-->

                                        <!--&lt;!&ndash;<v-icon slot="activator">library_books</v-icon>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<span>Stories</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;</v-tooltip>&ndash;&gt;-->
                                <!--&lt;!&ndash;</v-btn>&ndash;&gt;-->

                            <!--&lt;!&ndash;</v-speed-dial>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
            <!--</v-container>-->
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
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