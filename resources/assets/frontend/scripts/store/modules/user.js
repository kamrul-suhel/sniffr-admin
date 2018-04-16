/**
 * Created by kamrulahmed on 13/04/2018.
 */
const state = {
    username:'',
    password:'',
    user_login: false,
}

const mutations = {
    setUserLogin(state, user_state){
        if(user_state){
            state.user_login = true;
        }else{
            state.user_login = false;
        }
    },

    setUser(state, user){
        state.username = user.name;
        state.password = user.password;
    },

    checkUserState(state, user){
        console.log(user);
    }
}

const actions = {
    getLoginStatus({commit}) {
        axios.get('/islogin').then((response) => {
            commit('checkUserState', response);
        });
    }
}

const getters = {
    isUserLogin(state) {
        return state.user_login;
    },

    getUser(state) {
        return {
            name: state.username,
            password : state.password
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}