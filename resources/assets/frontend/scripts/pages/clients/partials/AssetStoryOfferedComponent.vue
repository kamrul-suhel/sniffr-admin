<template>
    <v-layout row wrap class="cd-box">
        <v-flex xs12 sm12 md3 lg3 xl3>
            <div class="cdi-content"
                 :style="{backgroundImage: 'url(' + getImage(story.thumb) + ')' }"
                 @click="onStoryClick()"
            >
                <div class="cdi-label" v-if="purchased">
                    <v-tooltip top>
                        <v-btn slot="activator" flat icon raised light color="white">
                            <v-icon size="25px">money</v-icon>
                        </v-btn>
                        <span>Purchased</span>
                    </v-tooltip>
                </div>

                <div class="cdi-label" v-if="decline">
                    <v-tooltip top>
                        <v-btn slot="activator" flat icon raised light color="white">
                            <v-icon size="25px">error_outline</v-icon>
                        </v-btn>
                        <span>Declined</span>
                    </v-tooltip>
                </div>

                <div class="hot-story" v-if="story.flagged === 1">
                    <div class="hot-story-content">HOT</div>
                </div>
            </div>
        </v-flex>

        <v-flex xs12 sm12 md6 lg6 xl6 pl-3>
            <v-layout row wrap>
                <v-flex xs12 pb-0>
                    <h2 v-html="story.title"></h2>
                    <div class="cd-time">{{ story.date_ingested | convertDate }}</div>
                    <div>{{ story.excerpt | readmore(200, '...') }}</div>

                    <div class="quote" v-if="type === 'offered' || type === 'purchased'">
                        <v-layout column fill-height>
                            <v-flex xs12 class="pb-0" v-if="story.platform">
                                <span>Platform: {{ story.platform | convertHyphenToSpace }}</span>
                            </v-flex>

                            <v-flex xs12 class="pb-0" v-if="story.platform">
                                <span>Length: {{ settings.pricing.length[story.length].name }}</span>
                            </v-flex>

                            <v-flex xs12 class="pb-0" v-if="story.type">
                                <span>Type: {{ settings.pricing.type[story.type].name }}</span>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex v-if="assetType === 'purchased'" xs12 sm12 md3 lg3 xl3 pl-3>
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

        <v-flex v-else-if="story.collection_status === 'requested'" xs12 sm12 md3 lg3 xl3 pl-3>
            <p>Waiting for quote</p>
        </v-flex>

        <v-flex v-else xs12 sm12 md3 lg3 xl3 pl-3>
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

            <v-btn
                    block
                    dark
                    large
                    color="dark"
                    @click.native="onDecline()"
                    :loading="declineLoading"
                    :disabled="declineLoading || assetDeclined"
            >
                Decline
            </v-btn>
        </v-flex>

        <v-flex xs12 class="my-4">
            <v-divider></v-divider>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';
    import StoryDialogBoxEventBus from '../../../event-bus/story-dialog-box-event-bus';

    export default {
        data () {
            return {
                button_text: 'Download Story',
                purchased: false,
                decline: false,

                loader: null,
                showButton: false,

                loading: false,
                acceptLoading: false,
                declineLoading:false,
                assetDeclined: false,

                assetType:''
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
        },

        watch: {
            loader () {
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
            showDownloadButton(){
                this.showButton = !this.showButton;
            },

            goToDetail(){
                this.$router.push({name: 'client_story_detail', params: {'alpha_id': this.story.alpha_id}})
            },

            getImage(image){
                if (!image) {
                    return '/assets/images/placeholder.png';
                }
                return image;
            },

            onDownloadStory(){
                this.loader = 'loading';
                var url = '/client/stories/' + this.story.id + '/download';
                window.location = url;
            },

            onAccept() {
                console.log('accept story');
                let url = 'collections/accept_asset_price/' + this.story.collection_story_id + '/story';
                this.acceptLoading = true;
                axios.get(url).then((response) => {
                    console.log(response);
                    if (response.data.success === '1') {
                        this.acceptLoading = false;
                        this.assetType = "purchased";
                        this.purchased = true;
                    }
                });
            },

            onDecline() {
                let url = 'collections/reject_asset_price/' + this.story.collection_story_id + '/story';
                this.declineLoading = true;
                axios.get(url).then((response) => {
                    if (response.data.success === '1') {
                        // Do some action when they accept
                        this.declineLoading = false;
                        this.assetDeclined = true;
                        this.decline = true;
                    }
                });

            },

            onStoryClick(){
                StoryDialogBoxEventBus.$emit('openStoryDialog', this.story);
            },

            getIsPurchasedAsset(){
                if(this.type === "story"){
                    if (this.story.story_collections && this.story.story_collections.length > 0) {
                        this.purchased = true;
                    }
                }

                return false;
            }
        }
    }
</script>
