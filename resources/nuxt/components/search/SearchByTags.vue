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
                                :label="tag | capitalize"
                                :value="tag"
                                @change="onTagChange()"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>

</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){
            return {
                tags: []
            }
        },

        computed: {
            ...mapGetters({
                tagItems : 'getAllTags'
            })
        },

        created() {

        },
        methods: {
            onTagChange(){
                this.$store.commit('setSearchByTags', this.tags);
            }
        }
    }
</script>