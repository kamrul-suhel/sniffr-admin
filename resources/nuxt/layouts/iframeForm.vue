<template>
    <section id="sniffr">
        <v-app>
            <v-content v-if="sniffrStateReady">
                <nuxt/>
            </v-content>
        </v-app>
    </section>
</template>
<script>
    export default {

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
