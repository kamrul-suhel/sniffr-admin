import Vue from 'vue';
import Vuex from 'vuex';
import Settings from './modules/settings';
import User from './modules/user';
import Videos from './modules/videos';
import VideoDetail from './modules/video_detail';
import VideoSearch from './modules/search';
import VideoTagSearch from './modules/videos_tag_search';

Vue.use(Vuex);

export const store = new Vuex.Store({
    beforeCreate: function() {
        console.log('it run');
    },
	state: {
	},
	mutations: {
		
	},
	getters: {
		
	},
	actions: {
	},
	modules: {
		Settings,
		User,
		Videos,
		VideoDetail,
		VideoSearch,
		VideoTagSearch,
	}
});