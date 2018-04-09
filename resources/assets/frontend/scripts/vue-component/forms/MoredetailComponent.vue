<template>
    <div class="more-detail-component">
        <v-form v-model="valid" ref="detail_form">

            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex xs12>
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">Sorry, we can't seem to find your video with the code you provided. Please contact <u>submissions@unilad.co.uk</u></div>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <h1 class="heading text-xs-center">Your Video Details</h1>
                    </v-flex>

                    <v-flex xs12>
                        <div class="item-video text-xs-center">
                        </div>
                    </v-flex>

                    <v-flex xs12>
                        <h3 class="sub-heading text-xs-center">

                        </h3>
                    </v-flex>

                    <v-flex xs12>
                        <h2 class="sub-heading text-xs-center">Your Contact Details</h2>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                color="dark"
                                v-model="full_name"
                                value=""
                                label="Name"
                                hint="Please type your full name">
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="email"
                                label="Email"
                                color="dark"
                                value=""
                                hint=""
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="tel"
                                value=""
                                color="dark"
                                label="Phone Number:"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <h2 class="sub-heading text-xs-center">Additional Details</h2>
                    </v-flex>

                    <v-flex xs12>
                        <v-dialog
                                color="dark"
                                ref="dialog"
                                persistent
                                v-model="date_picker_modal"
                                lazy
                                full-width
                                width="290px"
                                :return-value.sync="date_filmed">
                            <v-text-field
                                    slot="activator"
                                    v-model="date_filmed"
                                    label="When was the video filmed?"
                                    prepend-icon="event"
                                    value=""
                                    readonly>
                            </v-text-field>

                            <v-date-picker
                                    color="dark"
                                    dark
                                    v-model="date_filmed"
                                    scrollable>
                                <v-spacer></v-spacer>

                                <v-btn flat color="dark" @click="date_picker_modal = false">Cancel</v-btn>

                                <v-btn flat color="dark" @click="$refs.dialog.save(date_filmed)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="description"
                                label="Please provide us with any other information (what's the story behind your video?)"
                                value=""
                                color="dark"
                                multi-line
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-radio-group
                                label="Who filmed the video?"
                                v-model="filmed_by_me">
                            <v-layout row wrap>
                                <v-flex xs6 sm4 md4 lg4>
                                    <v-radio
                                            color="dark"
                                            label="I filmed the video"
                                            value="yes"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs6 sm4 md4 lg4 align-content-left>
                                    <v-radio
                                            color="dark"
                                            label="Someone else filmed it"
                                            value="no"
                                    ></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <v-radio-group
                                v-model="permission"
                                label="Have you received permission to film/submit this video from those who are featured? (Especially in cases where there are minors/children in the video)">
                            <v-layout row wrap>
                                <v-flex xs6 sm4 md4 lg4>
                                    <v-radio
                                            label="Yes"
                                            color="dark"
                                            value="yes"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs6 sm4 md4 lg4 align-content-start>
                                    <v-radio
                                            label="No"
                                            color="dark"
                                            value="no"
                                    ></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <v-radio-group
                                label="Have you submitted this video through any other online form?"
                                :rules="[v => !!v || 'Field is required']"
                                v-model="submitted_elsewhere"
                                required>
                            <v-layout row wrap>
                                <v-flex xs6 sm4 md4 lg4>
                                    <v-radio
                                            label="Yes"
                                            color="dark"
                                            value="yes"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs6 sm4 md4 lg4>
                                    <v-radio
                                            label="No"
                                            color="dark"
                                            value="no"></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                label="Where else have you submitted this video?"
                                v-model="submitted_where"
                                color="dark"
                                multi-line
                                value="">

                        </v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <h2 class="sub-heading text-xs-center">Important Legal Stuff</h2>
                    </v-flex>

                    <v-flex xs12>
                        <v-checkbox
                                color="dark"
                                label=""
                                v-model="contact_is_owner"
                                :rules="[v => !!v || 'You must agree to continue']"
                                :value="contact_is_owner"
                                required
                        ></v-checkbox>
                    </v-flex>

                    <v-flex xs12>
                        <v-checkbox
                                color="dark"
                                label=""
                                v-model="allow_publish"
                                :rules="[v => !!v || 'You must agree to continue']"
                                required></v-checkbox>
                    </v-flex>

                    <v-flex xs12>
                        <v-checkbox
                                color="dark"
                                label=""
                                :rules="[v => !!v || 'You must agree to continue']"
                                v-model="is_exclusive"
                                required></v-checkbox>
                    </v-flex>

                    <v-flex xs12 class="text-xs-right">
                        <v-btn
                                dark
                                :loading="loading"
                                @click="onSubmit()">
                            Update Details
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>
<script>
    export default {
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
            let code = this.$route.query.code;
            console.log(this.$route.query.code);
            if(code){
                console.log('yes');
            }else{
                this.$router.push({name: 'home'});
            }
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
    }
</script>
