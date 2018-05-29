import Vue from 'vue';
import Vuex from 'vuex';
import Settings from './modules/settings';
import User from './modules/user';
import Videos from './modules/videos';
import VideoDetail from './modules/video-detail';
import VideoDialogBox from './modules/video-dialog-box'
import VideoSearch from './modules/search';
import VideoTagSearch from './modules/videos_tag_search';
import ClientLogin from './modules/client-login';
import Client from './modules/client';

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
		Settings,
		User,
		Videos,
		VideoDetail,
		VideoDialogBox,
		VideoSearch,
		VideoTagSearch,
		ClientLogin,
		Client
	}
});