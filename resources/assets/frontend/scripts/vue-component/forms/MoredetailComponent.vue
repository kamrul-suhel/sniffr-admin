<template>
    <div class="more-detail-component">
        <v-form v-model="valid" ref="detail_form" id="details-form">

            <v-container grid-list-lg>

                <v-layout row wrap v-if="http_error">
                    <v-flex xs12>
                        <div class="panel panel-primary" data-collapsed="0">
                            <div class="panel-heading">Sorry, we can't seem to find your video with the code you
                                provided. Please contact <u>submissions@unilad.co.uk</u></div>
                        </div>
                    </v-flex>
                </v-layout>

                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <h1 class="heading text-xs-center text-uppercase">Your Video Details</h1>
                    </v-flex>

                    <v-flex xs12 class="text-xs-center">
                        <div v-html="video.iframe"></div>
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
                        <h2 class="sub-heading text-xs-center text-uppercase">Your Contact Details</h2>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                color="dark"
                                v-model="full_name"
                                name="full_name"
                                value=""
                                label="Name"
                                hint="Please type your full name"
                                disabled>
                        </v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="email"
                                name="email"
                                type="email"
                                label="Email"
                                color="dark"
                                disabled
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="tel"
                                name="tel"
                                type="tel"
                                value=""
                                color="dark"
                                :disabled="(tel != '')"
                                label="Phone Number:"
                            counter="15"></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <h2 class="sub-heading text-xs-center text-uppercase">Additional Details</h2>
                    </v-flex>

                    <v-flex xs12>
                        <v-dialog
                                color="dark"
                                ref="dialog"
                                class="dark"
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
                                    readonly
                                    class="dark">
                            </v-text-field>

                            <v-date-picker
                                    color="light"
                                    light
                                    min="2000-04"
                                    :max="max_date"
                                    v-model="date_filmed"
                            >
                                <v-spacer></v-spacer>

                                <v-btn flat color="dark" @click="date_picker_modal = false">Cancel</v-btn>

                                <v-btn flat color="dark" @click="$refs.dialog.save(date_filmed)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                                v-model="description"
                                name="description"
                                label="Please provide us with any other information (what's the story behind your video?)"
                                color="dark"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-radio-group
                                label="Who filmed the video?"
                                v-model="filmed_by_me"
                                id="filmed_by_me"
                                name="filmed_by_me"
                                :rules="[v => !!v || 'Field is required']"
                                required>
                            <v-layout row wrap>
                                <v-flex xs12 sm4 md4 lg4>
                                    <v-radio
                                            color="dark"
                                            label="I filmed the video"
                                            value="1"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs12 sm4 md4 lg4 align-content-left>
                                    <v-radio
                                            color="dark"
                                            label="Someone else filmed it"
                                            value="0"
                                    ></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <v-flex xs12 class="pl-0 pb-0">
                            <p class="gray-text mb-0">Have you received permission to film/submit this video from those
                                who are featured? (Especially in cases where there are minors/children in the video)</p>
                        </v-flex>
                        <v-radio-group
                                v-model="permission"
                                name="permission"
                                id="permission"
                                :rules="[v => !!v || 'Field is required']"
                                required>

                            <v-layout row wrap>
                                <v-flex xs12 sm4 md4 lg4>
                                    <v-radio
                                            label="Yes"
                                            color="dark"
                                            value="1"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs12 sm4 md4 lg4 align-content-start>
                                    <v-radio
                                            label="No"
                                            color="dark"
                                            value="0"
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
                                name="submitted_elsewhere"
                                id="submitted_elsewhere"
                                required>
                            <v-layout row wrap>
                                <v-flex xs12 sm4 md4 lg4>
                                    <v-radio
                                            label="Yes"
                                            color="dark"
                                            value="1"
                                    ></v-radio>
                                </v-flex>

                                <v-flex xs12 sm4 md4 lg4>
                                    <v-radio
                                            label="No"
                                            color="dark"
                                            value="0"></v-radio>
                                </v-flex>
                            </v-layout>
                        </v-radio-group>
                    </v-flex>

                    <v-flex xs12>
                        <transition name="slide-fade" mode="out-in" v-if="submitted_elsewhere === '1'">
                            <v-text-field
                                    label="Where else have you submitted this video?"
                                    v-model="submitted_where"
                                    name="submitted_where"
                                    color="dark"
                            >
                            </v-text-field>
                        </transition>
                    </v-flex>

                    <v-flex xs12>
                        <h2 class="sub-heading text-xs-center text-uppercase">Important Legal Stuff</h2>
                    </v-flex>

                    <v-flex xs12 class="legal-stuff">
                        <v-checkbox
                                color="dark"
                                v-model="contact_is_owner"
                                true-value="1"
                                name="contact_is_owner"
                                id="contact_is_owner"
                                :rules="[v => !!v || 'You must agree to continue']"
                                required
                        >
                            <span slot="label">
                                I confirm that I filmed this video and/or I am the rightful owner to this video.
                            </span>
                        </v-checkbox>
                    </v-flex>

                    <v-flex xs12 class="legal-stuff">
                        <v-checkbox
                                color="dark"
                                v-model="allow_publish"
                                name="allow_publish"
                                id="allow_publish"
                                true-value="1"
                                :rules="[v => !!v || 'You must agree to continue']"
                                required>
                            <span slot="label">
                                I confirm that I am happy for this video to be published and viewed by potentially millions of people. (Especially in cases where there are minors/children in the video).
                            </span>
                        </v-checkbox>
                    </v-flex>

                    <v-flex xs12 class="legal-stuff">
                        <v-checkbox
                                color="dark"
                                :rules="[v => !!v || 'You must agree to continue']"
                                v-model="is_exclusive"
                                id="is_exclusive"
                                true-value="1"
                                name="is_exclusive"
                                required>
                            <span slot="label">I confirm that I am granting UNILAD an exclusive license to this video and understand that this means I cannot and will not enter into a discussion with any other company regarding this content. I understand that UNILAD are the new license holders and I will inform them of any contact I receive from another company regarding the use of this video.</span>
                        </v-checkbox>
                    </v-flex>

                    <v-flex xs12 class="text-xs-right">
                        <span class="red--text" v-if="error">Sorry currently we are not processing your request. please try again.</span>
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


        <!-- submit Success dialog box -->
        <v-dialog
                v-model="submit_success_dialog"
                max-width="500px"
                dark
                persistent>
            <v-card dark>
                <v-card-text>
                    <h2 class="text-xs-center">Thank you for your detail. we will contact you soon</h2>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="dark" flat @click.stop="onRedirectHome()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
    export default {
        data: () => ({
            settings: '',
            video: '',
            valid: false,

            //form data
            full_name: '',
            email: '',
            tel: '',
            location: '',
            description: '',
            filmed_by_me: '',
            permission: '',
            submitted_elsewhere: '',
            submitted_where: '',
            contact_is_owner: 0,
            allow_publish: '',
            is_exclusive: '',

            // date picker setting
            date_filmed: null,
            date_picker_modal: false,
            menu: false,

            uplod_progress: false,
            progressbar: 0,

            //Loading process
            loading: false,

            //route params
            code: '',
            max_date: new Date().toISOString().split('T')[0],

            // not found error
            http_error: false,

            // Dialog model
            submit_success_dialog: false,

            // After submit error
            error: false,

        }),
        created() {
            this.code = this.$route.params.code;
            if (!this.code) {
                this.$router.push({name: 'home'});
            }

            // check if this code is exists in our database
            let url = '/details/' + this.code;
            axios.get(url)
                .then((response) => {
                    let data = response.data;

                    if (!data.error) {
                        // process data
                        this.video = data;

                        this.full_name = data.contact.full_name;
                        this.email = data.contact.email;
                        this.tel = data.contact.tel;
                        this.location = data.location;
                        this.description = data.description;

                    } else {
                        //error return to 404 page
                        this.$router.push({name: 'notfound'});
                    }
                })
                .catch((error) => {
                    this.http_error = true;
                });

            this.$store.dispatch('setSettingObjectFromServer').then(() => {
                this.settings = this.$store.getters.getSettingsObject;
            });
        },
        watch: {},


        methods: {
            onSubmit() {
                if (this.$refs.detail_form.validate()) {
                    this.loading = true;
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

                //url
                let url = '/details/' + this.code;
                axios.post(url, form)
                    .then(response => {
                        //data uploaded succes
                        let data = response.data;
                        if (!data.error) {
                            setTimeout(() => {
                                this.loading = false;
                                this.$refs.detail_form.reset();
                                this.submit_success_dialog = true;
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        this.error = true;
                    });
            },

            onRedirectHome() {
                this.submit_success_dialog = false;
                setTimeout(() => {
                    this.$route.push({name: 'home'});
                }, 700);

            }
        }
    }
</script>
