$(document).ready(function(){
    var browserheight = window.innerHeight;
    $('#header-home').css('height', browserheight+'px');

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
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


// Vue component
require('./vue-component/upload-video');
require('./vue-component/login-component');

new Vue({
    el:'#sniffr',
    data() {
        return {
            csrf_token : $('meta[name="csrf-token"]').attr('content'),
            login_dialog: false,
            showpassword:true,
            valid:false,
            login_progress:false,
            user:{
                email:'kamrul@unilad.co.uk',
                password:'somepass'
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
        onSubmit() {
            if(this.$refs.login_form.validate()){
                // make spinner visible
                this.login_progress = true;
                var header = {
                    'X-CSRF-TOKEN' : this.csrf_token
                };

                // prepare submitting data
                let form_data = new FormData();
                form_data.append('email', this.user.email);
                form_data.append('password', this.user.password);
                // submit data with ajax request
                axios.post('/login', form_data, header)
                .then(response => {
                    this.login_progress = true;

                    let data = response.data;
                    if(data.error){
                        this.login_progress = false;
                        this.validation.error = true;
                        this.validation.message = data.error_message;
                        return;
                    }

                    console.log(response);

                    if(data.redirect_url){
                        window.location.href = data.redirect_url;
                    }

                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
});


