const state = {
    video_dialog_current_alpha_id: '',
    video_dialog_current_video: '',
    video_dialog_next_alpha_id: '',
    video_dialog_prev_alpha_id: '',
}

const mutations = {
    setVideoDialogBox(state, data){
       state.video_dialog_box = true;
       console.log(data);
       state.video_dialog_current_video = data.current_video.alpha_id;
       state.video_dialog_current_video = data.current_video;
       state.video_dialog_next_alpha_id = data.next_video_alpha_id;
       state.video_dialog_prev_alpha_id = data.prev_video_alpha_id;
    }
}

const actions = {
    getVideoNextAndPrevLink({commit}, payload) {
        return new Promise(function(resolve, reject) {
            let url = '/video/dialogbox/'+ payload.alpha_id;
            axios.get(url)
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
    getVideoDialogBox(state){
        return state.video_dialog_box;
    },

    getCurrentVideoForDialog(state){
        return state.video_dialog_current_video;
    },

    getCurrentVideoAlphaId(){
        return state.video_dialog_current_alpha_id;
    },

    getNextVideoAlphaId(){
        return state.video_dialog_next_alpha_id;
    },

    getPrevVideoAlphaId(){
        return state.video_dialog_prev_alpha_id;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}