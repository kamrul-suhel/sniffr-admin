<template>
    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="story-content pb-3">
        <v-layout row wrap>
            <v-flex xs12 sm5 md5 lg5 xl5>
                <v-card contain class="story-media-thumbnail">
                    <v-card-media
                            :src="story.thumb" height="100%">
                        <span class="label label-licensed" v-if="purchased">Purchased</span>
                    </v-card-media>
                </v-card>
            </v-flex>

            <v-flex xs12 sm7 md7 lg7 xl7 class="py-2">
                <h2 v-html="getFilterText(story.title, 50)"></h2>
                <div v-html="getFilterText(story.description, 220)" class="description"></div>
                <v-layout row wrap align-end>
                    <v-flex>
                        <buy-quote-button-component
                                :type="'story'"
                                :asset="story"
                        ></buy-quote-button-component>
                    </v-flex>

                    <v-flex>
                        <v-btn
                                dark
                                color="dark"
                                raised
                                block
                                class="mb-0"
                                @click="onStoryDetail">View</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import BuyQuoteButtonComponent from '../../../includes/BuyQuoteButtonComponent'
    import {mapGetters} from 'vuex'

    export default  {
        components :{
            BuyQuoteButtonComponent,
        },

        computed:{
            ...mapGetters({
                client_login: 'getClientLogin'
            }),
        },

        data(){
            return {
                purchased : false
            }
        },

        props:{
            story: {
                type: Object,
                required: true,
            },
            type: {
                type: String,
                required: false,
            }
        },

        created(){
            this.getIsPurchasedAsset();
        },

        methods:{
            getFilterText(text, length){
                if (text == null) return "";
                var tmp = document.createElement("DIV");
                tmp.innerHTML = text;
                return tmp.textContent.substring(0, length) || tmp.innerText.substring(0, length) || "";
            },

            onStoryDetail(){
                this.$router.push({name: 'stories_detail', params: {'alpha_id': this.story.alpha_id}})
            },

            getIsPurchasedAsset(){
                if (this.story.story_collections && this.story.story_collections.length > 0) {
                    this.purchased = true;
                    return;
                }

                this.purchased = false;
            }
        }
    }
</script>
