const state = {
    settings: ''
}

const mutations = {
    setSettingsObject(state, settings){
        state.settings = settings;
    }
}

const getters = {
    getSettingsObject(state){
        return state.settings;
    }
}

const actions = {
    setSettingObjectFromServer({ commit, state }){
        // check if settings data is load or not
        if(typeof state.settings != 'object'){
            return new Promise(function(resolve, reject){
                let url = 'api/settings_object';
                axios.get(url)
                    .then((response) => {
                        let data = response.data;
                        commit('setSettingsObject', data);
                        resolve(data);
                    })
                    .catch((error) => {
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
