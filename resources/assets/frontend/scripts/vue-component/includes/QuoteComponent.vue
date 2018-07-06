<template>
    <!-- Login form -->
    <v-flex class="quote-dialog">
        <v-dialog
                v-model="open_quote_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onQuoteDialogClose()">
            <v-card raised>
                <v-card-text v-if="show_thanks">
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center>
                            <h2 class="buy-title">Thanks</h2>
                            <p>Thanks for your request, someone from our licensing team will be in touch shortly</p>
                        </v-flex>

                        <v-flex xs12 text-xs-center>
                            <div class="buy-button">
                                <input type="hidden" name="_token"/>
                                <v-btn
                                        raised
                                        dark
                                        :loading="loading"
                                        :disabled="disabled"
                                        @click="closeDialogBoxes()">
                                    OK
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text v-else class="buy-section">
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
                                    <small style="color:red" v-if="errors.user_email">{{ errors.user_email[0] }}</small>
                                    <v-text-field
                                            label="Email"
                                            type="email"
                                            v-model="request_quote.email"
                                            color="dark"
                                            validate-on-blur
                                            :rules="emailRules"
                                            required>
                                    </v-text-field>
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

                            <v-flex v-if="type == 'video'">
                                <v-flex xs12>
                                    <v-select
                                            label="License Type"
                                            color="dark"
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
                            <v-flex xs6 >
                                <div v-if="price && (license_type || license_platform || license_length)">
                                    <span>Current Quote: <strong>£{{ price }}</strong></span>
                                </div>
                            </v-flex>

                            <v-flex xs6>
                                <div class="buy-button right">
                                    <input type="hidden" name="_token"/>
                                    <v-btn
                                            raised
                                            dark
                                            :loading="loading"
                                            :disabled="disabled"
                                            @click="buttonClicked()">
                                        {{ button_text }}
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-flex>
</template>
<script>
    import QuoteDialogBoxEventBus from '../../event-bus/quote-dialog-box-event-bus.js';
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus.js';

    export default {
        data() {
            return {
                alpha_name: '',
                client_logged_in: false,
                disabled: true,
                settings: {},
                price: false,
                show_price: false,
                show_thanks: false,
                button_text: '',
                asset: {},
                type: '',
                collection: {},
                collection_asset_id: '',
                can_buy: false,
                open_quote_dialog: false,
                valid:false,
                license_type: null,
                license_platform: null,
                license_length: null,
                notes: null,
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
            }
        },

        watch: {
            license_type(val){
                if(val){
                    this.getVideoPrice();
                }
            },

            license_platform(val){
                if(val) {
                    this.getVideoPrice();
                }
            },

            license_length(val){
                if(val) {
                    this.getVideoPrice();
                }
            },

            open_quote_dialog(val){
                if(!val){
                    this.onQuoteDialogClose();
                }
            }
        },

        created() {
            QuoteDialogBoxEventBus.$on('quoteDialogStateChange', (collection, asset, type) =>{

                this.client_logged_in = this.$store.getters.isClientLogin;
                this.$refs.quote_form.reset();
                this.open_quote_dialog = true;
                this.type = type;
                this.asset = asset;
                this.collection = collection;

                this.can_buy = (this.type == 'story' || this.asset.class === 'exceptional' || this.asset.class === '' || !this.asset.class) ? false : true;
                this.button_text = this.can_buy ? 'Accept Price' : 'Request Quote';

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

                if(!this.client_logged_in) {
                    this.button_text = 'Request Quote';
                }
            });

            VideoDialogBoxEventBus.$on('videoDialogBoxCloseFromBuy', () => {
                //this.$router.push('client/purchased');
                //TODO - Decide where to send user based on type of view
            });
        },

        methods: {
            openBuyDialog(event){
                this.open_quote_dialog = event;
            },

            onQuoteDialogClose() {
                this.show_thanks = false;
                this.disabled = true;
                this.buy_dialog = false;
                this.loading = false;
            },

            disabledCheck(){
                if(this.license_type && this.license_platform && this.license_length){
                    this.disabled = false;
                }
            },

            getVideoPrice(){
                this.disabledCheck();

                if(this.can_buy){
                    let form_data = new FormData();
                    form_data.append(this.alpha_name, this.asset.alpha_id);
                    form_data.append('license_type', this.license_type);
                    form_data.append('license_platform', this.license_platform);
                    form_data.append('license_length', this.license_length);

                    axios.post('/client/collections/get_video_price/'+this.collection_asset_id, form_data)
                        .then(response => {
                            this.price = response.data.price ? response.data.price : false;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            buttonClicked(){
                if(this.$store.getters.getUser.id === '') {
                    return this.registerUser();
                }
                if(this.price) {
                    return this.acceptPrice();
                } else {
                    return this.requestQuote();
                }
            },

            closeDialogBoxes(){
                this.open_quote_dialog = false;
                VideoDialogBoxEventBus.closeVideoDialogFromBuy();
            },

            acceptPrice() {
                if(this.$refs.quote_form.validate()){
                    this.loading = true;
                    // submit data with ajax request
                    axios.get('/client/collections/accept_asset_price/'+this.collection_asset_id+'/video')
                        .then(response => {
                            this.loading = false;
                            this.open_quote_dialog = false;
                            VideoDialogBoxEventBus.closeVideoDialogFromBuy();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
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
                            this.show_thanks = true;
                        })
                        .catch(error => {
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
                            this.$store.dispatch('getLoginStatus').then(() => {
                                axios.post('/client/collections/request_quote/'+this.type+'/'+this.collection_asset_id, form_data)
                                    .then(response => {
                                        this.loading = false;
                                        this.show_thanks = true;
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            });
                        })
                        .catch(error => {
                            this.errors = error.response.data.errors;
                            this.loading = false;
                        });
                }
            },
        }
    }
</script>