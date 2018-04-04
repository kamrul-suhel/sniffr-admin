import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		videos: null,
		paginate:''
	},
	mutations: {
		setVideoData(state, data){
			state.videos = data.videos.data;
		},

		setPaginationObject(state, paginate){
			state.paginate = paginate;
		}
	},
	getters: {
		getVideoData(state){
			return state.videos;
		},

		getPaginateObject(state){
			return state.paginate;
		}
	},
	actions: {
		getVideoData({ commit }, payload= {}){
			return new Promise(function(resovle, reject){
				let url = '/videos';
				if(payload.page && payload.page != 0){
					url = url +'?page=' +payload.page;
				}
                axios.get(url)
                    .then((response) => {
                    let data = response.data;
					commit('setVideoData', data);
					commit('setPaginationObject', data.videos);
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