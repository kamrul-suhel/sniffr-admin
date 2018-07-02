<template>
    <!-- Login form -->
    <div class="request-quote-dialog">
        <v-dialog
                v-model="request_quote_dialog"
                max-width="500px"
                content-class="request-quote-content"
                @keydown.esc="onRequestQuoteDialogClose()">
            <v-card raised>
                <v-card-text class="buy-section">
                    <v-form method="post" v-model="valid" @submit.prevent="onRequestQuoteSubmit()" lazy-validation ref="request_quote">
                        <v-layout row wrap id="buy-section">

                            <v-flex xs12>
                                <h2 class="text-title-with-underline">Request quote</h2>
                                <p class="text-xs-center" style="margin-top:-15px;">Please give some more information</p>
                            </v-flex>

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
                                <v-text-field
                                        label="Company"
                                        v-model="request_quote.company"
                                        color="dark">
                                </v-text-field>
                            </v-flex>

                            <v-flex xs12 align-content-end d-flex>
                                <v-btn
                                        type="submit"
                                        dark
                                        color="dark"
                                        class="ma-0"
                                        :loading="loading"
                                >Submit
                                </v-btn>
                            </v-flex>

                        </v-layout>

                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import RequestQuoteEventBus from '../../event-bus/request-quote-event-bus';

    export default {
        data() {
            return {
                request_quote_dialog: false,

                type:'',
                asset:'',

                valid: false,
                //From data
                request_quote: {
                    name: 'kamrul',
                    email: 'kamrul@unilad.co.uk',
                    phone: '2039840',
                    company: 'unilad',

                },

                nameRules: [
                    v => !!v || 'Name is required'
                ],

                emailRules: [
                    v => !!v || 'Email is required',
                    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],

                //Loading button
                loading: false,
                loader: null,
                buy_progress: false,
            }
        },

        watch: {},

        created() {
            RequestQuoteEventBus.$on('openRequestQuoteDialog', (type, asset) => {
                this.request_quote_dialog = true;

                this.type = type;
                this.asset = asset;

                this.openRequestQuoteDialog(type, asset);
            });
        },

        methods: {
            openRequestQuoteDialog(type = '', asset = '') {
                console.log(type, asset);
            },

            onRequestQuoteDialogClose() {
                this.request_quote_dialog = false;
            },

            onRequestQuoteSubmit(){
                this.loader = 'loading';
                if (this.$refs.request_quote.validate()) {
                    console.log(this.$refs.request_quote.inputs);
                    // Email verify progress on
                    this.loading = true;
                    this.loader = 'loading';

                    // Form data process
                    this.request_quote.type = this.type;
                    this.request_quote.asset = this.asset;

                    let requestForm = new FormData();
                    requestForm.set('form', JSON.stringify(this.request_quote));


                    axios.post('/request_quote_process', requestForm)
                        .then((response) => {
                            console.log(resopnse);
                            this.loading = false;
                        },
                        (error) => {
                            this.loading = false;
                        }
                    );


                }
            }
        }
    }
</script>