<template>
	<!-- Login form -->
    <div class="buy-dialog">
        <v-dialog
                v-model="open_buy_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onBuyDialogClose()">
            <v-card raised>
                <v-card-text class="buy-section">
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
                                <div v-if="license_type || license_platform || license_length">
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
                                        @click="acceptPrice()">
                                        Accept Price
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

	export default {
		data() {
			return {
			    disabled: true,
			    settings: {},
                price: 0,
                show_price: false,
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
                this.open_buy_dialog = true;
                this.settings = this.$store.getters.getSettingsObject;
                this.video = video;
                this.collection = collection;
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
            });
		},

		methods: {
            openBuyDialog(event){
                this.open_buy_dialog = event;
            },

			onBuyDialogClose() {
                this.disabled = true;
                this.buy_dialog = false;
                this.loading = false;
                this.$refs.buy_form.reset();
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
                        this.price = response.data.price;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            acceptPrice() {
                if(this.$refs.buy_form.validate()){
                    // submit data with ajax request
                    axios.post('/client/collections/accept_price/'+this.collection.collection_video_id)
                        .then(response => {
                            this.login_progress = true;
                            this.loading = false;
                            console.log('LICENSED VIDEO SUCCESSFULLY');
                            //TODO WHAT HAPPENS AFTER IT'S LICENCED
                            this.$router.push('client/videos');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
		}
	}
</script>