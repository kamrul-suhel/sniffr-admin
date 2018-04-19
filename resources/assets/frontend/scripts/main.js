/*
 ********************************************************
 * Glabal package
 ********************************************************
 */

window.Vue = require('vue');
import Vuetify from 'Vuetify';
import Vuerouter from 'vue-router';


/*
 ********************************************************
 * Vuex package (store)
 ********************************************************
 */
import {store} from './store/store';
Vue.use(Vuetify);
Vue.use(Vuerouter);


/*
 ********************************************************
 * axios package & header setup
 ********************************************************
 */

window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


/*
 ********************************************************
 * Root component
 ********************************************************
 */

import NavigationComponent from './vue-component/layouts/NavigationComponent.vue';
import FooterComonent from './vue-component/layouts/FooterComponent.vue';

import {routes} from './routes';


/*
 ********************************************************
 * Global Filters
 ********************************************************
 */

require('./filters/filters');


/*
 ********************************************************
 * Login event bus
 ********************************************************
 */

import {LoginEventBus} from './event-bus/login-event-bus.js';


/*
 ********************************************************
 * Plugins & root Vue init
 ********************************************************
 */

const router = new Vuerouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#sniffr',
    store: store,
    components: {
        navigationComponent: NavigationComponent,
        footerComponent: FooterComonent
    },
    router,
    data() {
        return {}
    },
    methods: {}
});