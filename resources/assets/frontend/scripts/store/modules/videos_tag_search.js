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
            let url = '/videos/tag/';

            if(payload.value && payload.value != 0){
                url = url + payload.value;
            }

            if(payload.page && payload.page != ''){
                url = url +'?page='+payload.page;
            }

            axios.get(url)
                .then((response) => {
                let data = response.data;
                console.log(data);
                commit('setTagSearchVideoData', data);
                commit('setTagSearchPaginationObject', data.videos);
                resovle();
            })
            .catch((error) => {
                console.log('Not connect');
                console.log(error);
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