const state = {
    video_dialog_box : false,
    video_dialog_current_video: '',
}

const mutations = {
    setVideoDialogBox(state, current_video){
       state.video_dialog_box = true;
       state.video_dialog_current_video = current_video;
    }
}

const actions = {
}

const getters = {
    getVideoDialogBox(state){
        return state.video_dialog_box;
    },

    getCurrentVideoForDialog(state){
        return state.video_dialog_current_video;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}