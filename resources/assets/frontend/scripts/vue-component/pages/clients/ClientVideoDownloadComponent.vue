<template>
    <div class="client-video-download-section">
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex>
                    <h2>Welcome UNILAD</h2>
                </v-flex>
            </v-layout>

            <asset-download-component v-for="asset in 5" :key="asset"></asset-download-component>

        </v-container>
    </div>
</template>

<script>
    import AssetDownloadComponent from './partials/AssetDownloadComponent'
    export default {
        components: {
            assetDownloadComponent: AssetDownloadComponent
        },

        data() {
            return {

            }
        },

        created() {

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>