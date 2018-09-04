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
                                        name="email"
                                        color="dark"
                                        label="Email:"
                                        v-model="user.email"
                                        :rules="emailRules"
                                        required
                                        :error="validation.error"
                                        autofucus
                                >
                                </v-text-field>
                                <small class="red--text" v-if="errors">{{ errors.error_message }}</small>
                                <small class="green--text" v-if="password_reset_text">{{ password_reset_text }}</small>
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
                                >SEND EMAIL</v-btn>
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
    import {mapGetters} from 'vuex';
	export default {
		data() {
			return {
                valid:false,
                user:{
                    email:''
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],

                errors : null,
                validation:{
                    error: false,
                    message:''
                },

                //Loading button
                loading: false,
                loader: null,

                //Password reset section
                active_password_reset: false,
                password_reset_error: false,
                password_reset_success: false,
                password_reset_text:'',
			}
		},

        computed: {
            ...mapGetters({

            }),

            open_dialog: {
                get(){
                    return this.$store.getters.getForgotPasswordDialog
                },

                set(value){
                    this.$store.commit('setForgotPasswordDialog', value)
                }
            }
        },

        created() {
        },

		watch: {

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

                    this.$axios.$post('/password/reset', password_reset_form)
                        .then(response => {
                            this.errors = null;
                            let result = response;
                            if(!result.error){
                                // success to send email
                                setTimeout(() => {
                                    this.loading = false;

                                    this.password_reset_success = true;
                                    this.password_reset_text = result.success_message;
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
                            }
                        })
                        .catch(error => {
                            this.loading = false;
                            this.errors = error.response.data;
                        });
                }

            }
		}
	}
</script>
