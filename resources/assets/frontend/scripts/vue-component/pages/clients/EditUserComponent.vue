<template>
    <div class="client-user-edit">
        <v-container grid-list-lg class="py-0">
            <div v-html="html"></div>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                html:''
            }
        },

        created(){
            let slug = this.$route.params.slug;
            let userId = this.$route.params.userid;
            axios.get('/client/profile/'+slug+'/users/'+userId+'/edit').then((response) => {
                this.html = response.data;
            });
        },

        methods: {

        },
    }
</script>