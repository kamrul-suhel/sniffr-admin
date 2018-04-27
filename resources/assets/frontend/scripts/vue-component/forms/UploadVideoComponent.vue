<template>
    <!-- UPLODA VIDEO SECTION -->
    <section class="upload-video-section section-space">
        <v-container grid-list-xl>
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
                                            :rules="nameRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Email Address:"
                                            v-model="email"
                                            :rules="emailRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Phone Number"
                                            v-model="tel"
                                            color="dark"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Video title"
                                            v-model="title"
                                            color="dark"
                                            :rules="[v => !!v || 'Title is required', (v) => v.length <= 140 || 'Max 140 characters']"
                                            :counter="140"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12>
                                    <h2 class="text-xs-center text-uppercase">Your video details</h2>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12 p-0>
                                    <v-btn
                                            dark
                                            raised
                                            class="ml-0"
                                            :class="{error: error}"
                                            @click="onPickFile()">
                                        Upload your video
                                        <v-icon dark right>system_update_alt</v-icon>
                                    </v-btn>
                                    <span v-if="error"
                                          class="red--text">Upload your file OR provide a link please</span> <span>{{file_name}}</span>

                                    <p class="small-italic">
                                        Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv,
                                        wmv, 3gp.</p>

                                    <input
                                            color="dark"
                                            type="file"
                                            style="display:none;"
                                            ref="inputfile"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            @change="onFilechange($event)"/>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            color="dark"
                                            label="Video link/URL"
                                            v-model="url"
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

                            <div class="term-condition-content scroll-y term-condition"
                                 id="scroll-target" style="max-height: 250px">

                                <v-layout row wrap
                                          column
                                          align-center
                                          justify-center
                                          v-scroll:#scroll-target="onScroll">

                                    <v-flex xs12>

                                        <h4>Ownership</h4>
                                        <p>
                                            I certify that I am the sole owner of all intellectual property rights for
                                            this video or have the express permission of the rights holder to submit
                                            this video to UNILAD for exclusive publishing on UNILAD.</p>
                                        <p>
                                            I agree to submit and licence this video and its content to UNILAD and their
                                            associated companies for their use at their sole discretion, in exchange for
                                            entry into their £300 monthly prize draw.</p>

                                        <h4>Video Publishing Acknowledgement</h4>
                                        <p>
                                            I understand that the video I am submitting may be published to UNILAD web
                                            properties including, but not limited to, YouTube, UNILAD.co.uk, Twitter,
                                            Facebook, and any other avenues of promotion, as determined by UNILAD
                                            according to the terms of this agreement, which I have read and agree
                                            to.</p>

                                        <h4>Exclusive Licensing</h4>
                                        <p>
                                            I agree that UNILAD as the ‘License Holder’ be granted the exclusive,
                                            unlimited right to use, and to exhibit, distribute, and hereafter devise, in
                                            any manner upon all UNILAD platforms throughout the world, in perpetuity,
                                            for any purpose whatsoever as UNILAD in its sole discretion may determine
                                            (the “Licensed Rights”). I do hereby irrevocably appoint UNILAD as its
                                            attorney-in-fact in relation to the rights over these images.</p>
                                        <p>
                                            I certify that I act with full lawful authority to grant this license, and
                                            warrant that there has not been any previous grant of any other license to
                                            third parties in relation to these images and it is expressly understood
                                            that UNILAD has not assumed any obligations under any other contracts
                                            entered into by myself.</p>
                                        <p>
                                            I further undertake not to enter any future agreements over this content
                                            with any third parties, as required by the exclusivity of this agreement and
                                            will promptly forward any communications regarding my content to UNILAD, as
                                            the new License Holder.</p>
                                        <p>
                                            I hereby agree to indemnify, release and hold harmless UNILAD, its
                                            successors, in any action arising from the use of the images, resulting from
                                            any breach by Licensor of any warranty, representation or any other
                                            provision of these Terms.</p>

                                        <h4>Publicity/Confidentiality</h4>
                                        <p>
                                            I shall not release, or cause the release, of any information concerning the
                                            Licensed Rights, UNILAD or the terms of this License. I will inform UNILAD
                                            if there are any changes to my personal details for the duration of this
                                            agreement. UNILAD undertakes to maintain personal details confidentially and
                                            in accordance with all relevant data protection laws and the Privacy Policy
                                            available on our Website and incorporated herein.</p>

                                        <h4>Terms &amp; Services</h4>
                                        <p>
                                            I acknowledged, understands and agree to the additional terms and services
                                            displayed on the UNILAD website which are incorporated herein by this
                                            reference and subject to change.</p>

                                        <h4>Termination Clause</h4>
                                        <p>
                                            The License shall only be terminable upon the mutual agreement of the
                                            parties with 5 months’ notice, I agree to indemnify UNILAD for any losses
                                            from third party contracts arising due to termination. Termination will have
                                            no effect on any prior use or treatment of the images by UNILAD, which may
                                            continue in perpetuity.</p>
                                        <p>
                                            I understand that participation in the UNILAD video system is at will and I
                                            agree that this license may only be terminated by mutual agreement between
                                            UNILAD and I as set out above.</p>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-container> <!-- End container -->

                        <v-container grid-list-lg>
                            <v-layout row wrap>

                                <v-flex xs12 pb-0>
                                    <v-checkbox
                                            v-model="terms_condition"
                                            :rules="[v => !!v || 'You must agree to continue']"
                                            color="dark"
                                            required
                                    >
                                        <span slot="label">I agree to the above <a :href="termslink" target="_blank">terms and conditions</a></span>
                                    </v-checkbox>
                                </v-flex>

                                <v-flex xsl2 text-xs-right pa-0>
                                    <p class="red-text" v-if="validate_email_error">
                                        Look your email is not valid plese try again</p>

                                    <v-btn dark
                                           :loading="validete_email_progress"
                                           :disabled="validete_email_progress"
                                           @click="onSubmit()"
                                    >
                                        Submit your video
                                    </v-btn>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog v-model="uplod_progress" max-width="500px">
            <v-card class="upload-dialog">
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
                                <img src="assets/frontend/images/hamster_wheel.gif"/>
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
            csrf_token: $('meta[name="csrf-token"]').attr('content'),
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
            source:'',

            uplod_progress: false,
            file_name: '',
            progressbar: 0,

            error: false,
            validete_email_progress: false,
            loader: null,
            validate_email_error: false,
            upload_error_msg: '',
            thank_you_dialog: false,

            //terms & condition
            termslink:''
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
                form.append('tel', this.tel);
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
                        },
                        onUploadProgress: function (progressEvent) {
                            this.progressbar = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                            console.log(this.progressbar);
                        }.bind(this)
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

            setSourceField(){
                if(this.$route.query.source){
                    this.source = this.$route.query.source;
                }

                this.setTermsLink();
            },

            setTermsLink(){

                if(this.source === ''){
                    this.termslink = '/terms';
                    return;
                }

                this.termslink = 'https://www.unilad.co.uk/terms-use'


            }
        }
    }
</script>