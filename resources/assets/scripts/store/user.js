/**
 * Created by kamrulahmed on 13/04/2018.
 */

const state = {
    username: '',
    name: '',
    avatar: '',
    email: '',
    user_login: false,
    user_id: '',
    client_id: '',
    user_role: '',
    route_url: '',
    offers: '',
    active: '',

    companyOwnerId: null,
    companySlug: '',
    isCompanyOwner: false,

    // Login dialogs box variable: boolean
    loginDialog: false,
    forgotPasswordDialog: false,
};

const mutations = {
    clearUserState(state) {
        state.username = '';
        state.name = '';
        state.avatar = '';
        state.email = '';
        state.user_login = false;
        state.user_id = '';
        state.client_id = '';
        state.user_role = '';
        state.route_url = '';
        state.offers = '';
        state.active = '';
        state.companyOwnerId = null;
        state.companySlug = '';
        state.CompanyOwner = false;
    },

    setLoginDialog(state, value) {
        state.loginDialog = value;
    },

    setUserLogin(state, value) {
        return state.user_login = value;
    },

    setUserStatus(state, data) {
        let user = data.user;
        if (user.id) {
            state.username = user.username;
            state.name = user.full_name ? user.full_name : user.username;
            state.email = user.email;
            state.avatar = user.avatar;
            state.user_login = true;
            state.user_id = user.id;
            state.client_id = user.client_id;
            state.user_role = user.role;
            state.offers = data.user_offers;
            state.active = user.active;
        }

        if (user.client && typeof user.client === "object") {
            state.companyOwnerId = user.client.account_owner_id;
            state.companySlug = user.client.slug;
        }

    },

    setRouteUrl(state, currUrl) {
        state.route_url = currUrl;
    },

    setUserOffers(state, data) {
        state.offers = data;
    },

    setForgotPasswordDialog(state, value) {
        state.forgotPasswordDialog = value;
    },

    setCompanyOwnerId(state, client) {
        state.companyOwnerId = client.account_owner_id;
    },

    setCompanySlug(state, client) {
        state.companySlug = client.slug;
    }
};

const getters = {
    getLoginDialog(state) {
        return state.loginDialog;
    },

    getUserLogin(state) {
        return state.user_login;
    },

    getClientLogin(state) {
        return state.client_id ? true : false;
    },

    getUserStatus(state) {
        return {
            name: state.username,
            email: state.email,
            avatar: state.avatar,
            id: state.user_id,
            client_id: state.client_id,
            role: state.user_role,
            offers: state.offers,
            active: state.active,
            user_login: state.user_login,
            user_id: state.user_id,
            user_role: state.user_role,
            route_url: '',
        }
    },

    getUserId(state) {
        return state.user_id;
    },

    getRouteUrl(state) {
        return state.route_url;
    },

    getForgotPasswordDialog(state) {
        return state.forgotPasswordDialog;
    },

    getCompanyOwnerId(state) {
        return state.companyOwnerId;
    },

    getIsCompanyOwner(state) {
        return state.user_id === state.companyOwnerId ? true : false;
    },

    getCompanySlug(state) {
        return state.companySlug;
    }
};

const actions = {
    getLoginStatus({commit}) {
        this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
        this.$axios.$get('/settings_object')
            .then((response) => {
                let data = response;
                if (!data.error) {
                    commit('setUserStatus', data.sniffr_app);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },

    userLogout({commit}) {
        this.$axios.setHeader('X-Requested-With', 'XMLHttpRequest');
        this.$axios.$get('/logout')
            .then((response) => {
                let data = response;
                if (!data.error) {
                    commit('clearUserState');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
