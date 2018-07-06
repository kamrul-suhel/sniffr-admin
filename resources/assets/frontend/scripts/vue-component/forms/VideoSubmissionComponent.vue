<template>
    <section class="upload-video-section section-space">
        <v-container grid-list-xl>
            <v-layout row wrap>
                <v-flex xs12>
                    <div>
                        <h2 class="text-center text-uppercase">Your Contact Details</h2>
                    </div>

                    <v-form v-model="valid" ref="form">
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
                                            :rules="emailRules"
                                            color="dark"
                                            required
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>

                            <v-layout row wrap>
                                <v-flex xs12 text-xs-center>
                                    <h2 class="text-xs-center text-uppercase">Your video details</h2>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Video title"
                                            v-model="title"
                                            name="title"
                                            color="dark"
                                            :rules="[(v) => v.length <= 140 || 'Max 140 characters']"
                                            :counter="140"
                                    ></v-text-field>
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

                            <v-layout row wrap>
                                <v-flex xs12 p-0>
                                    <v-btn
                                            dark
                                            raised
                                            :class="{error: error}"
                                            class="ml-0"
                                            @click="onPickFile()">
                                        Upload your video <v-icon dark right>system_update_alt</v-icon>
                                    </v-btn>

                                    <span v-if="error" class="red--text">Upload your file or provide a links please</span>

                                    <span>{{file_name}}</span>

                                    <p class="small-italic">Maximum file size: 500MB. Acceptable file types: avi, flv, mov, mp4, mpg, mkv, wmv, 3gp.</p>

                                    <input
                                            type="file"
                                            name="file"
                                            style="display:none;"
                                            ref="inputfile"
                                            accept="video/mp4,video/x-m4v,video/*"
                                            @change="onFilechange($event)"/>
                                </v-flex>


                            </v-layout>
                        </v-container>

                        <v-container grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="notes"
                                            label="Notes"
                                            name="notes"
                                            color="dark"
                                            hint="If we need to know anything about the video, let us know here"
                                            multi-line></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            v-model="credit"
                                            name="credit"
                                            label="Credit link"
                                            hint="Credits are placed in the pinned comment (unless alternative method is agreed)"
                                            color="dark"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            v-model="referrer"
                                            name="referrer"
                                            label="Unilad Referrer"
                                            hint="Who at UNILAD asked you to fill in this form?"
                                            color="dark">

                                    </v-text-field>
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
                                        <span slot="label">I agree to the above <a :href="termslink" target="_blank" class="dark--text">terms and conditions</a></span>
                                    </v-checkbox>
                                </v-flex>

                                <v-flex xl2 text-xs-right pa-0>
                                    <p class="red-text" v-if="validate_email_error">Look your email is not valid plese try again</p>

                                    <v-progress-circular
                                            indeterminate
                                            color="dark"
                                            v-if="validete_email_progress"></v-progress-circular>

                                    <v-btn dark @click="onSubmit()">Submit your video</v-btn>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog v-model="uplod_progress" max-width="500px" persistent>
            <v-card class="upload-dialog">
                <v-card-title>
                    <v-container >
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
            title:'',
            url:'',
            file:'',
            file_name: '',
            tel:'',
            notes:'',
            credit:'',
            referrer:'',
            source:'',
            terms_condition: false,
            termslink:'',

            nameRules: [
                v => !!v || 'Name is required'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],

            uplod_progress:false,
            progressbar: 0,
            error:false,
            validete_email_progress:false,
            validate_email_error:false,

            thank_you_dialog: false,
        }),
        created() {
            this.setSourceField();
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

                    setTimeout( () => {
                        // Send data to server
                        this.uploadFormData();

                    }, 1000);
                }

            },

            uploadFormData() {
                // uploading via ajax request
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
                form.append('notes', this.notes);
                form.append('credit', this.credit);
                form.append('referrer', this.referrer);
                form.append('source', this.source);

                //show the uploading dialog box
                this.uplod_progress = true;

                axios.post('/submission', form, {
                        onUploadProgress: function( progressEvent ) {
                            this.progressbar = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                        }.bind(this)
                    }
                )
                    .then(response => {
                        //data uploaded succes
                        let data = response.data;
                        if(data.status == 'success'){
                            // set all default
                            this.progressbar = 0;

                            //Email progress
                            this.uplod_progress = false;

                            // clear form data
                            this.$refs.form.reset();
                            this.file_name = '';
                            setTimeout(()=>{
                               this.thank_you_dialog = true;
                            }, 1000)
                        }
                    })
                    .catch(function(error){
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