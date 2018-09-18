module.exports = {
    // Options such as mode, srcDir and generate.dir are already handled for you.
    build: {
        vendor: []
    },

    srcDir: __dirname,

    modules: [
        '@nuxtjs/axios'
    ],

    proxy: [
    ],

    axios:{
      baseURL: process.env.APP_URL ||'http://www.sniffr-app.test/api'
    },

    plugins: [
        '~/plugins/axios',
        '~/plugins/main.js',
        '~/plugins/hotjar/index.js',
        '~/plugins/airbreak/index.js'
    ],

    loading: { color: '#ffffff' },

    head: {
        title: 'Sniffr media',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'description',
                content: 'License viral videos viewed by millions around the world from Sniffr Media'
            }
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
        {
          lang: 'css',
          src: '../../node_modules/vuetify/dist/vuetify.min.css'
        },
        {
            src: '@/assets/scss/styles.scss',
            lang: 'scss'
        }
    ]
};


