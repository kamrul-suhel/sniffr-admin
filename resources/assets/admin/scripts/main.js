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
Vue.use(require('vue-moment'));


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
require('../../frontend/scripts/filters/filters');

/*
 ********************************************************
 * Layout Components
 ********************************************************
 */
import FooterComponent from './layouts/FooterComponent';
import CommentsComponent from './includes/CommentsComponent';
import Modal from './includes/Modal';

/*
 ********************************************************
 * Plugins & root Vue init
 ********************************************************
 */
import {store} from './store/index';
import {mapGetters} from 'vuex';
import {routes} from './routes';

const router = new Vuerouter({
    mode: 'history',
    routes
});


new Vue({
    el: '#sniffr-app',
    components : {
        FooterComponent,
        CommentsComponent,
        Modal,
    },

    store,
    router,

    data: {

    },

    computed: {
        ...mapGetters({
            modalVisible: 'getModalVisibility',
        })
    },

    created(){
        // initialize code go here before load any of component. like user, settings
        this.$store.dispatch('getLoginStatus');
    },

    methods: {
        showModal(asset){
            this.$store.commit('setAsset', asset);
            this.$store.commit('setModalVisibility', true);
        },

        closeModal(){
            this.$store.commit('setModalVisibility', false);
        }
    }
});
