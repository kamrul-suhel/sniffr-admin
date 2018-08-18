<template>
    <v-container fluid fill-height>
        <v-layout justify-center align-center>
            <v-flex shrink class="text-xs-center">
                <h1>Hello {{ name }}!</h1>
                <v-btn dark raised @click="$store.commit('increment')">Click me {{ $store.getters.getCounter}}</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => {
            return { name: 'About page' };
        },

        head(){
            return {
                title: 'About us page',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is about us page description' }
                ]
            }

        }
    };
</script>
