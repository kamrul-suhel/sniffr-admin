/**
 * Created by kamrulahmed on 22/03/2018.
 */
require('axios');
Vue.component('upload-video',{
    data: () => ({
        csrf_token : $('meta[name="csrf-token"]').attr('content'),
        valid: false,
        full_name: '',
        uplod_progress:false,
        nameRules: [
            v => !!v || 'Name is required'
        ],
        email: '',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        tel:'',
            phoneRules: [
            v => !!v || 'Phone number is required'
        ],
        title:'',
        url:'',
        file:'',
        terms_condition: false,
        file_name: '',
        progressbar: 0,
        error:false
    }),
    created() {

    },


    methods: {
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
        },

        onPickFile() {
            console.log(this.csrf_token);
            this.progressbar = 0;
            this.$refs.inputfile.click();
        },

        onFilechange(event) {
            // check is file choose or not
            if(!event.target.files[0]){
                console.log('file not upload');
                return;
            }
            this.file = event.target.files[0];
            this.file_name = this.file.name;

        },


        onSubmit() {
            if(this.url === '' && this.file === ''){
                this.error = true;
            }

            // Check the email is valid email or not
            

            // check the form is validate
            if(this.$refs.form.validate()){
                // uploading via ajax request
                let form = new FormData();
                form.append('file', this.file);
                form.append('full_name', this.full_name);
                form.append('email', this.email);
                form.append('title', this.title);
                form.append('tel', this.tel);
                form.append('terms', this.terms_condition);
                form.append('url', this.url);
                //set request

                //show the uploading dialog box
                this.uplod_progress = true;
                console.log(this.csrf_token);

                axios.post('/upload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN' : this.csrf_token
                        },
                        onUploadProgress: function( progressEvent ) {
                            this.progressbar = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                            console.log(this.progressbar);
                        }.bind(this)
                    }
                )
                    .then(function(resopnse){
                        console.log(resopnse);
                    })
                    .catch(function(error){
                        console.log(error);
                        console.log('FAILURE!!');
                    });
            }
            
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
})
