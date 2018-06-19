/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
    username: '',
    avatar: '',
    email: '',
    user_login: false,
    user_id:'',
    client_id:'',
    user_role: ''
}

const mutations = {
    setUserLogout(state){
        state.username = '';
        state.avatar = '';
        state.email = '';
        state.user_login = false;
        state.user_id = '';
        state.user_role = '';
    },

    checkUserState(state, data){
        let user = data.data;
        if (user.success) {
            state.username = user.username;
            state.email = user.email;
            state.avatar = user.avatar;
            state.user_login = true;
            state.user_id = user.id;
            state.client_id = user.client_id;
            state.user_role = user.role;
        } else {
            state.username = '';
            state.avatar = '';
            state.email = '';
            state.user_id = '';
            state.user_login = false;
            state.user_role = '';
            state.client_id = ''
        }
    }
}

const actions = {
    getLoginStatus({commit}) {
        return new Promise(function (resolve, reject) {
            axios.get('/islogin')
                .then((response) => {
                    commit('checkUserState', response);
                    resolve();
                })
                .catch((error) => {
                    reject()
                });
        });
    },

    userLogout({commit}){
        return new Promise((resolve, reject) => {
            axios.get('/logout')
                .then((response) => {
                    let data = response.data;
                    if (!data.error) {
                        commit('setUserLogout', data);
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
}

export default {
    state,
    getters,
    mutations,
    actions,
}