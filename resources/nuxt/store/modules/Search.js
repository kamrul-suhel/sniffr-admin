const state = {
    allTags: [],

    searchType: '',
    searchByTitle: '',
    searchByMiniLength: 0,
    searchByMaxLength: 0,
    searchByTags: [],
    searchSortBy: '',
    searchAllLocations:[],
    searchByLocations: [],
    searchPage: 1,

    searchQuery:''
}

const mutations = {
    setAllTags(state, tags) {
        state.allTags = [];
        state.searchPage = 1;
        state.allTags.push(...tags);
    },

    setSearchType(state, type) {
        state.searchType = type;
    },

    setSearchByTitle(state, title) {
        state.searchPage = 1;
        state.searchByTitle = title;
    },

    setSearchByMiniLength(state, minValue) {
        state.searchPage = 1;
        state.searchByMiniLength = minValue;
    },

    setSearchByMaxLength(state, maxValue) {
        state.searchPage = 1;
        state.searchByMaxLength = maxValue;
    },

    setSearchByTags(state, tagArray) {
        state.searchPage = 1;
        state.searchByTags = [];
        state.searchByTags.push(...tagArray);
    },

    setSortBy(state, sortBy) {
        state.searchPage = 1;
        if(sortBy === null){
            state.searchSortBy = '';
            return;
        }

        state.searchSortBy = sortBy;
    },

    setSearchByLocation(state, locationObject) {
        state.searchPage = 1;
        state.searchByLocations = [];
        state.searchByLocations.push(...locationObject);
    },

    setSearchAllLocations(state, locations) {
        state.searchAllLocations = [];
        state.searchAllLocations.push(...locations);
    },

    setSearchQuery(state, query = null){

    },

    setSearchPage(state, page){
        state.searchPage = page;
    },


    resetSearchStoreObject(state) {
        state.searchType = '';
        state.searchByTitle = '';
        state.searchByMiniLength = 0;
        state.searchByMaxLength = 0;
        state.searchByTags = [];
        state.searchSortBy = '';
        state.searchByLocations = []
        state.searchPage = 1;
    }
}

const getters = {
    getSearchType(state) {
        return state.searchType;
    },

    getAllTags(state) {
        return state.allTags;
    },

    getSearchByTitle(state) {
        return state.searchByTitle;
    },

    getSearchByMiniLength(state) {
        return state.searchByMiniLength;
    },

    getSearchByMaxLength(state) {
        return state.searchByMaxLength
    },

    getSearchByTags(state) {
        return state.searchByTags;
    },

    getSearchSortBy(state) {
        return state.searchSortBy;
    },

    getSearchByLocation(state) {
        console.log(state.searchByLocations)
        return state.searchByLocations;
    },

    getSearchAllLocations(state){
        return state.searchAllLocations;
    },

    getSearchQuery(state){
        return state.searchQuery;
    },

    getSearchPage(state){
        return state.searchPage;
    },

    getSearchQueryUrl(state){
        let queryUrl = '';
        if(state.searchPage > 1){
            queryUrl = 'page='+state.searchPage;
        }

        if(state.searchByTitle !== ''){
            queryUrl += 'search='+state.searchByTitle;
        }

        if(state.searchByMiniLength > 0){
            queryUrl += '&minLength='+state.searchByMiniLength;
        }

        if(state.searchByMaxLength > 0){
            queryUrl += '&maxLength='+ state.searchByMaxLength;
        }

        if(state.searchByTags.length > 0){
            let tagsString = state.searchByTags.toString();
            queryUrl += '&tags='+tagsString;
        }

        if(state.searchSortBy.length > 0){
            queryUrl += '&sortBy='+ state.searchSortBy;
        }

        state.searchQuery = queryUrl;
        return state.searchQuery;
    },

    getQueryObject(state){
        return {
            page: state.searchPage,
            search: state.searchByTitle,
            tags: state.searchByTags,
            maxLength: state.searchByMaxLength,
            minLength: state.searchByMiniLength,
            sortBy: state.searchSortBy
        }
    }
}

const actions = {
    nuxtServerInit: async ({commit}, {app, req, redirect}) => {
        let url = '/settings_object';
        app.$axios.$get(url)
            .then((response) => {
                commit('setAllTags', response.tags);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchAllTags({commit, state}) {
        let url = '/tags';

        this.$axios.$get(url)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
