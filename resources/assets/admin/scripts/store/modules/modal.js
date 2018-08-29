const state = {
    asset: {},
    modal: false
}

const mutations = {
    setAsset(state, asset) {
        state.asset = asset;
    },

    setModalVisibility(state, visible){
        state.modal = visible;
    }
}

const getters = {
    getAsset(state) {
        return state.asset;
    },

    getModalVisibility(state) {
        return state.modal;
    },
}

export default {
    state,
    mutations,
    getters
}