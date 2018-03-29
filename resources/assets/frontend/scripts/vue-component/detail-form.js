/**
 * Created by kamrulahmed on 22/03/2018.
 */
require('axios');
Vue.component('detail-form',{
    data: () => ({
        valid: false,
        full_name: 'somename',
        email: 'email',
        tel:'0239480',
        location:'london',
        description:'some description',
        filmed_by_me:'filmed_by me',
        permission:'yes',
        submitted_elsewhere:'no',
        submitted_where:'youtube',
        contact_is_owner:'yes',
        allow_publish:'yes',
        is_exclusive:'no',

        // date picker setting
        date_filmed:null,
        date_picker_modal:false,
        menu:false,

        uplod_progress:false,
        progressbar: 0,

        //Loading process
        loading: false,
    }),
    created() {

    },
    watch: {
      
    },


    methods: {
        onSubmit() {
            if(this.$refs.detail_form.validate()){
                this.loading=true;
                this.uploadFormData();
            }
        },

        uploadFormData() {
            // uploading via ajax request
            let form = new FormData();
            form.append('full_name', this.full_name);
            form.append('email', this.email);
            form.append('tel', this.tel);
            form.append('location', this.location);
            form.append('description', this.description);
            form.append('filmed_by_me', this.filmed_by_me);
            form.append('permission', this.permission);
            form.append('submitted_elsewhere', this.submitted_elsewhere);
            form.append('submitted_where', this.submitted_where);
            form.append('contact_is_owner', this.contact_is_owner);
            form.append('allow_publish', this.allow_publish);
            form.append('is_exclusive', this.is_exclusive);
            form.append('date_filmed', this.date_filmed);

            axios.post('/details/ZZTlVk8jdz3jRB6v9xbl99dtXhCIQa', form)
            .then(response => {
                //data uploaded succes
                let data = response.data;
                if(data.success === 1){
                        setTimeout( () => {
                        // this.uploadFormData();
                        this.loading=false;
                    }, 1000);
                }
            })
            .catch(function(error){
                console.log(error);
                console.log('FAILURE!!');
            });
        }
    }
})
