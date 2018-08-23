import axios from 'axios';
const state = {
    user: {},
    company: {},
    companyUsers: [],
    companyOwnerId: null,
    companyOwners: [],
    clientIniState: false,
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

    getCompanyOwners(state) {
        return state.companyOwners;
    },


    getClientIniState(state){
        return state.clientIniState;
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

    setCompanyOwners(state, value) {
        let users = [];
        let owners = Object.entries(value);
        owners.forEach(function (value) {
            users.push({id: value[0], name: value[1]});
        });
        state.companyOwners = users;
    },

    setClientInitState(state, value){
        state.clientIniState = value;
    },

    resetClientAccount(state) {
        state.user = {};
        state.company = {};
        state.companyUsers = [];
        state.companyOwners = [];
        state.clientIniState = false;
    }
}

const actions = {
    fetchClientAccount({commit}) {
        this.$axios.$get('/client/profile').then((response) => {
            commit('setCompanyUser', response.user);
            commit('setCompany', response.company);
            commit('setCompanyUsers', response.company_users);
            commit('setCompanyOwners', response.account_owner_users);
            commit('setClientInitState', true);
        })
    },

    fetchClientUser({commit}, payLoad) {
        this.$axios.$get(payLoad.url).then((response) => {
            commit('setCompanyUser', response.user);
            commit('setClientInitState', true);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
