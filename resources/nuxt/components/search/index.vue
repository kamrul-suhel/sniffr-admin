<template>
    <section class="search-filter-section px-3 py-0">
        <search-by-title-description :cardLayout="true"/>
        <search-by-length/>
        <search-by-tags/>
        <sort-by/>
        <!--<search-by-location/>-->

        <v-btn dark
               class="mt-4 mx-0 text-xs-right"
               raised
               @click="onResetSearchOption()">
            Clear search
        </v-btn>
    </section>
</template>
<script>

    import SearchByTitleDescription from './SearchByTitleDescription'
    import SearchByLength from './SearchByLength'
    import SearchByTags from './SearchByTags'
    import SearchByLocation from './SearchByLocation'
    import SortBy from './SortBy'
    import SearchServices from '@/plugins/services/SearchServices';
    export default {

        components: {
            SearchByLength,
            SearchByTitleDescription,
            SearchByTags,
            SearchByLocation,
            SortBy
        },

        methods: {
            onResetSearchOption(){
                this.$store.commit('resetSearchStoreObject');
                SearchServices.updateSearchRoute(this.$route, this.$router, this.$store.getters.getSearchQueryUrl);
            }
        }
    }
</script>
