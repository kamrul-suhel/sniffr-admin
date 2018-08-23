<template>
    <section class="video-upload-page">
        <upload-video-component/>
    </section>
</template>
<script>
    import UploadVideoComponent from '@/components/forms/UploadVideoComponent.vue';
    export default {
        layout: ['iframeForm'],
        components: {
            uploadVideoComponent: UploadVideoComponent
        },

        data() {
            return {

            }
        }
    }
</script>
