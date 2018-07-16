/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
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

    loginDialog:false
};

const mutations = {
    clearUserState(state){
        state.username= '';
        state.name=  '';
        state.avatar= '';
        state.email= '';
        state.user_login= false;
        state.user_id='';
        state.client_id=  '';
        state.user_role= '';
        state.route_url= '';
        state.offers= '';
        state.active= '';
    },

    setLoginDialog(state, value){
        state.loginDialog = value;
    },

    setUserLogin(state, value) {
        return state.user_login = value;
    },

    setUserStatus(state, data){
        let user = data.user;
        if(user.username){
            state.username = user.username;
            state.name = user.username;
            state.email = user.email;
            state.avatar = user.avatar;
            state.user_login = true;
            state.user_id = user.id;
            state.client_id = user.client_id;
            state.user_role = user.role;
            state.offers = '';
            state.active = user.active;
        }
        
    },

    setRouteUrl(state, currUrl){
        state.route_url = currUrl;
    },

    setUserOffers(state, data){
        let user = data.user;
        state.offers = data;
    }
};

const getters = {
    getLoginDialog(state){
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
            user_login : state.user_login,
            user_id: state.user_id,
            user_role: state.user_role,
            route_url: '',
        }
    },

    getRouteUrl(state){
        return state.route_url;
    }
};

const actions = {
    getLoginStatus({commit}) {
        return new Promise(function (resolve, reject) {
            axios.get('/settings_object')
                .then((response) => {
                    let data = response.data;
                    if (!data.error) {
                        commit('setUserStatus', data.sniffr_app);
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
                        commit('clearUserState');
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

export default {
    state,
    getters,
    mutations,
    actions,
};