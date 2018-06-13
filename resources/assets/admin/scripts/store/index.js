import Vue from 'vue'
import Vuex from 'vuex'

import stories from './modules/stories'
import videos from './modules/videos'
import videoDialog from './modules/video-dialog-box'
import storyDialog from './modules/story-dialog-box'

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
        videos,
        videoDialog,
        storyDialog
    }
})