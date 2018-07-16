const state = {
    video_detail: {},
    tags: [],
};

const getters = {
    getVideoDetailData(state) {
        return state.video_detail;
    },

    getVideoDetailTags(state) {
        return state.tags;
    }
}
const mutations = {
    setVideoDetailData(state, data) {
        state.video_detail = data.video;
        state.video_detail.iframe = data.iframe;
    },

    setVideoDetailTags(state, data) {
        if (data.video.tags.length > 0) {
            state.tags.push(...data.video.tags);
        }
    }
}

const actions = {
    getVideoDetailData({commit}, payload = {}) {
        let url = '/videos';
        if (payload.alpha_id && payload.alpha_id != 0) {
            url = url + '/' + payload.alpha_id;
        }
        axios.get(url)
            .then((response) => {
                commit('setVideoDetailData', response.data);
                commit('setVideoDetailTags', response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}