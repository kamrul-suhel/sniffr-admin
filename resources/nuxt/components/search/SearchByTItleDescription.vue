<template>
    <v-card>
        <v-card-title class="pb-0 search-title">
            <h3>Search</h3>
        </v-card-title>
        <v-card-text class="pt-0 search-content">
            <div class="form-group">
                <v-text-field
                        type="text"
                        name="value"
                        v-model="value"
                        color="dark"
                        label="Search by title"
                        append-icon="search"
                        aria-describedby="filterhelp"
                        @change="onSearchActive"
                        @keyup.enter="onSearchActive"
                        autocomplete="off">
                </v-text-field>
            </div>
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