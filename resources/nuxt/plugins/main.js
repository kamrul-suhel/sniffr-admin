import 'babel-polyfill'
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

/*
 ********************************************************
 * Twitter widget for twitter widget loader
 ********************************************************
 */
window.TwitterWidgetsLoader = require('twitter-widgets');

/**
 * ***********************************************
 *  Filter
 * ************************************************
 */

require('./filters/filters');
