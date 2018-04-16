/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
    username: '',
    avatar: '',
    email: '',
    user_login: false,
}

const mutations = {
    setUserLogout(state){
        state.username = '';
        state.avatar = '';
        state.email = '';
        state.user_login = false;
    },

    checkUserState(state, data){
        let user = data.data;
        console.log(user);
        if (user.success) {
            console.log(user);
            state.username = user.username;
            state.email = user.email;
            state.avatar = user.avatar;
            state.user_login = true;
        } else {
            state.username = '';
            state.avatar = '';
            state.email = '';
            state.user_login = false;
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
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}