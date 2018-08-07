let mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'watch') {
    mix.js(['resources/assets/admin/js/app.js',
            'resources/assets/admin/js/custom.js'],
        'public/assets/admin/js'
    )
        .sass('resources/assets/admin/scss/admin.scss',
            'public/assets/admin/css/admin.css');

    mix.sass('resources/assets/scss/admin.scss',
        'public/assets/admin/css/mailer-admin.css'
    );

    /*
    * *********************************************
    * Frontend script and scss
    * *********************************************
    */
    mix.sass(
        'resources/assets/frontend/scss/styles.scss',
        'public/assets/frontend/css/styles.css')
        .options({
            processCssUrls: false,
        })
        .sourceMaps();

    mix.js([
        'resources/assets/frontend/scripts/main.js',
    ], 'public/assets/frontend/scripts/scripts.js')
        .sourceMaps();

    /*
    * ******************************************
        End frontend script and scss
      ******************************************
    */


    /*
    * *********************************************
    * Admin script and scss
    * *********************************************
    */
    mix.js([
        'resources/assets/admin/scripts/main.js',
    ], 'public/assets/admin/scripts/scripts.js')
        .sourceMaps();

    if (mix.inProduction()) {
        mix.version();
    }

    if (!mix.inProduction()) {
        mix.webpackConfig({devtool: 'inline-source-map'})
    }

    /*
    * *********************************************
    * End admin script and scss for vue
    * *********************************************
    */
}

if (process.env.NODE_ENV == 'copy') {
    //Copying file from resource folder to public
    mix.copy(
        'resources/assets/images',
        'public/assets/images'
    );

    mix.copy(
        'node_modules/tinymce/',
        'public/assets/admin/js/'
    );

    mix.copy(
        'node_modules/intl-tel-input/build',
        'public/assets/admin/css/intl-tel-input'
    );

    mix.copy(
        'resources/assets/scripts/vendor/',
        'public/assets/scripts/'
    );

    /*
    * *********************************************
    * All fonts
    * *********************************************
    */
    mix.copy(
        [
            // 'resources/assets/talvbansal/media-manager/fonts',
            'node_modules/bootstrap/fonts',
            'node_modules/font-awesome/fonts',
            'resources/assets/fonts'
        ],
        'public/assets/fonts/'
    );
}
