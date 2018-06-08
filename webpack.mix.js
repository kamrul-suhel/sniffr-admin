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

mix.js(['resources/assets/js/app.js','resources/assets/js/custom.js'], 'public/assets/js')
   .js([
       'resources/assets/admin/js/app.js',
       'resources/assets/admin/js/custom.js',
       'resources/assets/admin/js/switch.js'],
       'public/assets/admin/js'
   )
   .sass(
       'resources/assets/sass/admin.scss',
       'public/assets/css/admin.css'
   );

    if (mix.inProduction()) {
        mix.version();
    }

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

    if (mix.inProduction()) {
        mix.version();
    }



mix.js([
    'resources/assets/frontend/scripts/main.js',
], 'public/assets/frontend/scripts/scripts.js')
    .sourceMaps();

    if (mix.inProduction()) {
        mix.version();
    }

if (!mix.inProduction()) {
    mix.webpackConfig({devtool: 'inline-source-map'})
}
//Copying file from resource folder to public

// mix.copy(
//     'resources/assets/frontend/images',
//     'public/assets/frontend/images/'
// );
// mix.copy(
//     'resources/assets/admin/images',
//     'public/assets/admin/images/'
// );

/*
* ******************************************
    End frontend script and scss
  ******************************************
*/


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

if (mix.inProduction()) {
    mix.version();
}

mix.js([
    'resources/assets/frontend/scripts/main.js',
], 'public/assets/frontend/scripts/scripts.js')
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
mix.copy(
    'node_modules/intl-tel-input/build/js/utils.js',
    'public/assets/js/utils.js'
);
mix.copy(
    'node_modules/intl-tel-input/build/css',
    'public/assets/css/intl-tel-input/css'
);
mix.copy(
    'node_modules/intl-tel-input/build/img',
    'public/assets/css/intl-tel-input/img'
);
mix.copy(
    'resources/assets/talvbansal/media-manager/fonts/',
    'public/fonts/'
);
