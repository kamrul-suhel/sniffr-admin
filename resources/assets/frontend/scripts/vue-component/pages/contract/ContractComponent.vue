<template>
    <v-container fluid fill-height class="section-space">
        <v-layout align-center justify-center v-if="display_thank_you">
            <div v-if="signed">
                Thank you my friend!
            </div>
            <v-form ref="contract_accept_form" @submit.prevent="onContractAcceptSubmit()" v-else>
                <v-card width="800">
                    <v-card-text>
                        <v-flex xs12 align-center>
                            <h2 class="text-xs-center">LICENSE AND RELEASE</h2>
                        </v-flex>

                        <v-flex xs12>
                            <input type="hidden" name="token" id="token" v-model="token">
                            <textarea name="contract" title="contract" rows="14" style="width: 100%"
                                      disabled="disabled">{{ contract }}</textarea>
                        </v-flex>

                        <v-flex xs12 class="text-center">
                            <v-btn
                                    raised
                                    dark
                                    :loading="loading"
                                    :disabled="loading || buttonDisable"
                                    @click="onContractAcceptSubmit()"
                            >ACCEPT CONTRACT
                            </v-btn>
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
                token: '',
                counter: 30,
                //Loading button
                loading: false,
                loader: null,
                buttonDisable: false,
                showMessage: false,
                message: '',
                contract: null,
                signed: true,
                display_thank_you: false,
                error: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next();
        },

        created() {
            this.token = this.$route.params.token;

            axios.get('/contract/' + this.token + '/accept')
                .then(response => {
                    this.contract = response.data.contract
                    this.video = response.data.video
                    this.signed = response.data.signed
                    this.display_thank_you = true
                })
        },

        methods: {
            onContractAcceptSubmit() {
                //collect form data
                let contractAcceptForm = new FormData();
                contractAcceptForm.append('token', this.token);

                //send request
                let requestUrl = '/contract/' + this.token + '/sign';
                axios.post(requestUrl, contractAcceptForm)
                    .then(response => {
                        this.showMessage = true;
                        this.buttonDisable = true;
                        if (!response.data.error) {
                            this.message = response.data.success_message;
                            this.signed = response.data.signed
                            this.display_thank_you = true
                        } else {
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
</script>