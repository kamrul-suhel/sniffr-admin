const state = {
    tag_search_videos: null,
    tag_search_paginate:''
};

const getters = {
    getTagSearchData(state){
        return state.tag_search_videos;
    },

    getTagSearchPaginateObject(state){
        return state.tag_search_paginate;
    }
}
const mutations = {
    setTagSearchVideoData(state, data){
        state.tag_search_videos = data.videos.data;
    },

    setTagSearchPaginationObject(state, paginate){
        state.tag_search_paginate = paginate;
    }
}

const actions = {
    getTagSearchVideoData({ commit }, payload= {}){
        return new Promise(function(resovle, reject){
            let url = '/search/videos';

            if(payload.page && payload.page != ''){
                url = url +'?page='+payload.page;
            }

            if(payload.value && payload.value != 0){
                data = {'tag':payload.value};
            }

            axios.post(url, data)
                .then((response) => {
                let data = response.data;
                commit('setTagSearchVideoData', data);
                commit('setTagSearchPaginationObject', data.videos);
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