<template>
    <div>
        <section id="header" class="js-fullheight" :style="{height: fullwidth_height}" ref="js_fullheight">
            <div class="header-content">
                <h1 class="heading">Video Licensing Platform</h1>
                <p class="sub-heading">License viral videos viewed by millions around the world from Sniffr Media</p>
                <button onclick="window.location.href='/upload'" class="btn btn-primary upload-video-button">Upload you video</button>
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
                                    <li><a href="#"><i class="fas fa-upload"></i> Upload</a></li>
                                    <li><a href="#"><i class="fas fa-video"></i> Videos</a></li>
                                    <li><a href="#" @click.stop.prevent="login_dialog = true"><i class="fas fa-lock-alt"></i> Login</a></li>
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
        <count-down></count-down>

        <!-- Upload video component -->
        <upload-video-component></upload-video-component>
    </div>
</template>
<script>
    import CountdownComponent from './_partials/CountdownComponent.vue';
    import FeatureComponent from './_partials/FeatureComponent.vue';
    import UploadVideoComponent from '../../forms/UploadVideoComponent.vue';

    export default{
        components:{
            countDown: CountdownComponent,
            featureComponent: FeatureComponent,
            uploadVideoComponent: UploadVideoComponent
        },
        data() {
            return {
                fullwidth_height:0
            }
        },
        methods: {

        },

        created(){
            var browserheight = window.innerHeight;
            this.fullwidth_height = browserheight+'px';
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
<style></style>