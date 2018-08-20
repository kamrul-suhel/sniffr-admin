const laravelNuxt = require("laravel-nuxt");

module.exports = laravelNuxt({
    // Options such as mode, srcDir and generate.dir are already handled for you.
    modules: {
    },
    plugins: ['~/plugins/main.js'],

    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
        ]
    },

    css: [
        // Load a Node.js module directly (here it's a Sass file)
        // CSS file in the project
        // '@/assets/scss/styles.css',
        // SCSS file in the project
        '@/assets/scss/styles.scss'
    ]
});


