const state = {
    buyQuoteCollection :'',
    buyQuoteAsset: '',
    buyQuoteType:''
}

const getters = {
    getBuyQuoteCollection(state){
        return state.buyQuoteCollection;
    },

    getBuyQuoteAsset(state){
        return state.buyQuoteAsset;
    },

    getBuyQuoteType(state){
        return state.buyQuoteType;
    }
}

const mutations = {
    setBuyQuoteCollection(state, value){
        state.buyQuoteCollection = value;
    },

    setBuyQuoteAsset(state, value){
        state.buyQuoteAsset = value;
    },

    setBuyQuoteType(state, value){
        state.buyQuoteType = value;
    }
}

const actions = {

}

export default {
    state,
    mutations,
    getters,
    actions
}