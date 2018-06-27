<template>
    <div class="stories-component">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Stories</h1>
                </div>
            </div>
        </section>

        <search-component @searchOption="searchOption($event)"></search-component>

        <section class="section-space">
            <v-container grid-list-lg class="stories">
                <v-layout row wrap>
                    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
                        <v-layout row wrap>
                            <v-flex xs5>
                                <v-card height="100%">
                                    <v-card-media src="/assets/frontend/images/placeholder.png" height="100%"/>
                                </v-card>
                            </v-flex>

                            <v-flex xs7>
                                <h2>Title</h2>
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum enim laborum nobis obcaecati. Adipisci, architecto aut consequatur dolores enim in, magnam magni officiis, optio quidem quis quisquam recusandae repudiandae.</p>
                                <v-layout row wrap align-end>
                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>

                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                    <v-flex xs4 >
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
                        <v-layout row wrap>
                            <v-flex xs5>
                                <v-card height="100%">
                                    <v-card-media src="/assets/frontend/images/placeholder.png" height="100%"/>
                                </v-card>
                            </v-flex>

                            <v-flex xs7>
                                <h2>Title</h2>
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum enim laborum nobis obcaecati. Adipisci, architecto aut consequatur dolores enim in, magnam magni officiis, optio quidem quis quisquam recusandae repudiandae.</p>
                                <v-layout row wrap align-end>
                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>

                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                    <v-flex xs4 >
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
                        <v-layout row wrap>
                            <v-flex xs5>
                                <v-card height="100%">
                                    <v-card-media src="/assets/frontend/images/placeholder.png" height="100%"/>
                                </v-card>
                            </v-flex>

                            <v-flex xs7>
                                <h2>Title</h2>
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum enim laborum nobis obcaecati. Adipisci, architecto aut consequatur dolores enim in, magnam magni officiis, optio quidem quis quisquam recusandae repudiandae.</p>
                                <v-layout row wrap align-end>
                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>

                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                    <v-flex xs4 >
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
                        <v-layout row wrap>
                            <v-flex xs5>
                                <v-card height="100%">
                                    <v-card-media src="/assets/frontend/images/placeholder.png" height="100%"/>
                                </v-card>
                            </v-flex>

                            <v-flex xs7>
                                <h2>Title</h2>
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolorum enim laborum nobis obcaecati. Adipisci, architecto aut consequatur dolores enim in, magnam magni officiis, optio quidem quis quisquam recusandae repudiandae.</p>
                                <v-layout row wrap align-end>
                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>

                                    <v-flex xs4>
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                    <v-flex xs4 >
                                        <v-btn dark color="dark" block class="mb-0">Buy</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-flex>


                </v-layout>
            </v-container>
        </section>
    </div>
</template>

<script>
    import SearchComponent from '../../includes/SearchComponent'
    export default {
        components :{
            SearchComponent
        },

        data(){
            return {

            }
        },

        created(){

        },

        methods: {

        }
    }
</script>