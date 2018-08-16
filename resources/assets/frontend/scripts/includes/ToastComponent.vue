<template>
    <section class="toast">
        <v-snackbar
                :top="toast.vertical === 'top'"
                :bottom="toast.vertical === 'bottom'"
                :right="toast.horizontal === 'right'"
                :left="toast.horizontal === 'left'"
                :color="toast.color"
                :timeout="toast.duration"
                v-model="active">
            {{ toast.message }}
            <v-btn flat color="light" @click.native="active = false">Close</v-btn>
        </v-snackbar>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data() {
            return {
                duration: 2000,
            }
        },

        computed: {
            ...mapGetters({
                toast: 'getToastData'
            }),

            active: {
                get() {
                    return this.$store.getters.getToastState;
                },

                set() {
                    let toast = {
                        active: false,
                        message: "",
                        duration: 2000,
                        color: "dark",
                        verticalAlign: "top",
                        horizontalAlign: "right"
                    };
                    this.$store.commit('setToast', toast);
                }
            }
        }
    }
</script>
