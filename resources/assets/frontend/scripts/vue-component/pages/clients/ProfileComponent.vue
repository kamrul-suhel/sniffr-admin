<template>
    <div class="client-profile">
        <div v-html="html"></div>
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
            axios.get('/client/profile').then((response) => {
                this.html = response.data;
            });
        },

        methods: {

        },
    }
</script>