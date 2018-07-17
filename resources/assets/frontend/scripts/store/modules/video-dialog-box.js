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
        state.video_dialog_current_alpha_id = data.current_video.alpha_id;
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
            let data = {};
            let request_url = state.current_route_obj.name;


            if(request_url === 'videos'){
                data = {'alpha_id': payload.alpha_id};
            }

            if(state.current_route_obj.query.search){
                data = {
                    'alpha_id': payload.alpha_id,
                    'search' : state.current_route_obj.query.search
                }
            }

            if(state.current_route_obj.query.tag){
                data = {
                    'alpha_id': payload.alpha_id,
                    'tag' : state.current_route_obj.query.tag
                }
            }

            //Featured videos
            if (request_url === 'home') {
                data = {'featured':'true', 'alpha_id': payload.alpha_id};
            }

            //Search video url
            if (request_url === 'videos_search') {
                data = {'value':state.current_route_obj.query.value}
            }

            //Search by tag video url
            if (request_url === 'videos_tag') {
            }
            axios.post('/search/videos', data)
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

    getCurrentMailerVideoForDialog(state) {
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