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

mix.js(['resources/assets/admin/js/app.js',
        'resources/assets/admin/js/custom.js'],
    'public/assets/admin/js'
)
    .sass('resources/assets/admin/scss/admin.scss',
        'public/assets/admin/css/admin.css')
    .options({
        processCssUrls: false
    });

mix.sass(
    'resources/assets/admin/scss/vuetify-custom.scss',
    'public/assets/admin/css/vuetify.css'
).options({
    processCssUrls: false
});

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

//Copying file from resource folder to public

mix.copy(
    'node_modules/tinymce/',
    'public/assets/admin/js/'
);

mix.copy(
    'node_modules/intl-tel-input/build',
    'public/assets/admin/css/intl-tel-input'
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
        'frontend/assets/fonts'
    ],
    'public/assets/fonts/'
);
