<template>
	<!-- Login form -->
    <div class="buy-dialog">
        <v-dialog
                v-model="open_buy_dialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onLoginDialogClose()">
            <v-card raised>
                <v-card-text class="buy-section">
                    <v-form method="post" v-model="valid" ref="buy_form">
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
                                    <p>Current Quote: <strong>£{{ price }}</strong></p>
                                </div>
                            </v-flex>
                            
                            <v-flex xs6>
                                <div class="buy-button right">
                                    <input type="hidden" name="_token"/>
                                    <v-btn
                                        raised
                                        dark
                                        :loading="loading"
                                        :disabled="loading"
                                        @click="getPrice()">
                                        Get Price
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

                this.getInitialPrice();
            });
		},

		methods: {
		    showPrice(){

            },

            openBuyDialog(event){
                this.open_buy_dialog = event;
            },

			onBuyDialogClose() {
              this.buy_dialog = false;
              this.loading = false;
              this.$refs.buy_form.reset();
            },

            getInitialPrice(){
                axios.get('/client/collections/get_initial_price/'+this.collection.collection_id+'/'+this.collection.collection_video_id)
                    .then(response => {
                        this.price = response.data.price;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            getPrice() {
                if(this.$refs.buy_form.validate()){

                    // make spinner visible
                    this.login_progress = true;
                    this.loading = true;

                    // prepare submitting data
                    let form_data = new FormData();
                    form_data.append('video_id', this.video.id);
                    form_data.append('license_type', this.license_type);
                    form_data.append('license_platform', this.license_platform);
                    form_data.append('license_length', this.license_length);

                    // submit data with ajax request
                    axios.post('/collections/store', form_data)
                        .then(response => {
                            this.login_progress = true;
                            this.loading = false;

                            let data = response.data;
                            if(data.error){
                                this.login_progress = false;
                                this.loading = false;
                                this.validation.error = true;
                                this.validation.message = data.error_message;
                                return;
                            }

                            // Set the user store
                            this.$store.dispatch('getLoginStatus').then((response) => {
                                // Check is client
                                console.log(response);
                                if(data.redirect_url === 'client'){
                                    let redirect_url = this.$store.getters.getAttepmtRoute;
                                    console.log(redirect_url);
                                    if(!redirect_url){
                                        this.$router.push({name: 'client_stories'});
                                    }
                                    LoginEventBus.clientLoginChange();
                                    return;
                                }

                                if(data.redirect_url){
                                    window.location.href = data.redirect_url;
                                }
                            });

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
		}
	}
</script>