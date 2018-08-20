<template>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
            <!--<navigation-component/>-->

            <v-content>
                <div id="scroll_to"></div>
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-content>
            <!--<footer-component/>-->
        </v-app>
    </section>
</template>
<script>
    import NavigationComponent from '../components/Navigation'
    import FooterComponent from "../components/FooterComponent"
    import axios from 'axios';
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
                    console.log(this.$store.getters.getSettingsObject);
                })
        },

        data: () => ({
            sniffrStateReady : false
        }),

        methods:{
        }
    }
</script>
