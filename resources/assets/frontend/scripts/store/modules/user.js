/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
    username: sniffr_app ? sniffr_app.user.username : '',
    name: sniffr_app ? sniffr_app.user.username : '',
    avatar: '',
    email: '',
    user_login: false,
    user_id:'',
    client_id: sniffr_app ? sniffr_app.user.client_id : '',
    user_role: '',
    route_url: ''
}

const mutations = {
    clearUserState(state){
        state.username = '';
        state.avatar = '';
        state.email = '';
        state.user_login = false;
        state.user_id = '';
        state.user_role = '';
    },

    setUserState(state, data){
        let user = data;
        if(user){
            state.username = user.username;
            state.name = user.username;
            state.email = user.email;
            state.avatar = user.avatar;
            state.user_login = true;
            state.user_id = user.id;
            state.client_id = user.client_id;
            state.user_role = user.role;
        }
    },

    setRouteUrl(state, currUrl){
        state.route_url = currUrl;
    }
}

const actions = {
    getLoginStatus({commit}) {
        return new Promise(function (resolve, reject) {
            commit('setUserState', sniffr_app.user);
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
}

const getters = {
    isUserLogin(state) {
        return state.user_login;
    },

    isClientLogin(state) {
        return state.client_id ? true : false;
    },

    getUser(state) {
        return {
            name: state.username,
            email: state.email,
            avatar: state.avatar,
            id: state.user_id,
            client_id: state.client_id,
            role: state.user_role
        }
    },

    getRouteUrl(state){
        return state.route_url;
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}