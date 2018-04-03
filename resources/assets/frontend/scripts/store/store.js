import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		data: null
	},
	mutations: {
		setVideoData(state, data){
			state.data = data;
		}
	},
	getters: {
		getVideoData(state){
			return state.data;
		}
	},
	actions: {
		getVideoData({ commit }){
			return new Promise(function(resovle, reject){
                axios.get('/videos')
                    .then((response) => {
                    let data = response.data;
					commit('setVideoData', data);
					resovle();
            })
                .catch((error) => {
                    console.log('Not connect');
                	console.log(error);
                	reject();
            });
			});
		}
	}
});