import Vue from 'vue'
import Vuex from 'vuex'
import Settings from './modules/settings'
import User from './modules/user'
import Videos from './modules/videos'
import Stories from '../../../scripts/store/stories'
import BuyQuote from './modules/buyquote'
import Dialog from './modules/dialog'
import Page from './modules/page'
import ClientAccount from './modules/clientAccount'
import Toast from './modules/toast'

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
		Toast,
		Settings,
		User,
		Videos,
		Stories,
		BuyQuote,
		Dialog,
        Page,
		ClientAccount
	}
});
