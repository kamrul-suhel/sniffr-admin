const state = {
    video_dialog_current_alpha_id: '',
    video_dialog_current_video: '',
    video_dialog_next_alpha_id: '',
    video_dialog_prev_alpha_id: '',

    current_route_obj: '',
}

const mutations = {
    setVideoDialogBox(state, data) {
        state.video_dialog_box = true;
        state.video_dialog_current_video = data.current_video.alpha_id;
        state.video_dialog_current_video = data.current_video;
        state.video_dialog_next_alpha_id = data.next_video_alpha_id;
        state.video_dialog_prev_alpha_id = data.prev_video_alpha_id;
    },

    setRouteObject(state, route) {
        state.current_route_obj = route;
    },

    setResetVideoDialogObject(state) {
        state.video_dialog_current_alpha_id = '';
        state.video_dialog_current_video = '';
        state.video_dialog_next_alpha_id = '';
        state.video_dialog_prev_alpha_id = '';

        state.current_route_obj = ''
    }
}

const actions = {
    getVideoNextAndPrevLink({commit, state}, payload) {
        return new Promise(function (resolve, reject) {
            let url = '/search/videos/'+payload.alpha_id;

            axios.post(url)
                .then((response) => {
                    commit('setVideoDialogBox', response.data);
                    resolve();
                })
                .catch((error) => {
                    console.log(error);
                    reject();
                });
        })
    }
}

const getters = {
    getEnterStateUrl(state) {
        return state.current_route_obj.fullPath;
    },

    getVideoDialogBox(state) {
        return state.video_dialog_box;
    },

    getCurrentVideoForDialog(state) {
        return state.video_dialog_current_video;
    },

    getCurrentRecommendedForDialog(state) {
        return state.video_dialog_current_video;
    },

    getCurrentVideoAlphaId() {
        return state.video_dialog_current_alpha_id;
    },

    getNextVideoAlphaId() {
        return state.video_dialog_next_alpha_id;
    },

    getPrevVideoAlphaId() {
        return state.video_dialog_prev_alpha_id;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}