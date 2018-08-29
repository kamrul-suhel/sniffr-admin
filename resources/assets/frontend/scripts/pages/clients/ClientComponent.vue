<template>
    <!-- Client section -->
    <div class="client-section">
        <!-- Client content SECTION -->
        <section class="client-content section-space"
                 v-if="content_show">
            <transition name="slide-fade"
                        mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content_show: false,
            }
        },

        created() {
            this.content_show = this;
        },

        updated(){

        },
    }
</script>
