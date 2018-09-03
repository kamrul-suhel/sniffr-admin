<template>
    <div class="videos-filter-form mt-4">
        <v-card>
            <v-card-title class="search-title">
                <h3>Search by video length</h3>
            </v-card-title>
            <v-card-text class="search-content">
                <div class="form-group">
                    <v-text-field
                            type="text"
                            name="value"
                            v-model="value"
                            color="dark"
                            label="Search"
                            append-icon="search"
                            aria-describedby="filterhelp"
                            @change="onSearchActive"
                            @keyup.enter="onSearchActive"
                            autocomplete="off">
                    </v-text-field>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },

        created(){

        },

        methods: {

        },

    }
</script>