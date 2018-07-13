<template>
    <div class="client-user-create">
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
            axios.get('/client/profile/'+slug+'/users/create').then((response) => {
                this.html = response.data;
            });
        },

        methods: {

        },
    }
</script>