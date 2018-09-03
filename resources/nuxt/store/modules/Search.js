const state = {
    searchType: '',
    searchByTitle: '',
    searchByMinLength: 0,
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

    setSearchByMinLength(state, minValue) {
        state.searchByMinLength = minValue;
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
        state.searchByMinLength = 0;
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

    getSearchByMinLength(state) {
        return state.searchByMinLength;
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

const actions = {}

export default {
    state,
    mutations,
    getters,
    actions
}