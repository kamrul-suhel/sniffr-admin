<template>
    <v-dialog v-model="open_dialog" max-width="500px">
        <v-card>
            <v-card-text class="login-section">
                <v-form v-model="valid" ref="forgot_password_form" @submit.prevent="onForgotPassword()">
                    <v-container grid-list-xs>
                        <v-layout row wrap id="login-section">

                            <v-flex xs12>
                                <h2 class="login-title">FORGOT PASSWORD</h2>
                            </v-flex>

                            <v-flex xs12>
                                <v-text-field
                                        color="dark"
                                        label="Email:"
                                        v-model="user.email"
                                        :rules="emailRules"
                                        required
                                        :error="validation.error"
                                        autofucus
                                >
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 v-if="active_password_reset">
                                <p :class="{'red--text': password_reset_error, 'green--text': password_reset_success}">{{ password_reset_text }}</p>
                            </v-flex>

                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs12 class="text-xs-center">
                                <v-btn
                                        raised
                                        dark
                                        @click="onForgotPassword()"
                                        :loading="loading"
                                        :disabled="loading"
                                >
                                    SEND EMAIL
                                </v-btn>
                            </v-flex>

                            <v-flex xs12 class="text-xs-center">
                                <v-btn color="dark" flat @click.stop="open_dialog=false">Close</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import LoginEventBus from '../../event-bus/login-event-bus.js';

	export default {
		data() {
			return {
                valid:false,
                user:{
                    email:'kamrul@uniled.co.uk'
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                
                validation:{
                    error: false,
                    message:''
                },

                //Loading button
                loading: false,
                loader: null,

                //Password reset section
                open_dialog : true,
                active_password_reset: false,
                password_reset_error: false,
                password_reset_success: false,
                password_reset_text:'',
			}
		},

        created() {
            LoginEventBus.$on('openPasswordResetDialog', this.openPasswordForgotDialog)
        },

		watch: {
			open_dialog() {
				LoginEventBus.closePasswordresetDialog();
			}
		},

		methods: {
            openPasswordForgotDialog(event){
                this.open_dialog = event;
            },

			onForgotPassword() {
                if(this.$refs.forgot_password_form.validate()){
                    this.loading = true;
                    this.password_reset_success = false;
                    this.password_reset_error = false;   
                    this.active_password_reset = false;
                    
                    let password_reset_form = new FormData();
                    password_reset_form.append('email', this.user.email);

                    axios.post('/password/reset', password_reset_form)
                        .then(response => {
                            let result = response.data;
                            console.log(result);

                            if(!result.error){
                                // success to send email
                                setTimeout(() => {
                                    this.loading = false;

                                    this.password_reset_success = true;
                                    this.password_reset_text = result.success;
                                    this.active_password_reset = true;
                                    this.$refs.forgot_password_form.reset();

                                    setTimeout( ()=>{
                                        this.password_reset_dialog = false;
                                        
                                        //Clear all for next time use
                                        setTimeout(() => {
                                            this.password_reset_dialog= false,
                                            this.active_password_reset= false,
                                            this.password_reset_error= false,
                                            this.password_reset_success= false,
                                            this.password_reset_text= ''
                                        }, 2000);

                                    }, 3000);
                                }, 1000)
                            }else{
                                setTimeout(() => {
                                    this.loading = false;
                                    this.password_reset_error = true;
                                    this.password_reset_text = result.error;
                                    this.active_password_reset = true;
                                }, 1000);        
                            }
                        })
                        .catch(error => {
                        
                        });
                }

            }
		}
	}
</script>