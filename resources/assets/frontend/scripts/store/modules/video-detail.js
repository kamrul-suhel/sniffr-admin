const state = {
	video_detail: null,
};

const getters = {
	getVideoDetailData(state){
			return state.video_detail;
	}
}
const mutations = {
	setVideoDetailData(state, data){
		state.video_detail = data;
	}
}

const actions = {
	getVideoDetailData({ commit }, payload= {}){
		return new Promise(function(resovle, reject){
			let url = '/videos';

			if(payload.alpha_id && payload.alpha_id != 0){
				url = url + '/' +payload.alpha_id;
			}
            axios.get(url)
                .then((response) => {
				commit('setVideoDetailData', response.data);
				resovle();
	        })
	            .catch((error) => {
	            	reject();
	        });
		});
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}