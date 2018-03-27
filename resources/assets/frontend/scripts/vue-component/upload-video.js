/**
 * Created by kamrulahmed on 22/03/2018.
 */
require('axios');
Vue.component('upload-video',{
    data: () => ({
        csrf_token : $('meta[name="csrf-token"]').attr('content'),
        valid: false,
        full_name: '',
        title:'',
        url:'',
        file:'',
        terms_condition: false,
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
        uplod_progress:false,
        file_name: '',
        progressbar: 0,
        error:false,
        validete_email_progress:false,
        validate_email_error:false
    }),
    created() {

    },


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
                return;
            }
            this.error = false;
            this.file = event.target.files[0];
            this.file_name = this.file.name;

        },


        onSubmit() {
            if(this.url === '' && this.file === ''){
                this.error = true;
            }else{
                this.error = false;
            }

            if(this.$refs.form.validate()){
                if(this.error){
                    return;
                }

                // Email verify progress on
                this.validete_email_progress = true;

                // Check the email is valid email or not
                let form_email = new FormData();
                form_email.append('email', this.email);
                axios.post('/upload/emailverify', form_email, {
                    headers:
                        {
                            'Content-Type': 'multipart/form-data',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN' : this.csrf_token
                        }
                })
                .then(response => {
                    //Delay for one second
                    setTimeout( () => {
                        // email verify done turn off spinner
                        this.validete_email_progress = false;

                        let data = response.data;
                        if(data.found_email === 1){
                            this.uploadFormData();
                        }else{
                            // mean email is not verify
                            this.validate_email_error = true;

                        }
                    }, 1000)
                })
                .catch(error => {
                    // console.log(error);
                });
            }
            
        },

        uploadFormData() {
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
            .then(response => {
                //data uploaded succes
                let data = response.data;
                console.log(data);

                if(data.status == 'success'){
                    // set all default
                    this.progressbar = 0;

                    //Email progress 
                    this.uplod_progress = false;

                    // clear form data
                    this.$refs.form.reset();
                }
            })
            .catch(function(error){
                console.log(error);
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
})
