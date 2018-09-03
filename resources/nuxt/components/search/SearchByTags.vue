<template>
    <v-card class="mt-4 tags-search">
        <v-card-title class="search-title">
            <h3>Search by tags</h3>
        </v-card-title>

        <v-card-text class="search-content">
            <v-layout row wrap>
                <v-flex xs6 py-0 v-for="(tag, index) in tagItems" :key="index">
                    <v-checkbox color="dark"
                                class="checkbox"
                                v-model="tags"
                                :label="tag.text"
                                :value="tag.value"
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
                tags: [],
                tagItems:[
                    {
                        text: 'Poll',
                        value: 'poll'
                    },
                    {
                        text: 'Misses',
                        value: 'misses'
                    },
                    {
                        text: 'Slips',
                        value: 'slips'
                    },
                    {
                        text: 'Water',
                        value: 'water'
                    },
                    {
                        text: 'Girl',
                        value: 'girl'
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