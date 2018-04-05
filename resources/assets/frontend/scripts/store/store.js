import Vue from 'vue';
import Vuex from 'vuex';
import Videos from './modules/videos';
import VideoDetail from './modules/video_detail';
import VideoSearch from './modules/search';
import VideoTagSearch from './modules/videos_tag_search';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		
	},
	mutations: {
		
	},
	getters: {
		
	},
	actions: {
		
	},
	modules: {
		Videos,
		VideoDetail,
		VideoSearch,
		VideoTagSearch,
	}
});