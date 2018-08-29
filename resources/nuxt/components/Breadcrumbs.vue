<template>
    <!--<section class="breadcrumb">-->
        <!--<v-container grid-list-lg py-0>-->
            <!--<v-layout row wrap>-->
                <!--<v-breadcrumbs divider="/">-->
                    <!--<v-breadcrumbs-item-->
                            <!--v-for="item in items"-->
                            <!--:key="item.text"-->
                            <!--:disabled="item.disabled"-->
                    <!--&gt;-->
                        <!--{{ item.text }}-->
                    <!--</v-breadcrumbs-item>-->
                <!--</v-breadcrumbs>-->
            <!--</v-layout>-->
        <!--</v-container>-->
    <!--</section>-->
</template>

<script>
    export default{
        data: () =>({
            items: [
                {
                    text: 'Home',
                    disabled: false
                },
                {
                    text: 'Videos',
                    disabled: false
                },
                {
                    text: 'Stories',
                    disabled: true
                }
            ]
        }),

        created(){
            console.log(this.$router)
        },

        methods: {

        }
    }
</script>