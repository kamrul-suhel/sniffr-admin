<template>
    <transition name="vue-modal">
        <div class="vue-modal-mask">
            <div class="vue-modal-wrapper">
                <div class="vue-modal-container">
                    <div class="modal-header">
                        <button type="button" class="close" @click="$emit('close')">&times;</button>
                        <h4 class="modal-title">Comments</h4>
                    </div>

                    <div class="modal-body">
                        <comments-component :asset="asset"></comments-component>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import CommentsComponent from './CommentsComponent';

    export default {
        components: {
            CommentsComponent
        },

        computed: {
            // ...mapGetters({
            //     asset: 'getAsset'
            // }),

            asset(){
                let asset = this.$store.getters.getAsset;
                return asset;
            }
        },

        data() {
            return {
                comments: [],
                content_padding: true,
            }
        },

        watch: {},

        created() {
        },

        mounted() {
        },

        methods: {

        }
    }
</script>
