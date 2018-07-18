import Vue from 'vue'
import Vuex from 'vuex'
import Settings from './modules/settings'
import User from './modules/user'
import Videos from './modules/videos'
import Stories from './modules/stories'
// import ClientStories from './modules/client/client-stories'
// import ClientVideos from './modules/client/client-videos'

Vue.use(Vuex)

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
		// ClientStories,
		// ClientVideos,
		Stories
	}
})