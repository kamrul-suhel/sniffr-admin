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
    </div>
</template>
<script>
    import FeatureComponent from '../../includes/FeatureComponent.vue';
    import LoginEventBus from '../../../event-bus/login-event-bus';

    export default{
        components:{
            featureComponent: FeatureComponent
        },

        data() {
            return {
                fullwidth_height:0,
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

        created(){
            let browserHeight = window.innerHeight;
            this.fullwidth_height = browserHeight+'px';
        },

        methods: {
            onUploadVideo(){
                this.$vuetify.goTo('#header', { duration: 500, easing:'easeInCubic'});
                setTimeout(() => {
                    this.$router.push({name: 'upload_video'});
                }, 500);
            }

        }

    }
</script>