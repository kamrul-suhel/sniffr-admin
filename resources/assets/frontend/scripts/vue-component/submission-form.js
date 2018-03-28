/**
 * Created by kamrulahmed on 22/03/2018.
 */
require('axios');
Vue.component('submission-form',{
    data: () => ({
        valid: false,
        full_name: 'full name',
        title:'the title',
        url:'the url',
        file:'',
        file_name: '',
        tel:'',
        notes:'notes',
        credit:'credit',
        referrer:'referrer',
        terms_condition: true,
        nameRules: [
            v => !!v || 'Name is required'
        ],
        email: 'test@unilad.co.uk',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],

        uplod_progress:false,
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

                setTimeout( () => {
                    // email verify done turn off spinner
                    this.validete_email_progress = false;

                    // Send data to server
                    this.uploadFormData();
                    
                }, 1000);
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
            form.append('notes', this.notes);
            form.append('credit', this.credit);
            form.append('referrer', this.referrer);

            //show the uploading dialog box
            this.uplod_progress = true;

            axios.post('/submission', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
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

                    setTimeout(()=>{
                        window.location.href = '/thanks';
                    }, 1000)
                }
            })
            .catch(function(error){
                console.log(error);
                console.log('FAILURE!!');
            });
        }
    }
})
