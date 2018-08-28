/*
 ********************************************************
 * Glabal package
 ********************************************************
 */

import 'babel-polyfill';

window.axios = require('axios');
window.Vue = require('vue');
window.Vuetify = require('Vuetify');

import Vuerouter from 'vue-router';

/*
 ********************************************************
 * Vuex package (store)
 ********************************************************
 */

Vue.use(Vuetify);
Vue.use(Vuerouter);


/*
 ********************************************************
 * axios package & header setup
 ********************************************************
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


/*
 ********************************************************
 * Root component
 ********************************************************
 */
import MailerStoriesComponent from './pages/mailer/MailerComponent'


/*
 ********************************************************
 * Filter library
 ********************************************************
 */
require('../../../nuxt/plugins/filters/filters');

/*
 ********************************************************
 * Layout Components
 ********************************************************
 */
import FooterComponent from './layouts/FooterComponent'

/*
 ********************************************************
 * Plugins & root Vue init
 ********************************************************
 */
import {store} from './store/index';

import {routes} from './routes';

const router = new Vuerouter({
    mode: 'history',
    routes
});


new Vue({
    el: '#admin-mailer',
    components : {
        FooterComponent
    },

    store,
    router,

    data() {
        return {}
    },

    created() {
    },

    methods: {}
})
