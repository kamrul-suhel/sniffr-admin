<template>
    <section class="video-upload-page">
        <!-- Video upload form -->
        <upload-video-component></upload-video-component>
    </section>
</template>
<script>
    import UploadVideoComponent from '@/components/forms/UploadVideoComponent.vue';
    export default {
        components: {
            uploadVideoComponent: UploadVideoComponent
        },

        data() {
            return {

            }
        }
    }
</script>
