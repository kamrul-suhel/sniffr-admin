<template>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
            <navigation-component/>
            <Breadcrumbs/>

            <v-content>
                <div id="scroll_to"></div>
                <nuxt/>
            </v-content>

            <footer-component/>
        </v-app>
    </section>
</template>
<script>
    import NavigationComponent from '@/components/Navigation'
    import FooterComponent from "@/components/FooterComponent"
    import Breadcrumbs from "@/components/Breadcrumbs"
    export default {
        components: {
          NavigationComponent,
            FooterComponent,
            Breadcrumbs
        },

        data: () => ({
            sniffrStateReady : false
        }),

        created(){
            this.$store.dispatch('setSettingObjectFromServer')
                .then((data) => {
                    this.$store.commit('setAllTags', data.tags);
                    this.$store.commit('setUserStatus', data.sniffr_app);
                    this.sniffrStateReady = true
                })
        },

        methods:{
        }
    }
</script>
