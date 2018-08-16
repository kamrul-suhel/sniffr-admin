const state = {
    user: {},
    company: {},
    companyUsers: [],
    companyOwnerId: null,
    companyOwners: [],
    isAccountOwner: false,
    iniState: false,
}

const getters = {
    getCompany(state) {
        return state.company;
    },

    getCompanyCurrentUser(state) {
        return state.user;
    },

    getCompanyUsers(state) {
        return state.companyUsers;
    },

    getCompanyOwnerId(state) {
        return state.companyOwnerId;
    },

    getCompanyOwners(state) {
        return state.companyOwners;
    },

    getAccountOwner(state){
        return state.isAccountOwner;
    },

    getIniState(state){
        return state.iniState;
    }
}

const mutations = {
    setCompany(state, company) {
        state.company = company;
    },

    setCompanyUser(state, user) {
        state.user = user;
    },

    setCompanyUsers(state, users) {
        state.companyUsers = users;
    },

    setCompanyOwnerId(state, ownerId) {
        state.companyOwnerId = ownerId;
    },

    setCompanyOwners(state, value) {
        let users = [];
        let owners = Object.entries(value);
        owners.forEach(function (value) {
            users.push({id: value[0], name: value[1]});
        });
        state.companyOwners = users;
    },

    setAccountOwner(state){
        state.isAccountOwner = state.user.id === state.company.account_owner_id;
    },

    setInitState(state, value){
        state.iniState = value;
    },

    resetClientAccount(state) {
        state.user = {};
        state.company = {};
        state.companyUsers = [];
        state.companyOwnerId = null;
        state.companyOwners = [];
        state.isAccountOwner = false;
        state.iniState = false;
    }
}

const actions = {
    fetchClientAccount({commit}) {
        axios.get('/client/profile').then((response) => {
            commit('setCompanyUser', response.data.user);
            commit('setCompany', response.data.company);
            commit('setCompanyUsers', response.data.company_users);
            commit('setCompanyOwnerId', response.data.company.account_owner_id);
            commit('setCompanyOwners', response.data.account_owner_users);
            commit('setAccountOwner');
            commit('setInitState', true);
        })
    },

    fetchClientUser({commit}, payLoad) {
        axios.get(payLoad.url).then((response) => {
            commit('setCompanyUser', response.data.user);
            commit('setInitState', true);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
