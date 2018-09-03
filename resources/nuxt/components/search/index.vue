<template>
    <section class="search-filter-section">
        <search-by-title-description @searchOption="searchOption($event)"/>
        <search-by-length/>
    </section>
</template>
<script>
    import SearchByTitleDescription from './SearchByTItleDescription'
    import SearchByLength from './SearchByLength'
    export default {

        components: {
            SearchByLength,
            SearchByTitleDescription
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
