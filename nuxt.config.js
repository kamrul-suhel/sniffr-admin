const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
    // Options such as mode, srcDir and generate.dir are already handled for you.
    build: {
        vendor: ['axios']
    },

    modules: [
    ],

    plugins: ['~/plugins/main.js'],

    loading: { color: '#3B8070' },

    head: {
        title: 'Sniffr media',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
        ],

        script:[
        ]
    },

    css: [
        // Load a Node.js module directly (here it's a Sass file)
        // CSS file in the project
        // SCSS file in the project
        '@/assets/scss/styles.scss'
    ]
});


