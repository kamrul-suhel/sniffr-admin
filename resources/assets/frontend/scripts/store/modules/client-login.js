const state = {
    client_login : false,
    client_name: '',
    client_id : '',

}

const mutations = {
    setClientLogout(){
        console.log('it is calling');
    },

    checkClientState(state, data){
        let user = data.data;
        if (user.success) {
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
    getClientLoginStatus({commit}) {
        return new Promise(function (resolve, reject) {
            axios.get('/client/islogin')
                .then((response) => {
                    commit('checkUserState', response);
                    resolve();
                })
                .catch((error) => {
                    reject()
                });
        });
    },

    clientLogout({commit}){
        return new Promise((resolve, reject) => {
            axios.get('/client/logout')
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
    isClientLogin(state) {
        return state.user_login;
    },

    getClient(state) {
        return {
            name: state.username,
            email: state.email,
            avatar: state.avatar,
        }
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}