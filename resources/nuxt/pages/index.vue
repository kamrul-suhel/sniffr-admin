<template>
    <div>
        <section id="header" class="js-fullheight" :style="{height: fullHeight}" ref="js_fullheight">
            <div class="header-content">
                <h1 class="heading home">Video Licensing Platform</h1>
                <p class="sub-heading">License viral videos viewed by millions around the world from Sniffr Media</p>
                <button @click="onUploadVideo()" class="btn btn-primary upload-video-button">Upload your video</button>
            </div>
        </section>
        <!-- Feature Component -->
        <feature-component :videos="videos"></feature-component>
    </div>
</template>
<script>
    import FeatureComponent from '@/components/FeatureComponent';

    export default{
        asyncData(params, callback){
            params.app.$axios.$post('http://www.sniffr-app.test/search/videos', {
                'featured':'true'
            })
                .then((response) => {
                    callback(null, {videos : response.videos.data});
                });
        },

        head: {
            title: 'Sniffr media'
        },

        components:{
            featureComponent: FeatureComponent
        },

        data() {
            return {
                fullHeight:0
            }
        },

        watch: {
        },

        created(){
            if(process.browser){
                this.fullHeight = window.innerHeight+'px'
            }
        },

        methods: {
            onUploadVideo(){
                this.$vuetify.goTo('#header', { duration: 500, easing:'easeInCubic'});
                this.$router.push({path: 'upload'});
            }

        }

    }
</script>
