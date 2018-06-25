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
                    <v-form method="post" v-model="valid" ref="login_form">
                        <v-layout row wrap id="buy-section">

                            <v-flex xs12>
                                <h2 class="buy-title">Video Usage</h2>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                        color="dark"
                                        :items="licenses"
                                        item-text="name"
                                        label="License Type"
                                        required
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                        color="dark"
                                        label="Platform"
                                        :items="platforms"
                                        required
                                ></v-select>
                            </v-flex>

                            <v-flex xs12>
                                <v-select
                                        color="dark"
                                        label="License Length"
                                        :items="length"
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex>
                                <div v-if="validation.error" class="red--text text-xs-center">{{validation.message}}</div>
                            </v-flex>
                        </v-layout>

                        <v-layout row justify-center>
                            <v-flex xs3>
                                <div class="buy-button">
                                    <input type="hidden" name="_token"/>
                                    <v-btn
                                        raised
                                        dark
                                        :loading="loading"
                                        :disabled="loading"
                                        @click="onSubmit()">
                                        Get Quote
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
                open_buy_dialog: false,
                valid:false,
                licenses: ['Exclusive', 'Non-Exclusive'],
                platforms: ['TV', 'Web'],
                length: ['1-4 Years', '5-10 Years', "In Perpetuity"],
                buy_progress:false,
                validation:{
                    error: false,
                    message:''
                },

                //Loading button
                loading: false,
                loader: null,
			}
		},

		watch: {
            open_login_dialog() {
				this.$emit('changeLogin_dialog', this.open_login_dialog);
			},
		},

		created() {
            BuyEventBus.$on('buyDialogStateChange', (video) =>{
                this.open_buy_dialog = true;
            });
            // LoginEventBus.$on('closeLoginDialog', () => {
            //     this.open_login_dialog = false;
            // });
		},

		methods: {
            openBuyDialog(event){
                this.open_buy_dialog = event;
            },

			onBuyDialogClose() {
              this.buy_dialog = false;
              this.loading = false;
              this.$refs.buy_form.reset();
            },

            onSubmit() {
                if(this.$refs.login_form.validate()){

                    // make spinner visible
                    this.login_progress = true;
                    this.loading = true;

                    // prepare submitting data
                    let form_data = new FormData();

                    // submit data with ajax request
                    // axios.post('/login', form_data)
                    //     .then(response => {
                    //         this.login_progress = true;
                    //         this.loading = false;
                    //
                    //         let data = response.data;
                    //         if(data.error){
                    //             this.login_progress = false;
                    //             this.loading = false;
                    //             this.validation.error = true;
                    //             this.validation.message = data.error_message;
                    //             return;
                    //         }
                    //
                    //         // Set the user store
                    //         this.$store.dispatch('getLoginStatus').then((response) => {
                    //             // Check is client
                    //             console.log(response);
                    //             if(data.redirect_url === 'client'){
                    //                 let redirect_url = this.$store.getters.getAttepmtRoute;
                    //                 console.log(redirect_url);
                    //                 if(!redirect_url){
                    //                     this.$router.push({name: 'client_stories'});
                    //                 }
                    //                 LoginEventBus.clientLoginChange();
                    //                 return;
                    //             }
                    //
                    //             if(data.redirect_url){
                    //                 window.location.href = data.redirect_url;
                    //             }
                    //         });
                    //
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
                }
            },

            onForgotforgotDialog(){
                this.open_login_dialog = false;
                setTimeout(() => {
                    LoginEventBus.openPasswordResetDialog();
                }, 500);
                
            },
		}
	}
</script>