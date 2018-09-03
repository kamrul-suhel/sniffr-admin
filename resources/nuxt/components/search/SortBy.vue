<template>
    <v-card class="mt-4 sort-search">
        <v-card-title class="search-title">
            <h3>Search by tags</h3>
        </v-card-title>

        <v-card-text class="search-content">
            <v-layout row wrap>
                <v-flex xs12 py-0 v-for="(sort, index) in sortItems" :key="index">
                    <v-checkbox color="dark"
                                class="checkbox"
                                v-model="sortBy"
                                :label="sort.text"
                                :value="sort.value"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>

</template>

<script>
    export default {
        data(){
            return {
                sortBy: '',
                sortItems:[
                    {
                        text: 'New video first',
                        value: 'newVideo'
                    },
                    {
                        text: 'New video last',
                        value: 'newVideoLast'
                    },
                    {
                        text: 'Video length max first',
                        value: 'videoMax'
                    },
                    {
                        text: 'Video length min first',
                        value: 'videoMin'
                    }
                ]
            }
        },

        created() {

        },
        methods: {
        }
    }
</script>