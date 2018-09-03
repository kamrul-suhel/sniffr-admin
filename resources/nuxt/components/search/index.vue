<template>
    <section class="search-filter-section mr-2">
        <search-by-title-description @searchOption="searchOption($event)"/>
        <search-by-length/>
        <search-by-tags/>
        <sort-by/>
        <search-by-location/>
    </section>
</template>
<script>
    import SearchByTitleDescription from './SearchByTItleDescription'
    import SearchByLength from './SearchByLength'
    import SearchByTags from './SearchByTags'
    import SearchByLocation from './SearchByLocation'
    import SortBy from './SortBy'
    export default {

        components: {
            SearchByLength,
            SearchByTitleDescription,
            SearchByTags,
            SearchByLocation,
            SortBy
        },

        data() {
            return {

            }
        },
        props: [
            'searchOption'
        ],
        created() {

        },
        methods: {
        }
    }
</script>
