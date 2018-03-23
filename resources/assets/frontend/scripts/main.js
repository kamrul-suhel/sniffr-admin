$(document).ready(function(){
    var browserheight = window.innerHeight;
    $('#video').css('height', browserheight+'px');

    var first_nav_pos = $('#nav').position();
    var second_nav_pos = $('.second-navigation').position();
    var second_nav_height = $('.second-navigation').outerHeight();
    var hide_nav_position = browserheight - second_nav_height;

    $(window).scroll(function(e){
        if(window.pageYOffset > hide_nav_position){
            $('#nav').hide();
        }else{
            $('#nav').show();
        }
    });
});

//Vue packages
require('vue');
window.axios = require('axios');


// Vue component
require('./vue-component/upload-video');
require('./vue-component/login-component');

new Vue({
    el:'#sniffr',
    data() {
        return {
            login_dialog: false,
            showpassword:true,
            valid:false,
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
            ]
        }
    },
    methods: {
        onSubmit() {
            if(this.$refs.login_form.validate()){
                
            }
        }
    }
});


