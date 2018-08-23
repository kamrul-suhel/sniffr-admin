<template>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
            <navigation-component/>

            <v-content>
                <div id="scroll_to"></div>
                <transition name="slide-fade" mode="out-in">
                    <nuxt/>
                </transition>
            </v-content>

            <footer-component/>
        </v-app>
    </section>
</template>
<script>
    import NavigationComponent from '@/components/Navigation'
    import FooterComponent from "@/components/FooterComponent"
    import mapGetters from 'vuex';
    export default {

        components: {
          NavigationComponent,
            FooterComponent
        },

        created(){
            this.$store.dispatch('setSettingObjectFromServer')
                .then((data) => {
                    this.$store.commit('setUserStatus', data.sniffr_app);
                    this.sniffrStateReady = true
                })
        },

        data: () => ({
            sniffrStateReady : false
        }),

        methods:{
        }
    }
</script>
