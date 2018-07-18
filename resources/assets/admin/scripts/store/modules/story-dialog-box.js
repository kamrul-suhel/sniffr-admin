const state = {
    story_dialog_current_alpha_id: '',
    story_dialog_current_story: '',
    story_dialog_next_alpha_id: '',
    story_dialog_prev_alpha_id: '',

    current_route_obj: '',
}

const mutations = {
    setStoryDialogBox(state, data) {
        state.story_dialog_box = true;
        state.story_dialog_current_story = data.current_story;
        state.story_dialog_next_alpha_id = data.next_story_alpha_id ;
        state.story_dialog_prev_alpha_id = data.prev_story_alpha_id;
    },

    setRouteObject(state, route) {
        state.current_route_obj = route;
    },

    setResetStoryDialogObject(state) {
        state.story_dialog_current_alpha_id = '';
        state.story_dialog_current_story = '';
        state.story_dialog_next_alpha_id = '';
        state.story_dialog_prev_alpha_id = '';

        state.current_route_obj = ''
    }
}

const actions = {
    getStoryNextAndPrevLink({commit, state}, payload) {
        return new Promise(function (resolve, reject) {
            let url = '/search/stories/'+payload.alpha_id;

            axios.post(url)
                .then((response) => {
                    commit('setStoryDialogBox', response.data);
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

    getStoryDialogBox(state) {
        return state.story_dialog_box;
    },

    getCurrentStoryForDialog(state) {
        return state.story_dialog_current_story;
    },

    getCurrentStoryAlphaId() {
        return state.story_dialog_current_alpha_id;
    },

    getNextStoryAlphaId() {
        return state.story_dialog_next_alpha_id;
    },

    getPrevStoryAlphaId() {
        return state.story_dialog_prev_alpha_id;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}