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
                        <comments-component :asset="asset" :asset-type="assetType"></comments-component>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import CommentsComponent from './CommentsComponent';
    import {mapGetters} from 'vuex'

    export default {
        components: {
            CommentsComponent
        },

        props: {
            assetType: ''
        },

        data() {
            return {
            }
        },

        computed: {
            ...mapGetters({
                asset: 'getAsset'
            }),
        }
    }
</script>
