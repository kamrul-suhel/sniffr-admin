<template>
    <v-flex d-flex xs12 sm12 md6 lg6 xl6 class="pa-3">
        <v-layout row wrap>
            <v-flex xs12 sm5 md5 lg5 xl5>
                <v-card contain class="story-media-thumbnail">
                    <v-card-media :src="story.thumb" height="100%"/>
                </v-card>
            </v-flex>

            <v-flex xs12 sm7 md7 lg7 xl7>
                <h2 v-html="getFilterText(story.title, 50)"></h2>
                <div v-html="getFilterText(story.description, 220)" class="description"></div>
                <v-layout row wrap align-end>
                    <v-flex xs6 v-if="client_login">
                        <quote-button-component
                                :type="'story'"
                                :asset="story"
                        ></quote-button-component>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn
                                dark color="dark"
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
    import QuoteButtonComponent from '../../../includes/QuoteButtonComponent'
    import LoginEventBus from '../../../../event-bus/login-event-bus'

    export default  {
        components :{
            QuoteButtonComponent
        },

        data(){
            return {
                client_login:''
            }
        },

        props:['story'],

        created(){
            LoginEventBus.$on('logoutChangeState', () => {
                this.checkLoginStatus();
            })

            this.checkLoginStatus();
        },

        methods:{
            getFilterText(text, length){
                if (text == null) return "";
                var tmp = document.createElement("DIV");
                tmp.innerHTML = text;
                return tmp.textContent.substring(0, length) || tmp.innerText.substring(0, length) || "";
            },

            onStoryDetail(){
                this.$router.push({name: 'client_story_detail', params: {'alpha_id': this.story.alpha_id}})
            },

            checkLoginStatus(){
                this.client_login = this.$store.getters.isClientLogin;
            }
        }
    }
</script>