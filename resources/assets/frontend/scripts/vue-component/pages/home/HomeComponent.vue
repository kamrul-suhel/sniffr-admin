<template>
    <div>
        <section id="header" class="js-fullheight" :style="{height: fullwidth_height}" ref="js_fullheight">
            <div class="header-content">
                <h1 class="heading home">Video Licensing Platform</h1>
                <p class="sub-heading">License viral videos viewed by millions around the world from Sniffr Media</p>
                <button @click="onUploadVideo()" class="btn btn-primary upload-video-button">Upload your video</button>
            </div>

            <div class="second-navigation">
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4 lg4>
                            <div class="logo">
                                <a href=""><img src="assets/frontend/images/logo-sniffr-white.png"/></a>
                            </div>
                        </v-flex>
                        <v-flex xs12 sm6 md8 lg8>
                            <nav class="navigation">
                                <ul>
                                    <li>
                                        <router-link to="/upload">
                                            <v-icon color="white" left>file_upload</v-icon> Upload
                                        </router-link>
                                    </li>

                                    <li>
                                        <router-link to="/videos">
                                            <v-icon color="white" left>videocam</v-icon> Videos
                                        </router-link>
                                    </li>

                                    <li>
                                        <a  @click.stop.prevent="">
                                            <v-icon color="white" left>lock_open</v-icon> Login
                                        </a>
                                        <!--<a href="#">-->
                                            <!--<v-icon color="white" left>lock out</v-icon> Logout-->
                                        <!--</a>-->
                                    </li>
                                </ul>
                            </nav>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </section>

        <!-- Feature Component -->
        <feature-component></feature-component>

        <!-- Countdown Component -->
        <!--<count-down></count-down>-->

        <!-- Upload video component -->
        <!--<upload-video-component></upload-video-component>-->
    </div>
</template>
<script>
    import CountdownComponent from './_partials/CountdownComponent.vue';
    import FeatureComponent from './_partials/FeatureComponent.vue';
    import UploadVideoComponent from '../../forms/UploadVideoComponent.vue';
    import mapAction from 'vuex';
    import mapGetters from 'vuex';

    export default{
        components:{
            countDown: CountdownComponent,
            featureComponent: FeatureComponent,
            uploadVideoComponent: UploadVideoComponent
        },
        data() {
            return {
                fullwidth_height:0,
                settings: ''
            }
        },
        methods: {
            onUploadVideo(){
                this.$vuetify.goTo('#header', { duration: 500, easing:'easeInCubic'});
                setTimeout(() => {
                    this.$router.push({name: 'upload_video'});
                }, 500);
            }
        },

        created(){
            var browserheight = window.innerHeight;
            this.fullwidth_height = browserheight+'px';

            this.$store.dispatch('setSettingObjectFromServer').then(() => {
                this.settings = this.$store.getters.getSettingsObject;
            });
        },

        mounted(){
            var browserheight = window.innerHeight;
            var first_nav_pos = $('#nav').position();
            var second_nav_pos = $('.second-navigation').position();
            var second_nav_height = $('.second-navigation').outerHeight();
            var hide_nav_position = browserheight - second_nav_height;

            $(window).scroll(function(e){
                if(window.pageYOffset > hide_nav_position){
                    $('#nav').hide();
                }else{
                    $('#nav').show();
                }
            });
        }

    }
</script>