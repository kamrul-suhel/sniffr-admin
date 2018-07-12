<template>
    <!-- UPLODA VIDEO SECTION -->
    <section class="upload-video-section section-space" :class="{'iframe-style': is_iframe}">
        <v-container grid-list-xl>
            <v-layout row  wrap v-if="source">
                <v-flex xs12 class="text-xs-center">
                    <h1 class="heading text-uppercase">Share your content and grab £100 while you’re at it!</h1>
                </v-flex>

                <v-flex xs12 class="text-xs-center">
                    <p>We never get bored of seeing videos from our fans! Whether it’s a must-see moment of comedy gold, an unbelievable skill or just something that’s flat out bizarre, send it our way and if we put it up on the UNILAD Facebook page we’ll send you £100! *Terms and conditions apply</p>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12>
                    <div class="upload-video-title">
                        <h1 class="heading">UPLOAD YOUR VIDEO</h1>
                    </div>

                    <div>
                        <h2 class="text-center text-uppercase">Your Contact Details</h2>
                    </div>

                    <v-form v-model="valid" ref="form" id="upload-form">
                        <v-container grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Full Name:"
                                            v-model="full_name"
                                            name="full_name"
                                            :rules="nameRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Email Address:"
                                            v-model="email"
                                            name="email"
                                            @keyup="checkEmailfield(email)"
                                            type="email"
                                            :rules="emailRules"
                                            color="dark"
                                            required
                                    ></v-text-field>

                                    <div class="email-validation red--text" v-if="email_optional_error">Are you sure
                                        this is correct?
                                    </div>
                                </v-flex>

                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Phone Number"
                                            v-model="tel"
                                            name="tel"
                                            type="tel"
                                            color="dark"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="text-xs-center text-uppercase">Your video details</h2>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Video title"
                                            v-model="title"
                                            name="title"
                                            color="dark"
                                            :error="title_optional"
                                            :hint="title_optional ? 'Title must be 70 characters or less.' : ''"
                                            :required="title_optional"
                                            :counter="70"
                                            @keyup="checkTitleLength()"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 p-0 class="upload-video-button">
                                    <v-btn
                                            dark
                                            raised
                                            class="ml-0"
                                            :class="{error: error}"
                                            @click="onPickFile()">
                                        Choose file
                                        <v-icon dark right>attachment</v-icon>
                                    </v-btn>
                                    <span v-if="error"
                                          class="red--text">Upload your video OR provide video a link please.</span> <span>{{file_name}}</span>

                                    <p class="small-italic">
                                        Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv,
                                        wmv, 3gp.</p>

                                    <input
                                            color="dark"
                                            type="file"
                                            name="file"
                                            style="display:none;"
                                            ref="inputfile"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            @change="onFilechange($event)"/>
                                </v-flex>

                                <v-flex xs12 class="text-xs-center">
                                    <div class="video-upload-separator">
                                        <h2>Or</h2>
                                    </div>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            color="dark"
                                            label="Video link/URL"
                                            v-model="url"
                                            name="url"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>

                        <v-container grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="text-xs-center text-uppercase">Terms &amp; Conditions</h2>
                                </v-flex>
                            </v-layout>
                        </v-container> <!-- End container -->

                        <v-container grid-list-lg>
                            <v-layout row wrap>

                                <v-flex xs12 pb-0 class="terms">
                                    <v-checkbox
                                            v-model="terms_condition"
                                            :rules="[v => !!v || 'You must agree to continue']"
                                            color="dark"
                                            name="terms"
                                            required
                                    >
                                        <span slot="label">I agree to the <a :href="termslink" target="_blank">terms and conditions</a></span>
                                    </v-checkbox>
                                </v-flex>

                                <v-flex xsl2 text-xs-right pa-0>
                                    <p class="red-text" v-if="validate_email_error">
                                        Look your email is not valid plese try again</p>

                                    <v-btn dark
                                           :loading="validete_email_progress"
                                           :disabled="validete_email_progress"
                                           @click="onSubmit()"
                                    >Submit your video
                                    </v-btn>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog
                v-model="uplod_progress"
                max-width="500px"
                persistent>
            <v-card class="upload-loading-modal" dark
                    color="dark">
                <v-card-title>
                    <v-container>
                        <v-layout row justify-center>
                            <v-flex>
                                <h2 class="text-xs-center sub-heading">Your file is uploading</h2>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-xl>
                        <v-layout>
                            <v-flex>
                                <img src="/assets/frontend/images/hamster_wheel.gif"/>
                            </v-flex>
                        </v-layout>

                        <v-layout>
                            <v-flex xs10>
                                <div v-if="upload_error_msg">{{ upload_error_msg }}</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>


        <!-- Thank you dialog box -->
        <v-dialog v-model="thank_you_dialog" max-width="500px" persistent>
            <v-card
                    dark
                    color="dark">
                <v-card-text class="text-xs-center pb-0">
                    <h2>Thanks for the video.. You rock!</h2>
                </v-card-text>
                <v-card-actions class="text-xs-center">
                    <v-spacer></v-spacer>
                    <v-btn color="dark" raised flat @click.stop="thank_you_dialog=false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </section>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            full_name: '',
            title: '',
            url: '',
            file: '',
            terms_condition: false,
            nameRules: [
                v => !!v || 'Full name is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            tel: '',
            source: '',

            uplod_progress: false,
            file_name: '',
            progressbar: 0,

            error: false,
            validete_email_progress: false,
            loader: null,
            validate_email_error: false,
            upload_error_msg: '',
            thank_you_dialog: false,

            email_optional_error: false,

            //terms & condition
            termslink: '',

            title_optional: false,

            is_iframe: false
        }),
        created() {
            this.setSourceField();
        },


        methods: {
            onScroll(e) {
                this.offsetTop = e.target.scrollTop
            },

            onPickFile() {
                this.progressbar = 0;
                this.$refs.inputfile.click();
            },

            onFilechange(event) {
                // check is file choose or not
                if (!event.target.files[0]) {
                    return;
                }
                this.error = false;
                this.file = event.target.files[0];
                this.file_name = this.file.name;

            },


            onSubmit() {
                if (this.url === '' && this.file === '') {
                    this.error = true;
                } else {
                    this.error = false;
                }

                //check title length
                if(this.title && this.title.length > 70){
                    return false;
                }

                if (this.$refs.form.validate()) {
                    if (this.error) {
                        return;
                    }

                    // Email verify progress on
                    this.validete_email_progress = true;
                    this.loader = 'loading';

                    setTimeout(() => {
                        // email verify done turn off spinner
                        this.loader = null;
                        this.validete_email_progress = false;
                        this.uploadFormData();
                    }, 1000)

                }

            },

            uploadFormData() {
                // uploading via Http request
                let form = new FormData();

                //check if file upload or not
                if (this.file) {
                    form.append('file', this.file);
                }


                form.append('full_name', this.full_name);
                form.append('email', this.email);
                form.append('title', this.title);

                // Checking if tel phone is null then not to send this field
                if (this.tel != '') {
                    form.append('tel', this.tel);
                }

                form.append('terms', this.terms_condition);
                form.append('url', this.url);
                form.append('source', this.source);
                //set request


                //show the uploading dialog box
                this.uplod_progress = true;
                axios.post('/upload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRF-TOKEN': this.csrf_token
                        }
                    }
                )
                    .then(response => {
                        //data uploaded succes
                        let data = response.data;
                        if (data.status == 'success') {
                            // set all default
                            this.progressbar = 0;

                            //Email progress
                            this.uplod_progress = false;

                            // clear form data

                            this.$refs.form.reset();
                            this.file_name = '';
                            this.file = '';
                            setTimeout(() => {
                                this.thank_you_dialog = true;
                            }, 1000)
                        }

                        if (data.error) {
                            this.upload_error_msg = data.error_message;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log('FAILURE!!');
                    });
            },

            setSourceField() {
                if (this.$route.query.source) {
                    this.source = this.$route.query.source;
                }

                this.setTermsLink();
            },

            setTermsLink() {
                if (this.source === '') {
                    this.termslink = '/terms';
                    return;
                }
                this.is_iframe = true;
                this.termslink = 'https://www.unilad.co.uk/submit/submission-terms-and-conditions/'
            },

            checkEmailfield(email) {
                if(email != null){
                    if (email.toLowerCase().indexOf(".con") >= 0 || email.toLowerCase().indexOf(".conuk") >= 0) {
                        this.email_optional_error = true;
                    }else{
                        this.email_optional_error = false;
                    }
                }
            },

            checkTitleLength(){
                if(this.title && this.title.length > 70){
                    this.title_optional = true;
                    return true;
                }
                this.title_optional = false;
            }



        }
    }
</script>