<template>
    <!-- Password reset section-->

    <!-- Password reset form -->
    <v-container fluid fill-height class="section-space">
        <v-layout align-center justify-center>
            <v-form v-model="valid" ref="password_reset_form" @submit.prevent="onPasswordResetSubmit()">
                <v-card width="400">
                    <v-card-text>
                        <v-flex xs12 align-center>
                            <h2 class="text-xs-center">RESET PASSWORD</h2>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                name="email"
                                color="dark"
                                label="Email"
                                v-model="email"
                                ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                    name="password"
                                    color="dark"
                                    label="Enter your password"
                                    hint="At least 8 characters"
                                    v-model="password"
                                    :append-icon="password ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (password = !password)"
                                    :type="password ? 'password' : 'text'"
                                    :counter="counter"
                                    :rules="passwordRules"
                                    required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-text-field
                                    name="password"
                                    color="dark"
                                    label="Confirm your password"
                                    v-model="confirm_password"
                                    :append-icon="confirm_password ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (confirm_password = !confirm_password)"
                                    :type="confirm_password ? 'password' : 'text'"
                                    :counter="counter"
                                    :rules="passwordConfirmationRules"
                                    required
                                    @keyup.enter="onPasswordResetSubmit()"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 class="text-center">
                            <v-btn
                                    raised
                                    dark
                                    :loading="loading"
                                    :disabled="loading || buttonDisable"
                                    @click="onPasswordResetSubmit()"
                            >Reset password</v-btn>
                        </v-flex>

                        <v-flex xs12 text-xs-center>
                            <span v-if="showMessage" :class="[error ? 'red--text' : 'green--text']">{{message}}</span>
                        </v-flex>

                    </v-card-text>
                </v-card>
            </v-form>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                // validation & data
                token:'',
                email:'',
                password:'',
                confirm_password:'',
                counter:30,
                valid:false,

                passwordRules: [
                    (v) => !!v || 'Password is required',
                ],
                passwordConfirmationRules: [
                    (v) => !!v || 'Confirmation password is required',
                   (v) => v == this.password || 'Password is not match'
                ],

                //Loading button
                loading: false,
                loader: null,

                buttonDisable: false,

                showMessage: false,
                message: '',
                error: false
            }
        },
        beforeRouteEnter(to, from, next){
          next();
        },

        created() {
            this.token = this.$route.params.token;
        },

        methods: {
            onPasswordResetSubmit(){
                if(this.$refs.password_reset_form.validate()){
                    //collect form data
                    let passworchangeform = new FormData();
                    passworchangeform.append('email', this.email);
                    passworchangeform.append('password', this.password);
                    passworchangeform.append('password_confirmation', this.password);
                    passworchangeform.append('token', this.token);

                    //send request
                    let requestUrl = '/password/reset/'+this.token;
                    axios.post(requestUrl, passworchangeform)
                        .then(response => {
                            this.showMessage = true;
                            this.buttonDisable = true;
                            if(!response.data.error){
                                this.message = response.data.success_message;
                            }else{
                                this.error = true;
                                this.message = response.data.error_message;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });

                }
            }
        }
    }
</script>