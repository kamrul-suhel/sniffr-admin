<template>
    <v-flex
            :class="{'vertical': video.vertical? video.vertical : '', 'horizontal': !video.vertical}"
            align-content-center
            xs12 sm12 md7 lg7 xl7>

        <v-card flat v-if="!switch_video">
            <v-card-media :src="video.image" height="400px"></v-card-media>
        </v-card>

        <v-flex xs-12 v-else>
            <div v-html="video.iframe"></div>
        </v-flex>

        <v-layout row wrap>
            <v-btn @click="switch_video = !switch_video">Click to view</v-btn>
        </v-layout>
    </v-flex>
</template>

<script>
    import VideoReloadServices from '../../../services/VideoReloadServices';
    export default {
        data() {
            return {
                switch_video: false
            }
        },

        props: ['video'],

        created() {
            VideoReloadServices.reloadAll;
        },

        methods: {
        }
    }
</script>