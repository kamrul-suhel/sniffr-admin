<template>
    <div class="video-more-detail-component fill-height">
        <video-submission/>
    </div>
</template>
<script>
    import VideoSubmission from '@/components/forms/VideoSubmissionComponent';
    export default {
        layout:['iframeForm'],
        components: {
            VideoSubmission
        }
    }
</script>
