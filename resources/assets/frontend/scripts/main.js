//Vue packages
window.Vue = require('vue');
import Vuetify from 'Vuetify';
import Vuerouter from 'vue-router';

// Implement Vuex
import { store } from './store/store';

Vue.use(Vuetify);
Vue.use(Vuerouter);


// Http ajax package
window.axios = require('axios');

// Setup axio default headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');



import NavigationComponent from './vue-component/layouts/NavigationComponent.vue';
import FooterComonent from './vue-component/layouts/FooterComponent.vue';

import { routes } from './routes';



// Implement Filters
require('./filters/filters');

// Plugins
const router = new Vuerouter({
    mode:'history',
    routes
});

new Vue({
    el:'#sniffr',
    store: store,
    components: {
        navigationComponent: NavigationComponent,
        footerComponent: FooterComonent
    },
    router,
    data() {
        return {
        }
    },
    methods: {

    }
});


