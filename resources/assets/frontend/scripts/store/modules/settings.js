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
    getSettingObject({ commit }){
        return new Promise(function(resolve, reject){
            let url = '/settings_object';
            axios.get(url)
                .then((response) => {
                    let data = response.data;
                    console.log(response);
                    commit('setSettingsObject', data);
                    resolve();
                })
                .catch((error) => {
                    reject();
                });
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}