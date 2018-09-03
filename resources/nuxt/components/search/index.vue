<template>
    <section class="search-filter-section mr-2">
        <search-by-title-description @searchOption="searchOption($event)"/>
        <search-by-length/>
        <search-by-tags/>
        <search-by-location/>
        <sort-by/>
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
                value: ''
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
