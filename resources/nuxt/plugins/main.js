import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

window.$ = require('jquery');

import SearchServices from './services/SearchServices';

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
