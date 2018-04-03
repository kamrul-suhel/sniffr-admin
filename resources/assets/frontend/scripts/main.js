//Vue packages
window.Vue = require('vue');
import Vuetify from 'Vuetify';
import Vuerouter from 'vue-router';


Vue.use(Vuetify);
Vue.use(Vuerouter);


// Http ajax package
window.axios = require('axios');

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');


// Vue component
require('./vue-component/submission-form');
require('./vue-component/login-component');
require('./vue-component/detail-form');

import NavigationComponent from './vue-component/layouts/NavigationComponent.vue';


import { routes } from './routes';

// Implement Vuex 
import { store } from './store/store';

// Implement Filters
require('./filters/filters');

const router = new Vuerouter({
    mode:'history',
    routes
});



new Vue({
    el:'#sniffr',
    store: store,
    components: {
        navigationComponent: NavigationComponent
    },
    router,
    data() {
        return {
            csrf_token : $('meta[name="csrf-token"]').attr('content'),
            login_dialog: false,
            showpassword:true,
            valid:false,
            login_progress:false,
            user:{
                email:'',
                password:''
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            validation:{
                error: false,
                message:''
            }
        }
    },
    methods: {

    }
});


