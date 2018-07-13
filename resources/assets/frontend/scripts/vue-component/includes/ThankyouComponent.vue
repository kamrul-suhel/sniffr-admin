<template>
    <!-- Login form -->
    <section class="thank-you-dialog">
        <v-dialog
                v-model="thankYouDialog"
                max-width="500px"
                class="login-section"
                @keydown.esc="onQuoteDialogClose()">
            <v-card raised>

                <v-card-text class="buy-section">
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center>
                            <h2 class="buy-title">Thanks</h2>
                            <p>{{ message }}</p>

                            <div v-if="passwordMessage">
                                <p>{{ passwordMessage }}</p>
                            </div>
                        </v-flex>

                        <v-flex xs12 text-xs-center>
                            <div class="buy-button">
                                <input type="hidden" name="_token"/>
                                <v-btn
                                        raised
                                        dark
                                        @click="closeDialogBoxes()">
                                    OK
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>

                </v-card-text>
            </v-card>
        </v-dialog>
    </section>
</template>
<script>
    import ThankYouDialogBoxEventBus from '../../event-bus/thank-you-dialog-event-bus';

    export default {
        data() {
            return {
                thankYouDialog:false,
                message: '',
                passwordMessage: null,
            }
        },

        created() {
            ThankYouDialogBoxEventBus.$on('openThankYouDialog', (message, passwordMessage) => {
                this.message = message;
                this.passwordMessage = passwordMessage;
                this.thankYouDialog = true;
            });
        },

        methods: {
            closeDialogBoxes(){
                this.thankYouDialog = false;
                ThankYouDialogBoxEventBus.$emit('closeThankYouDialog');
            }

        }
    }
</script>