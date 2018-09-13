import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
//
if(process.browser){
    window.$ = require('jquery');
    window.TwitterWidgetsLoader = require('twitter-widgets');
}
//
// import SearchServices from './services/SearchServices';
//
// /*
//  ********************************************************
//  * Twitter widget for twitter widget loader
//  ********************************************************
//  */
// //
//
// /**
//  * ***********************************************
//  *  Filter
//  * ************************************************
//  */
//
require('./filters/filters');
