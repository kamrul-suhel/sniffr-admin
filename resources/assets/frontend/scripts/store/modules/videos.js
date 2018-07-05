const state = {
    videos: null,
    mailer_videos: null,
    paginate: ''
};

const getters = {
    getVideoData(state){
        return state.videos;
    },

    getMailerVideoData(state){
        return state.mailer_videos;
    },

    getPaginateObject(state){
        return state.paginate;
    },
};
const mutations = {
    setVideoData(state, data){
        state.videos = data;
    },


    setMailerVideoData(state, data){
        state.mailer_videos = data;
    },

    setPaginationObject(state, paginate){
        state.paginate = paginate;
    }
};

const actions = {
    getVideoData({commit}, payload = {}){
        return new Promise(function (resovle, reject) {
            let url = '/search/videos';

            if (payload.page && payload.page != 0) {
                url = url + '?page=' + payload.page;
            }

            if(payload.search && payload.search != ''){
                url = url + '&search='+payload.search;
            }

            if(payload.tag && payload.tag != ''){
                url = url + '&tag='+payload.tag;
            }

            axios.post(url)
                .then((response) => {
                    let data = response.data;
                    commit('setVideoData', data.videos.data);
                    commit('setMailerVideoData', data.mailer_videos.data);
                    commit('setPaginationObject', data.videos);
                    resovle();
                })
                .catch((error) => {
                    console.log('Not connect');
                    reject();
                });
        });
    }
};
export default {
    state,
    getters,
    mutations,
    actions
};