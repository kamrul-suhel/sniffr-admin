const state = {
    allTags: [],

    searchType: '',
    searchByTitle: '',
    searchByMiniLength: 0,
    searchByMaxLength: 0,
    searchByTags: [],
    searchSortBy: '',
    searchByLocations: []
}

const mutations = {
    setAllTags(state, tags){
        state.allTags = [];
        state.allTags.push(...tags);
    },

    setSearchType(state, type) {
        state.searchType = type;
    },

    setSearchByTitle(state, value) {
        state.searchByTitle = value;
    },

    setSearchByMiniLength(state, minValue) {
        state.searchByMiniLength = minValue;
    },

    setSearchByMaxLength(state, maxValue) {
        state.searchByMaxLength = maxValue;
    },

    setSearchByTags(state, tagArray) {
        state.searchByTags = [];
        state.searchByTags.push(...tagArray);
    },

    setSortBy(state, sortBy) {
        state.searchSortBy = sortBy;
    },

    setSearchByLocation(state, locationObject) {
        state.searchByLocations.push(locationObject);
    },

    removeSearchByLocations(state, locationObject) {
        state.searchByLocation.forEach((location, index) => {
            if (location.value === locationObject.value) {
                state.searchByLocations.splice(index, 1);
            }
        })
    },

    resetSearchStoreObject(state) {
        state.allTags = [];
        state.searchType = '';
        state.searchByTitle = '';
        state.searchByMiniLength = 0;
        state.searchByMaxLength = 0;
        state.searchByTags = [];
        state.sortBy = '';
        state.searchByLocations = []
    }
}

const getters = {
    getSearchType(state){
        return state.searchType;
    },

    getAllTags(state){
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
        return state.searchByLocations;
    }
}

const actions = {
    fetchAllTags({commit, state}){
        let url = '/tags';

        this.$axios.$get(url)
            .then( response => {
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