<template>
    <!-- VIDEOS ITEM SECTION -->
    <section class="videos-section">
        <section id="header" class="page-videos">
            <div class="header-content">
                <div class="position-center">
                    <h1 class="heading">Videos</h1>
                </div>
            </div>
        </section>
        
        <search-component></search-component>

        <!-- VIDEOS ITEM SECTION -->
        <section class="videos-section section-space">
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <h2>Some vlad</h2>
                        <v-btn raised @click="getData">get data</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </section>
</template>
<script>
    import SearchComponent from '../../includes/SearchComponent';
    export default{
        components:{
            searchComponent: SearchComponent
        },
        data(){
            return {
                data: null
            }
        },
        beforeCreate(){

        },
        created(){
            this.$store.dispatch('getVideoData').then(() => {
                this.data = this.$store.getters.getVideoData;
                console.log(this.data);
            });
        },
        methods: {
            getData(){
                console.log(this.$store.getters.getVideoData);
            }
        }
    }
</script>