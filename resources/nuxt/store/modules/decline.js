const state = {
    declineDialogBox: false,
    declineAsset: {},
    declineType: '',
    confirmDecline: null
}

const mutations = {
    setDeclineDialogBox(state, value) {
        state.declineDialogBox = value;
    },

    setDeclineAsset(state, asset) {
        state.declineAsset = asset;
    },

    setDeclineType(state, type) {
        state.declineType = type
    },

    setResetDeclineData(state) {
        state.declineDialogBox = false;
        state.declineAsset = {},
        state.declineType = ''
    },

    setConfirmDecline(state, value){
        state.confirmDecline = value;
    }
}

const getters = {
    getDeclineDialog(state) {
        return state.declineDialogBox;
    },

    getDeclineAsset(state) {
        return state.declineAsset;
    },

    getDeclineType(state) {
        return state.declineType;
    },

    getConfirmDecline(state){
        return state.confirmDecline;
    }
}


const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}