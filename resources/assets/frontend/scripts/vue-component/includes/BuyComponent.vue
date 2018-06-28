<template>
	<!-- Login form -->
    <div class="buy-dialog">
        <v-dialog
                v-model="open_buy_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onBuyDialogClose()">
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
                    <v-form method="post" v-model="valid" lazy-validation ref="buy_form">
                        <v-layout row wrap id="buy-section">

                            <v-flex xs12>
                                <h2 class="buy-title">Video Usage</h2>
                            </v-flex>

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
	</div>
</template>
<script>
    import BuyEventBus from '../../event-bus/buy-dialog-box-event-bus.js';
    import VideoDialogBoxEventBus from '../../event-bus/video-dialog-box-event-bus.js';

	export default {
		data() {
			return {
			    disabled: true,
			    settings: {},
                price: false,
                show_price: false,
                show_thanks: false,
                button_text: '',
                video: {},
                collection: {},
                open_buy_dialog: false,
                valid:false,
                license_type: null,
                license_platform: null,
                license_length: null,
                licenses: [],
                platforms: [],
                lengths: [],
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
            license_type(){
                this.getVideoPrice();
            },

            license_platform(){
                this.getVideoPrice();
            },

            license_length(){
                this.getVideoPrice();
            },

            open_buy_dialog(val){
                if(!val){
                    this.onBuyDialogClose();
                }
            }
		},

		created() {
            BuyEventBus.$on('buyDialogStateChange', (collection, video) =>{
                this.$refs.buy_form.reset();
                this.open_buy_dialog = true;
                this.settings = this.$store.getters.getSettingsObject;
                this.video = video;
                this.collection = collection;
                this.button_text = this.video.class == 'exceptional' ? 'Request Quote' : 'Accept Price';

                Object.values(this.settings.pricing.type).forEach((type) =>{
                    this.licenses.push(type);
                });

                Object.values(this.settings.pricing.platform).forEach((platform) =>{
                    this.platforms.push(platform);
                });

                Object.values(this.settings.pricing.length).forEach((length) =>{
                    this.lengths.push(length);
                });

                this.getVideoPrice();

                VideoDialogBoxEventBus.$on('videoDialogBoxCloseFromBuy', () => {
                    //this.$router.push('client/purchased');
                });
            });
		},

		methods: {
            openBuyDialog(event){
                this.open_buy_dialog = event;
            },

			onBuyDialogClose() {
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

                let form_data = new FormData();
                form_data.append('video_id', this.video.id);
                form_data.append('license_type', this.license_type);
                form_data.append('license_platform', this.license_platform);
                form_data.append('license_length', this.license_length);

                axios.post('/client/collections/get_video_price/'+this.collection.collection_video_id, form_data)
                    .then(response => {
                        this.price = response.data.price ? response.data.price : false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            buttonClicked(){
                if(this.price){
                    this.acceptPrice();
                }else{
                    this.requestQuote();
                }
            },

            closeDialogBoxes(){
                this.open_buy_dialog = false;
                VideoDialogBoxEventBus.closeVideoDialogFromBuy();
            },

            acceptPrice() {
                if(this.$refs.buy_form.validate()){
                    this.loading = true;
                    // submit data with ajax request
                    axios.post('/client/collections/accept_price/'+this.collection.collection_video_id)
                        .then(response => {
                            this.loading = false;
                            console.log('LICENSED VIDEO SUCCESSFULLY');
                            //TODO WHAT HAPPENS AFTER IT'S LICENCED

                            // CLose dialog boxes
                            this.open_buy_dialog = false;
                            VideoDialogBoxEventBus.closeVideoDialogFromBuy();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            requestQuote() {
                if(this.$refs.buy_form.validate()){
                    this.loading = true;

                    let form_data = new FormData();
                    form_data.append('video_id', this.video.id);
                    form_data.append('license_type', this.license_type);
                    form_data.append('license_platform', this.license_platform);
                    form_data.append('license_length', this.license_length);

                    // submit data with ajax request
                    axios.post('/client/collections/request_video_quote/'+this.collection.collection_video_id)
                        .then(response => {
                            this.loading = false;
                            console.log('QUOTE SENT');
                            //TODO WHAT HAPPENS AFTER IT'S LICENCED
                            this.show_thanks = true;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
		}
	}
</script>