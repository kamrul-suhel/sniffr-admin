const state = {
    declineDialog: false,
    declineAsset: {},
    declineType: ''
}

const mutations = {
    setDeclineDialogBox(state, value) {
        state.declineDialog = value;
        if(!value){
            state.declineDialog = false;
            state.declineAsset = {},
            state.declineType = ''
        }
    },

    setDeclineAsset(state, asset) {
        state.declineAsset = asset;
    },

    setDeclineType(state, type) {
        state.declineType = type
    },

    setResetDeclineData(state) {
        state.declineDialog = false;
        state.declineAsset = {},
        state.declineType = ''
    }
}

const getters = {
    getDeclineDialog(state) {
        return state.declineDialog;
    },

    getDeclineAsset(state) {
        return state.declineAsset;
    },

    getDeclineType(state) {
        return state.declineType;
    }
}


const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}