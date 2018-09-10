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
                     v-if="assetDeclined">

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

        <v-flex xs12 sm12 md3 pl-3
                v-else-if="story.collection_status === 'requested'">
            <p>Waiting for quote</p>
        </v-flex>

        <v-flex v-else-if="assetType === 'purchased' || story.purchased" xs12 sm12 md3 pl-3>
            <div v-if="story.deleted_at != null">
                This story has been removed from Sniffr.
                As you already have a license you have a right to still download this story.
            </div>
            <div v-else>
                <v-btn
                        block
                        dark
                        large
                        @click="goToDetail()"
                        color="dark"
                        class="mb-3">
                    View
                </v-btn>
            </div>

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

            <v-btn
                    @click="onContactUs()"
                    persistent
                    block
                    dark
                    large
                    :disabled="acceptLoading || assetDeclined"
                    color="dark"
                    class="mb-3"
            >
                Contact Us
            </v-btn>


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
                loader: null,
                showButton: false,

                loading: false,
                acceptLoading: false,
                assetType: '',
                expired: false,
                previouslyDecline: false,
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
            }),

            assetDeclined: {
                get(){
                    if(this.$store.getters.getConfirmDecline){
                        if(this.$store.getters.getDeclineAsset.collection_story_id === this.story.collection_story_id
                            && this.$store.getters.getDeclineType === 'story'){
                            this.previouslyDecline = true;
                            return true;
                        }
                    }
                    return this.previouslyDecline;
                }
            }
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
                this.$router.push({name: 'client-stories-alpha_id', params: {'alpha_id': this.story.alpha_id}})
            },

            getImage(image) {
                if (!image) {
                    return '~/assets/images/placeholder.png';
                }
                return image;
            },

            onDownloadStory() {
                this.loader = 'loading';
                let url = '/client/stories/' + this.story.id + '/download';
                window.location = url;
            },

            onAccept() {
                let url = '/client/collections/accept_asset_price/' + this.story.collection_story_id + '/story';
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

            onContactUs(){
              this.$store.commit('setDeclineType', 'story');
              this.$store.commit('setDeclineAsset', this.story);
              this.$store.commit('setDeclineDialogBox', true);
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
