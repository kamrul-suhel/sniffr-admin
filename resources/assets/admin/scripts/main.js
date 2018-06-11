import Vue from 'vue';
import {store} from './store/index';

/**
 * Add vue filter library
 */

require('../../frontend/scripts/filters/filters');


/**
 * Import component
 */

import MailerStoriesComponent from './components/pages/MailerComponent'

new Vue({
    el:'#admin-mailer',
    components: {
      mailerComponent: MailerStoriesComponent
    },
    store,

    data(){
        return {
        }
    },

    created(){

    },

    methods: {

    }
})