<template>
    <!-- Client section -->
    <div class="client-section">
        <!-- Client content SECTION -->
        <section class="client-content section-space"
                 v-if="content_show">
                <nuxt-child/>
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
