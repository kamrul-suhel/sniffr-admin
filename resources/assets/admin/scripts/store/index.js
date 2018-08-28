import Vue from 'vue'
import Vuex from 'vuex'

import stories from '../../../scripts/store/stories'
import user from '../../../scripts/store/user'
import modal from './modules/modal'
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
        user,
        stories,
        videos,
        modal,
        videoDialog,
        storyDialog
    }
})
