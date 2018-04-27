const state = {
    search_videos: null,
    search_paginate:''
};

const getters = {
    getSearchData(state){
        return state.search_videos;
    },

    getSearchPaginateObject(state){
        return state.search_paginate;
    }
}
const mutations = {
    setSearchVideoData(state, data){
        state.search_videos = data.videos.data;
    },

    setSearchPaginationObject(state, paginate){
        state.search_paginate = paginate;
    }
}

const actions = {
    getSearchVideoData({ commit }, payload= {}){
        return new Promise(function(resovle, reject){
            let url = '/search';

            if(payload.value && payload.value != 0){
                url = url +'?value=' +payload.value;
            }

            if(payload.page && payload.page != ''){
                url = url +'&page='+payload.page;
            }

            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setSearchVideoData', data);
                    commit('setSearchPaginationObject', data.videos);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
                    reject();
            });
        });
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}