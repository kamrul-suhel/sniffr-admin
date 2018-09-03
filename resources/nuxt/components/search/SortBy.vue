<template>
    <v-card class="mt-4">
        <v-card-title class="search-title">
            <h3>Sort by</h3>
        </v-card-title>
        <v-card-text class="search-content">
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return {

            }
        },

        props: [
            'searchOption'
        ],
        created() {

        },
        methods: {
            onSearchActive() {
                if (this.$route.name === 'stories') {
                    this.$router.push({name: 'stories', query: {search: this.value, page: 1}});
                } else {
                    this.$router.push({name: 'videos', query: {search: this.value, page: 1}});
                }
            }
        }
    }
</script>