/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
    // username: sniffr_app ? sniffr_app.user.username : '',
    // name: sniffr_app ? sniffr_app.user.username : '',
    // avatar: '',
    // email: '',
    // user_login: false,
    // user_id:'',
    // client_id: sniffr_app ? sniffr_app.user.client_id : '',
    // user_role: '',
    // route_url: '',
    // offers: sniffr_app.user_offers,
    // active: '',

    username: '',
    name:  '',
    avatar: '',
    email: '',
    user_login: false,
    user_id:'',
    client_id:  '',
    user_role: '',
    route_url: '',
    offers: '',
    active: '',
};

const mutations = {
    clearUserState(state){
        state.username = '';
        state.avatar = '';
        state.email = '';
        state.user_login = false;
        state.client_id = '';
        state.user_id = '';
        state.user_role = '';
        state.offers = '';
        state.active = '';
    },

    setUserState(state, data){
        let user = data.user;
        if(user.id){
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
    },

    setRouteUrl(state, currUrl){
        state.route_url = currUrl;
    },

    setUserOffers(state, data){
        let user = data.user;
        state.offers = data;
    },
};

const actions = {
    getLoginStatus({commit}) {
        return new Promise(function (resolve, reject) {
            axios.get('/settings_object')
                .then((response) => {
                    let data = response.data;
                    if (!data.error) {
                        commit('setUserState', data.sniffr_app);
                        resolve();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject();
                });
            resolve();
        });
    },

    userLogout({commit}){
        return new Promise((resolve, reject) => {
            axios.get('/logout')
                .then((response) => {
                    let data = response.data;
                    if (!data.error) {
                        console.log('clearing user');
                        commit('clearUserState', data);
                        resolve();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject();
                });
        })
    }
};

const getters = {
    isUserLogin(state) {
        return state.user_login;
    },

    isClientLogin(state) {
        return !!state.client_id;
    },

    getUser(state) {
        return {
            name: state.name,
            email: state.email,
            avatar: state.avatar,
            id: state.user_id,
            client_id: state.client_id,
            role: state.user_role,
            offers: state.offers,
            active: state.active,
        }
    },

    getRouteUrl(state){
        return state.route_url;
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};