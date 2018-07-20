import Vue from 'vue'
import Vuex from 'vuex'
import Settings from './modules/settings'
import User from './modules/user'
import Videos from './modules/videos'
import Stories from './modules/stories'
import BuyQuote from './modules/buyquote'
import Dialog from './modules/dialog'

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
		Stories,
		BuyQuote,
		Dialog
	}
})