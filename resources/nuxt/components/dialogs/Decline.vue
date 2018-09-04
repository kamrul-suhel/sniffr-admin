<template>
    <v-dialog persistent
              v-model="dialog"
              max-width="500px">
        <v-card>
            <v-card-title class="pb-0">
                <span class="headline">Contact Us</span>
            </v-card-title>
                        <v-card-text class="pb-0">
                            <v-textarea
                                    class="mt-0"
                                    label="Please tell us why this quote isn't good for you."
                                    color="dark"
                                    v-model="decline_note"
                                    rows="10"
                                    required
                            ></v-textarea>
                        </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black"
                       dark
                       flat
                       @click.native="dialog = false;
                       declineLoading = false;">Cancel
                </v-btn>

                <v-btn dark
                       @click="onDecline()">Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                decline_note: null,
                declineLoading: false
            }
        },

        computed: {
            ...mapGetters({}),

            dialog: {
                get() {
                    return this.$store.getters.getDeclineDialog;
                },

                set(value) {
                    this.$store.commit('setDeclineDialogBox', value);
                }
            }
        },

        created() {

        },

        methods: {
            onDecline() {
                let assetStoryId = '';
                if (this.$store.getters.getDeclineType === 'story') {
                    assetStoryId = this.$store.getters.getDeclineAsset.collection_story_id
                } else {
                    assetStoryId = this.$store.getters.getDeclineAsset.collection_video_id
                }
                let url = 'client/collections/reject_asset_price/' + assetStoryId + '/' + this.$store.getters.getDeclineType;
                this.declineLoading = true;

                let form_data = new FormData();
                form_data.append('rejection_notes', this.decline_note);
                this.$axios.$post(url, form_data).then((response) => {
                    if (response.success === '1') {
                        this.declineLoading = false;
                        this.decline_note = null;
                        this.$store.commit('setConfirmDecline', true);
                        this.dialog = false;
                    }
                });
            },
        }
    }
</script>