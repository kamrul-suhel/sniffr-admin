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
        'resources/assets/admin/js/custom.js',
        'resources/assets/admin/js/switch.js'],
    'public/assets/admin/js'
)
    .sass('resources/assets/admin/sass/admin.scss',
        'public/assets/admin/css/admin.css');

mix.sass('resources/assets/share/scss/admin.scss',
    'public/assets/admin/css/mailer-admin.css'
);

/*
* *********************************************
* Navigation styles
* *********************************************
*/
mix.sass(
    'resources/assets/frontend/scss/partials/nav-styles.scss',
    'public/assets/frontend/css/nav-styles.css')
    .options({
        processCssUrls: false,
    })
    .sourceMaps();

/*
* *********************************************
* Footer styles
* *********************************************
*/
mix.sass(
    'resources/assets/frontend/scss/partials/footer-styles.scss',
    'public/assets/frontend/css/footer-styles.css')
    .options({
        processCssUrls: false,
    })
    .sourceMaps();

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

//Copying file from resource folder to public

mix.copy(
    'resources/assets/images',
    'public/assets/images'
);

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


mix.copy(
    'node_modules/tinymce/themes',
    'public/assets/admin/js/themes'
);
mix.copy(
    'node_modules/tinymce/skins',
    'public/assets/admin/js/skins'
);
mix.copy(
    'node_modules/tinymce/plugins',
    'public/assets/admin/js/plugins'
);

// we are not using this utils.js anywhere
// mix.copy(
//     'node_modules/intl-tel-input/build/js/utils.js',
//     'public/assets/js/utils.js'
// );

mix.copy(
    'node_modules/intl-tel-input/build',
    'public/assets/admin/css/intl-tel-input'
);

mix.copy(
    'resources/assets/share/scripts/vendor/',
    'public/assets/scripts/'
);

/*
* *********************************************
* All fonts
* *********************************************
*/
mix.copy(
    [
        'resources/assets/talvbansal/media-manager/fonts',
        'node_modules/bootstrap/fonts',
        'node_modules/font-awesome/fonts',
        'resources/assets/fonts'
    ],
    'public/assets/fonts/'
);
