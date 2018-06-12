import Vue from 'vue'
import Vuex from 'vuex'

import stories from './modules/stories';
import videos from './modules/videos';

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
        stories,
        videos
    }
})