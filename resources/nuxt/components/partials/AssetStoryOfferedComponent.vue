<template>
    <v-layout row wrap
              class="cd-box">
        <v-flex xs12 sm12 md3>
            <div class="cdi-content"
                 :style="{backgroundImage: 'url(' + getImage(story.thumb) + ')' }"
                 @click="onStoryClick()">
                <div class="cdi-label"
                     v-if="purchased">

                    <v-tooltip top>
                        <v-btn slot="activator"
                               flat
                               icon
                               raised
                               light
                               color="white">
                            <v-icon size="25px">money</v-icon>
                        </v-btn>
                        <span>Purchased</span>
                    </v-tooltip>
                </div>

                <div class="cdi-label"
                     v-if="decline">

                    <v-tooltip top>
                        <v-btn slot="activator"
                               flat
                               icon
                               raised
                               light
                               color="white">
                            <v-icon size="25px">error_outline</v-icon>
                        </v-btn>

                        <span>Declined</span>
                    </v-tooltip>
                </div>

                <div class="hot-story"
                     v-if="story.flagged === 1">
                    <div class="hot-story-content">HOT</div>
                </div>
            </div>
        </v-flex>

        <v-flex xs12 sm12 md6 pl-3>

            <v-layout row wrap>
                <v-flex xs12 pb-0>

                    <h2 v-html="story.title"></h2>
                    <div class="cd-time">{{ story.date_ingested | convertDate }}</div>

                    <div>{{ story.excerpt | readmore(200, '...') }}</div>

                    <div class="quote"
                         v-if="type === 'offered' || type === 'purchased'">

                        <v-layout column fill-height>

                            <v-flex xs12
                                    class="pb-0"
                                    v-if="story.platform">

                                <span>Platform: {{ story.platform | convertHyphenToSpace }}</span>
                            </v-flex>

                            <v-flex xs12
                                    class="pb-0"
                                    v-if="story.platform">

                                <span>Length: {{ settings.pricing.length[story.length].name }}</span>
                            </v-flex>

                            <v-flex xs12
                                    class="pb-0"
                                    v-if="story.type">

                                <span>Type: {{ settings.pricing.type[story.type].name }}</span>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex v-if="expired" xs12 sm12 md3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    disabled
                    color="dark"
                    class="mb-3">
                No Longer Available
            </v-btn>
        </v-flex>

        <v-flex v-if="assetType === 'purchased'" xs12 sm12 md3 pl-3>
            <v-btn
                    block
                    dark
                    large
                    @click="goToDetail()"
                    color="dark"
                    class="mb-3">
                View
            </v-btn>

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDownloadStory()"
                    :loading="loading"
                    :disabled="loading"
            >
                {{ button_text }}
            </v-btn>

            <div class="caption text-xs-center pt-2"
                 v-if="assetType === 'purchased'">{{ story.license_ends_at | licenseExpired }}
            </div>
        </v-flex>

        <v-flex xs12 sm12 md3 pl-3
                v-else-if="story.collection_status === 'requested'">
            <p>Waiting for quote</p>
        </v-flex>

        <v-flex xs12 sm12 md3
                pl-3
                v-else>
            <v-btn
                    block
                    dark
                    large
                    :loading="acceptLoading"
                    :disabled="acceptLoading || assetDeclined"
                    @click="onAccept()"
                    color="dark"
                    class="mb-3">
                £{{ story.final_price | numberFormat }} - Buy Now
            </v-btn>

            <small>Don't like this offer?</small>
            <br>
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-btn
                        slot="activator"
                        persistent
                        block
                        dark
                        large
                        color="dark"
                        :loading="declineLoading"
                        :disabled="declineLoading || assetDeclined"
                        class="mb-3"
                >
                    Contact Us
                </v-btn>

                <v-card>
                    <v-card-title>
                        <span class="headline">Contact Us</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-textarea
                                            label="Please tell us why this quote isn't good for you."
                                            color="dark"
                                            v-model="decline_note"
                                            rows="10"
                                            required
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="black" dark flat @click.native="dialog = false; declineLoading = false;">Cancel</v-btn>
                        <v-btn dark @click="onDecline()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>

        <v-flex xs12 class="my-4">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';
    import StoryDialogBoxEventBus from '@/events/story-dialog-box-event-bus';

    export default {
        data() {
            return {
                button_text: 'Download Story',
                purchased: false,
                decline: false,
                decline_note: null,
                dialog: false,

                loader: null,
                showButton: false,

                loading: false,
                acceptLoading: false,
                declineLoading: false,
                assetDeclined: false,

                assetType: '',

                expired: false
            }
        },

        props: {
            story: {
                type: Object,
                require: true
            },

            type: {
                type: String,
                require: true
            },

            index: {
                type: Number,
                require: true
            }
        },

        computed: {
            ...mapGetters({
                settings: 'getSettingsObject'
            })
        },

        created() {
            this.assetType = this.type;
            this.getIsPurchasedAsset();

            if (this.story.collection_status === 'expired') {
                this.expired = true;
            }
        },

        watch: {
            loader() {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => {
                    this[l] = false;
                    this.newOrder = true;
                }, 3000)

                this.loader = null
            }
        },

        methods: {
            showDownloadButton() {
                this.showButton = !this.showButton;
            },

            goToDetail() {
                this.$router.push({name: 'client_story_detail', params: {'alpha_id': this.story.alpha_id}})
            },

            getImage(image) {
                if (!image) {
                    return '~/assets/images/placeholder.png';
                }
                return image;
            },

            onDownloadStory() {
                this.loader = 'loading';
                var url = '/client/stories/' + this.story.id + '/download';
                window.location = url;
            },

            onAccept() {
                let url = 'collections/accept_asset_price/' + this.story.collection_story_id + '/story';
                this.acceptLoading = true;
                this.$axios.$post(url).then((response) => {
                    if (response.success === '1') {
                        this.$store.commit('setUserOffers', this.$store.getters.getUserStatus.offers - 1);
                        this.acceptLoading = false;
                        this.assetType = "purchased";
                        this.purchased = true;
                    }
                });
            },

            onDecline() {
                let url = 'collections/reject_asset_price/' + this.story.collection_story_id + '/story';
                this.declineLoading = true;

                let form_data =  new FormData();
                form_data.append('rejection_notes', this.decline_note);
                this.$axios.$post(url, form_data).then((response) => {
                    if (response.success === '1') {
                        this.declineLoading = false;
                        this.assetDeclined = true;
                        this.decline = true;

                        this.dialog = false;
                    }
                });
            },

            onStoryClick() {
                StoryDialogBoxEventBus.$emit('openStoryDialog', this.story);
            },

            getIsPurchasedAsset() {
                if (this.type === "story") {
                    if (this.story.story_collections && this.story.story_collections.length > 0) {
                        this.purchased = true;
                    }
                }

                return false;
            }
        }
    }
</script>
