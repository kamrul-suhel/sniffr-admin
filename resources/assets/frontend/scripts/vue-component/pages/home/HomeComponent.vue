<template>
    <div>
        <section id="header" class="js-fullheight" :style="{height: fullwidth_height}" ref="js_fullheight">
            <div class="header-content">
                <h1 class="heading home">Video Licensing Platform</h1>
                <p class="sub-heading">License viral videos viewed by millions around the world from Sniffr Media</p>
                <button @click="onUploadVideo()" class="btn btn-primary upload-video-button">Upload your video</button>
            </div>
        </section>

        <!-- Feature Component -->
        <feature-component></feature-component>

        <!-- Upload video component -->
        <!--<upload-video-component></upload-video-component>-->
    </div>
</template>
<script>
    import FeatureComponent from '../../includes/FeatureComponent.vue';
    import UploadVideoComponent from '../../forms/UploadVideoComponent.vue';
    import LoginEventBus from '../../../event-bus/login-event-bus';

    export default{
        components:{
            featureComponent: FeatureComponent,
            uploadVideoComponent: UploadVideoComponent
        },

        data() {
            return {
                fullwidth_height:0,
                settings: '',

                //user auth
                is_login: false,

                //if user login all data
                user: '',
            }
        },

        watch: {
            // Detach which page and set navigation background
            $route(to, from, next){
                if(to.name != 'home'){
                    this.nav_background = true;
                }else{
                    setTimeout(() => {
                        this.nav_background = false;
                    }, 800);
                }
            }
        },

        methods: {
            onUploadVideo(){
                this.$vuetify.goTo('#header', { duration: 500, easing:'easeInCubic'});
                setTimeout(() => {
                    this.$router.push({name: 'upload_video'});
                }, 500);
            },

            onLoginClick() {
                LoginEventBus.openLoginDialog();
            },

            logoutStateChange() {
                this.is_login = false;
            }
        },

        created(){
            LoginEventBus.$on('logoutChangeState', () => {
                this.is_login = false;
            });

            var browserheight = window.innerHeight;
            this.fullwidth_height = browserheight+'px';
        },

        mounted() {
            var browserheight = window.innerHeight;
            var first_nav_pos = $('#nav').position();
            var second_nav_pos = $('.second-navigation').position();
            var second_nav_height = $('.second-navigation').outerHeight();
            var hide_nav_position = browserheight - second_nav_height;

            // $(window).scroll(function(e){
            //     if(window.pageYOffset > hide_nav_position){
            //         $('#nav').hide();
            //     }else{
            //         $('#nav').show();
            //     }
            // });
        }

    }
</script>