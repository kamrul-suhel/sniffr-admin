<template>
    <section id="sniffr">
        <v-app v-if="sniffrStateReady">
            <navigation-component/>
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
            sniffrStateReady : true
        }),

        created(){
        },

        methods:{
        }
    }
</script>
