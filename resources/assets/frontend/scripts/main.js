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


new Vue({
    el:'#sniffr',
    data: () => ({
        valid: false,
        full_name: '',
        nameRules: [
            v => !!v || 'Name is required'
        ],
        email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        phone:'',
            phoneRules: [
            v => !!v || 'Phone number is required'
        ],
    terms_condition: false,
        file_name: '',
        progressbar: 20,
    }),


    methods: {
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
        },

        onPickFile() {
            this.progressbar = 0;
            this.$refs.inputfile.click();
        },

        onFilechange(event) {
            // check is file choose or not
            if(!event.target.files[0]){
                console.log('file not upload');
                return;
            }

            const file = event.target.files[0];

            let filename = file.name;
            let size = file.size;
            this.file_name = filename;

            if(filename.lastIndexOf('.') <= 0){
                console.log('File not upload');
                return;
            }else{
                var reader = new FileReader();
                reader.onload = function() {
                    var media = new Audio(reader.result);
                    media.onloadedmetadata = function(){
//                        media.duration; // this would give duration of the video/audio file
                    };
                };
                reader.readAsDataURL(file);
            }

            // uploading via ajax request
            let form = new FormData();
            form.append('file', file);
            form.append('upload', true);
            //set request

            axios.post('http://localhost/fileupload/form.php', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function( progressEvent ) {
                        this.progressbar = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                    }.bind(this)
                }
            )
                .then(function(resopnse){
                    console.log(resopnse);
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
        },

        // get email if it is valid or not
        emailVerify() {
            let data = {
                verify_email:true,
                user_email : this.email,
            };
            let form = new FormData();
            form.append('verify_email', true);
            form.append('user_email', this.email);
            let headers = {
                headers : {
                    "Content-type":"multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                }
            };
            axios.post('http://localhost/vuetify/vuetify-1/email_verify.php',
                form, headers)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});


