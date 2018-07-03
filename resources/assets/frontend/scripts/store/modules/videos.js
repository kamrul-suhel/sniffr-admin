const state = {
    videos: null,
    paginate: '',
    recommended:''
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
        state.recommended = data.recommended.data;
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

            if(payload.search && payload.search != ''){
                url = url + '&search='+payload.search;
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
                    console.log(error);
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