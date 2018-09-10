const state = {
    quoteDialog : false,
    buyDialog: false,
    thankYouDialog: false,
    thankYouMessage: ''
}

const mutations = {
    setQuoteDialog(state, value){
        state.quoteDialog = value;
    },

    setBuyDialog(state, value){
        state.buyDialog = value;
    },

    setThankYouDialog(state, value){
        state.thankYouDialog = value;
    },

    setThankYouMessage(state, value){
        state.thankYouMessage = value;
    },



}

const getters = {
    getQuoteDialog(state){
        return state.quoteDialog;
    },

    getBuyDialog(state){
        return state.buyDialog;
    },

    getThankYouDialog(state){
        return state.thankYouDialog;
    },

    getThankYouMessage(state){
        return state.thankYouMessage;
    },


}

const actions = {

}

export default {
    state,
    mutations,
    getters,
    actions
}