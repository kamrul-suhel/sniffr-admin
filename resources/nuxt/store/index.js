import Vuex from 'vuex'
import Settings from '../../assets/scripts/store/settings'
import User from '../../assets/scripts/store/user'
import Videos from '../../assets/scripts/store/videos'
import Stories from '../../assets/scripts/store/stories'
import BuyQuote from './modules/buyquote'
import Dialog from './modules/dialog'
import Page from './modules/page'
import ClientAccount from './modules/clientAccount'
import Toast from './modules/toast'

const createStore = () => {
    return new Vuex.Store({
        state: {},

        getters: {},

        mutations: {},

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
    })
}

export default createStore
