const state = {
    isOfferedPage: false,
}

const mutations = {
    setIsOfferedPage(state, value){
        state.isOfferedPage = value
    }
}

const getters = {
    getOsOfferedPage(state){
        return state.isOfferedPage;
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions,
    getters
}
