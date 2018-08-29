const state = {
    settings: ''
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
    nuxtServerInit(){
        console.log(context);
    },

    setSettingObjectFromServer({commit, state}) {
        // check if settings data is load or not
        if (typeof state.settings != 'object') {
            return new Promise((resolve, reject) => {
                let url = '/settings_object';
                this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
                this.$axios.$get(url)
                    .then((response) => {
                        let data = response;
                        commit('setSettingsObject', data);
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                    });
            });
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
