<template>
    <!-- Login form -->
    <section class="quote-dialog">
        <v-dialog
                v-model="open_quote_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onQuoteDialogClose()">
            <v-card raised>

                <v-card-text class="buy-section">
                    <v-form method="post" v-model="valid" lazy-validation ref="quote_form">
                        <v-layout row wrap id="buy-section">

                            <v-flex xs12>
                                <h2 class="text-center text-uppercase">Quote</h2>
                                <p class="text-xs-center">Please provide us with your requirements</p>
                            </v-flex>

                            <v-flex xs12 v-if="!client_logged_in">
                                <v-flex xs12>
                                    <v-text-field
                                            label="Name"
                                            v-model="request_quote.name"
                                            color="dark"
                                            validate-on-blur
                                            :rules="nameRules"
                                            required
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Email"
                                            type="email"
                                            v-model="request_quote.email"
                                            color="dark"
                                            validate-on-blur
                                            :rules="emailRules"
                                            :error-messages="emailError"
                                            required>
                                    </v-text-field>
                                    <small class="red--text" v-if="errors.user_email">{{ errors.user_email[0] }}</small>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                            label="Phone"
                                            v-model="request_quote.phone"
                                            color="dark">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <small style="color:red" v-if="errors.company_name">{{ errors.company_name[0] }}</small>
                                    <v-text-field
                                            label="Company"
                                            v-model="request_quote.company"
                                            color="dark">
                                    </v-text-field>
                                </v-flex>
                            </v-flex>

                            <v-flex v-if="type === 'video'">
                                <v-flex xs12>
                                    <v-select
                                            label="License Type"

                                            color="light"
                                            :items="licenses"
                                            v-model="license_type"
                                            item-value="slug"
                                            item-text="name"
                                            :rules="licenseRules"
                                            :error="validation.error"
                                            required
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            label="Platform"
                                            color="dark"
                                            :items="platforms"
                                            v-model="license_platform"
                                            item-value="slug"
                                            item-text="name"
                                            :rules="platformRules"
                                            :error="validation.error"
                                            required
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                            label="License Length"
                                            color="dark"
                                            :items="lengths"
                                            v-model="license_length"
                                            item-value="slug"
                                            item-text="name"
                                            :rules="lengthRules"
                                            :error="validation.error"
                                            required
                                    ></v-select>
                                </v-flex>
                            </v-flex>

                            <v-flex xs12>
                                <v-textarea
                                        v-model="notes"
                                        name="notes"
                                        color="dark"
                                        label="Additional information"
                                ></v-textarea>
                            </v-flex>

                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex>
                                <div v-if="validation.error" class="red--text text-xs-center">{{validation.message}}</div>
                            </v-flex>
                        </v-layout>

                        <v-layout row align-center>
                            <v-flex xs12>
                                <div class="buy-button right">
                                    <input type="hidden" name="_token"/>
                                    <v-btn
                                            raised
                                            dark
                                            size="medium"
                                            :loading="loading"
                                            :disabled="disabled"
                                            @click="buttonClicked()">
                                        Request Quote
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </section>
</template>
<script>
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus.js';
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus.js';
    import ThankYouDialogBoxEventBus from '../../event-bus/thank-you-dialog-event-bus';


    export default {
        data() {
            return {
                alpha_name: '',
                client_logged_in: false,
                disabled: true,
                settings: {},

                asset: {},
                type: '',
                collection: {},
                collection_asset_id: '',
                open_quote_dialog: false,
                valid:false,
                license_type: null,
                license_platform: null,
                license_length: null,
                notes: '',
                licenses: [],
                platforms: [],
                lengths: [],
                errors: [],

                //Form data
                request_quote: {
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                },
                nameRules: [
                    v => !!v || 'Name is required'
                ],

                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],

                licenseRules: [
                    v => !!v || 'License is required'
                ],
                platformRules: [
                    v => !!v || 'Platform is required'
                ],
                lengthRules: [
                    v => !!v || 'Length is required'
                ],

                validation:{
                    error: false,
                    message:''
                },

                //Loading button
                loading: false,
                loader: null,
                buy_progress:false,

                //Form validation error
                emailError:''
            }
        },

        watch: {
            open_quote_dialog(val){
                if(!val){
                    this.$refs.quote_form.reset();
                    this.onQuoteDialogClose();
                }
            },

            license_type(val){
                if(val){
                    this.disabledCheck()
                }
            },

            license_platform(val){
                if(val) {
                    this.disabledCheck()
                }
            },

            license_length(val){
                if(val) {
                    this.disabledCheck()
                }
            }
        },

        created() {

            QuoteDialogBoxEventBus.$on('quoteDialogStateChange', (collection, asset, type) => {
                this.client_logged_in = this.$store.getters.isClientLogin;

                this.type = type;
                this.asset = asset;
                this.collection = collection;
                // this.$refs.quote_form.reset();

                if (this.type === 'video') {
                    this.settings = this.$store.getters.getSettingsObject;

                    Object.values(this.settings.pricing.type).forEach((type) =>{
                        this.licenses.push(type);
                    });

                    Object.values(this.settings.pricing.platform).forEach((platform) =>{
                        this.platforms.push(platform);
                    });

                    Object.values(this.settings.pricing.length).forEach((length) =>{
                        this.lengths.push(length);
                    });

                    this.collection_asset_id = this.collection.collection_video_id;
                    this.alpha_name = 'video_alpha_id';
                }else if (this.type == 'story') {
                    this.collection_asset_id = this.collection.collection_story_id;
                    this.alpha_name = 'story_alpha_id';
                    this.disabled = false;
                }

                this.open_quote_dialog = true;


            });

            VideoDialogBoxEventBus.$on('videoDialogBoxCloseFromBuy', () => {
                //this.$router.push('client/purchased');
                //TODO - Decide where to send user based on type of view
            });

            ThankYouDialogBoxEventBus.$on('closeThankYouDialog', () => {
                setTimeout(()=> {
                    this.open_quote_dialog = false;
                }, 500);
            })
        },

        methods: {
            openBuyDialog(event){
                this.open_quote_dialog = event;
            },

            onQuoteDialogClose() {
                setTimeout(()=> {
                    this.disabled = true;
                    this.buy_dialog = false;
                    this.loading = false;
                }, 500);
            },

            disabledCheck(){
                if(this.license_type && this.license_platform && this.license_length){
                    this.disabled = false;
                }
            },

            buttonClicked(){
                if(this.$store.getters.getUser.id === '') {
                    return this.registerUser();
                }

                return this.requestQuote();
            },

            closeDialogBoxes(){
                this.open_quote_dialog = false;
                VideoDialogBoxEventBus.closeVideoDialogFromBuy();
            },

            requestQuote() {
                if(this.$refs.quote_form.validate()){
                    this.loading = true;

                    let form_data = new FormData();
                    form_data.append(this.alpha_name, this.asset.alpha_id);
                    form_data.append('license_type', this.license_type);
                    form_data.append('license_platform', this.license_platform);
                    form_data.append('license_length', this.license_length);
                    form_data.append('notes', this.notes);

                    // submit data with ajax request
                    axios.post('/client/collections/request_quote/'+this.type+'/'+this.collection_asset_id, form_data)
                        .then(response => {
                            this.loading = false;
                            this.open_buy_dialog = false;
                            
                            setTimeout(()=> {
                                this.$refs.quote_form.reset();
                                let message = 'Thanks for your request, someone from our licensing team will be in touch shortly';
                                ThankYouDialogBoxEventBus.openThankYouDialog(message);
                            }, 500)
                        })
                        .catch(error => {
                            this.errors = error.response.data.errors;
                            console.log(error);
                        });
                }
            },

            registerUser() {
                if(this.$refs.quote_form.validate()) {
                    this.loading = true;

                    let form_data = new FormData();
                    form_data.append('user_full_name', this.request_quote.name);
                    form_data.append('user_email', this.request_quote.email);
                    form_data.append('tel', this.request_quote.phone);
                    form_data.append('company_name', this.request_quote.company);
                    form_data.append(this.alpha_name, this.asset.alpha_id);
                    form_data.append('license_type', this.license_type);
                    form_data.append('license_platform', this.license_platform);
                    form_data.append('license_length', this.license_length);
                    form_data.append('notes', this.notes);


                    axios.post('/client/collections/register_user/'+this.collection.collection_id, form_data)
                        .then(response => {
                            
                            this.requestQuote();
                        })
                        .catch(error => {
                            this.errors = error.response.data.errors;
                            this.loading = false;
                        });
                }
            }
        }
    }
</script>