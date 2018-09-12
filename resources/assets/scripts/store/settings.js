const state = {
    settings: null
}

const mutations = {
    setSettingsObject(state, settings) {
        state.settings = settings;
    }
}

const getters = {
    getSettingsObject(state) {
        return state.settings;
    }
}

const actions = {
    nuxtServerInit: async ({commit}, {app, req, redirect}) => {
        let url = 'http://www.sniffr-app.test/settings_object';
        app.$axios.$get(url)
            .then((response) => {
                commit('setSettingsObject', response);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    setSettingObjectFromServer({commit, state}) {
        // check if settings data is load or not
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
