<template>
    <!-- Login form -->
    <section class="buy-dialog">
        <v-dialog
                v-model="open_buy_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onQuoteDialogClose()">
            <v-card raised>
                <v-card-text class="buy-section">
                    <v-form method="post" v-model="valid" lazy-validation ref="quote_form">
                        <v-layout row wrap id="buy-section">

                            <v-flex xs12>
                                <h2 class="text-center text-uppercase">Buy</h2>
                                <p class="text-xs-center">Please provide us with your requirements</p>
                            </v-flex>

                            <v-flex v-if="type == 'video'">
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
                                            content-class="s-platform"
                                            color="dark"
                                            :items="platforms"
                                            v-model="license_platform"
                                            item-value="slug"
                                            multiple
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
                                            size="medium"
                                            :loading="loading"
                                            :disabled="disabled"
                                            @click="acceptPrice()">Buy now</v-btn>
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
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                alpha_name: '',
                disabled: true,
                price: false,
                show_price: false,
                show_thanks: false,
                showThanksMessage:'',

                button_text: '',
                collection_asset_id: '',

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
            license_type(val){
                if(val){
                    this.getVideoPrice();
                }
            },

            license_platform(val){
                if(val && val.length) { // This is meant to be .length, something to do with multiple select
                    this.getVideoPrice();
                }
            },

            license_length(val){
                if(val) {
                    this.getVideoPrice();
                }
            }
        },

        computed:{
            ...mapGetters({
                collection : 'getBuyQuoteCollection',
                asset: 'getBuyQuoteAsset',
                settings: 'getSettingsObject'
            }),

            open_buy_dialog: {
                get(){
                    return this.$store.getters.getBuyDialog
                },

                set(value){
                    this.$store.commit('setBuyDialog', value);
                }
            },

            type(){
                let type = this.$store.getters.getBuyQuoteType;
                // this.$refs.quote_form.reset();
                if (type === 'video') {

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
                }else if (type == 'story') {
                    this.collection_asset_id = this.collection.collection_story_id;
                    this.alpha_name = 'story_alpha_id';
                    this.disabled = false;
                }

                return type;
            }
        },

        created() {

        },

        methods: {

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

            getVideoPrice(test){
                this.disabledCheck();

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
            },

            closeDialogBoxes(){
                this.open_buy_dialog = false;
            },

            acceptPrice() {
                if(this.$refs.quote_form.validate()){
                    this.loading = true;

                    // submit data with ajax request
                    axios.post('/client/collections/accept_asset_price/'+this.collection_asset_id+'/video')
                        .then(response => {
                            this.loading = false;
                            this.open_buy_dialog = false;
                            setTimeout(()=> {
                                let message = "Thank you for purchasing "+ this.asset.title
                                this.$store.commit('setThankYouMessage', message);
                                this.$store.commit('setThankYouDialog', true);
                                this.$refs.quote_form.reset();
                            }, 500)

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },


        }
    }
</script>
