const state = {
    searchType: '',
    searchByTitle: '',
    searchByMiniLength: 0,
    searchByMaxLength: 0,
    searchByTags: [],
    searchSortBy: '',
    searchByLocations: []
}

const mutations = {
    setSearchType() {

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

    setSearchByTags(state, tagObject) {
        state.searchByTags.forEach((tag) => {
            if (tag.value !== tagObject.value) {
                state.searchByTags.push(tag);
            }
        })
    },

    removeSearchByTags(state, tagObject) {
        state.searchByTags.forEach((tag, index) => {
            if (tag.value === tagObject.value) {
                state.searchByTags.splice(index, 1);
            }
        })
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
        state.searchByTitle = '';
        state.searchByMiniLength = 0;
        state.searchByMaxLength = 0;
        state.searchByTags = [];
        state.sortBy = '';
        state.searchByLocations = []
    }
}

const getters = {
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