<template>
    <!-- Client section -->
    <div class="client-section">
        <!-- Client content SECTION -->
        <section class="client-content section-space" align-content-end v-if="content_show">
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