<template>
    <section id="sniffr">
        <v-app>
            <v-content>
                <div id="scroll_to"></div>
                <nuxt/>
            </v-content>
        </v-app>
    </section>
</template>
<script>
    export default {
        data: () => ({
            sniffrStateReady : false
        }),

        created(){
            this.$store.dispatch('setSettingObjectFromServer')
                .then((data) => {
                    this.$store.commit('setUserStatus', data.sniffr_app);
                    this.sniffrStateReady = true
                })
        },

        methods:{
        }
    }
</script>
