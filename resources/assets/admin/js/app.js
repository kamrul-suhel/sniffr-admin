/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });

require('../../talvbansal/media-manager/js/media-manager');

// Vue.component('NewPostModal', {
//   template: `<div class="modal-body">
//         <label class="form-label">
//             Title
//             <input v-model="title" class="form-control">
//         </label>
//         <label class="form-label">
//             Body
//         </label>
//     </div>`,
// });

const app = new Vue({
        el: '#app',
        data:{
            showMediaManager: false,
            showModal: false,
            selectedEventName: 'editor'
        },
        mounted(){
            window.eventHub.$on('media-manager-selected-editor', (file) => {
                console.log(file.name);
                console.log(file.mimeType);
                console.log(file.relativePath);
                console.log(file.webPath);
                this.showMediaManager = false;
            });
        }
    });
