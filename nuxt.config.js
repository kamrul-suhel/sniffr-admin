const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
    // Options such as mode, srcDir and generate.dir are already handled for you.
    build: {
        vendor: []
    },

    modules: [
    ],

    plugins: [
        '~/plugins/main.js',
        '~/plugins/hotjar/index.js',
        '~/plugins/airbreak/index.js'
    ],

    loading: { color: '#ffffff' },

    head: {
        title: 'Sniffr media',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
            },
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ],

        script:[
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/airbrake-js/1.0.4/client.min.js'
            }
        ]
    },

    css: [
        '@/assets/scss/styles.scss'
    ]
});


