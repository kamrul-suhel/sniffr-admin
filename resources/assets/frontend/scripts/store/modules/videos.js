const state = {
    videos: null,
    paginate: ''
};

const getters = {
    getVideoData(state){
        return state.videos;
    },

    getRecommendedData(state){
        return state.recommended;
    },

    getPaginateObject(state){
        return state.paginate;
    },
};
const mutations = {
    setVideoData(state, data){
        state.videos = data.videos.data;
    },

    setRecommendedData(state, data){
        state.recommended = data.recommended.data;
    },

    setPaginationObject(state, paginate){
        state.paginate = paginate;
    },
};

const actions = {
    getVideoData({commit}, payload = {}){
        return new Promise(function (resovle, reject) {
            let url = '/videos';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }
            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setVideoData', data);
                    commit('setPaginationObject', data.videos);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
                    reject();
                });
        });
    },

    getRecommendedData({commit}, payload = {}){
        return new Promise(function (resovle, reject) {
            let url = '/videos';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }
            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    commit('setRecommendedData', data);
                    commit('setPaginationObject', data.recommended);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
                    reject();
                });
        });
    },

};
export default {
    state,
    getters,
    mutations,
    actions
};