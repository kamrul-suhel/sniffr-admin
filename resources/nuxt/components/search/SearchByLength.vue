<template>
    <div class="videos-filter-form mt-4">
        <v-card>
            <v-card-title class="search-title">
                <h3>Search by video length</h3>
            </v-card-title>
            <v-card-text class="search-content">
                <v-select
                        :items="minOptions"
                        label="Min"
                    ></v-select>

                <v-select
                    :items="maxOptions"
                    label="Max"
                ></v-select>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                minOptions: [
                    {
                        text: '10s',
                        value: 10
                    },
                    {
                        text: '15s',
                        value: 15
                    },
                    {
                        text: '30s',
                        value: 30
                    },
                    {
                        text: '1 Minute',
                        value: 1000
                    },
                    {
                        text: '1.5 Minute',
                        value: 1500
                    },
                    {
                        text: '2 Minutes',
                        value: 2000
                    },
                    {
                        text: '3 Minutes',
                        value: 3000
                    },
                    {
                        text: '4 Minutes',
                        value: 4000
                    },
                    {
                        text: '5 Minutes',
                        value: 5000
                    },
                    {
                        text: '6 Minutes',
                        value: 6000
                    },
                    {
                        text: '7 Minutes',
                        value: 7000
                    }
                ],

                maxOptions: this.minOptions,

                defaultOption: []
            }
        },

        created(){
            this.defaultOption = this.options;
            console.log(this.defaultOption)
        },

        methods: {

        },

    }
</script>