/*
 ********************************************************
 * Glabal package
 ********************************************************
 */
import 'babel-polyfill';

window.axios = require('axios');
window.Vue = require('vue');
window.Vuetify = require('vuetify');

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
require('../../../nuxt/plugins/filters/filters');

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
    components: {
        FooterComponent,
        CommentsComponent,
        Modal,
    },

    store,
    router,

    data: {},

    computed: {
        ...mapGetters({
            modalVisible: 'getModalVisibility',
        })
    },

    created() {
        // initialize code go here before load any of component. like user, settings
        axios.get('/settings_object')
            .then(response => {
                this.$store.commit('setUserStatus', response.data.sniffr_app);
            })
            .catch(error => {
                console.log(error)
            })
    },

    methods: {
        showModal(asset) {
            console.log('moo');
            this.$store.commit('setAsset', asset);
            this.$store.commit('setModalVisibility', true);
        },

        closeModal() {
            this.$store.commit('setModalVisibility', false);
        }
    }
});
