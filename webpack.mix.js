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
   // .sass('resources/assets/sass/app.scss', 'public/assets/css')
   .js(['resources/assets/admin/js/app.js', 'resources/assets/admin/js/custom.js', 'resources/assets/admin/js/switch.js'], 'public/assets/admin/js')
   .sass('resources/assets/sass/admin.scss', 'public/assets/css/admin.css');

mix.copy('node_modules/tinymce/themes', 'public/assets/admin/js/themes');
mix.copy('node_modules/tinymce/skins', 'public/assets/admin/js/skins');
mix.copy('node_modules/tinymce/plugins', 'public/assets/admin/js/plugins');
mix.copy('node_modules/intl-tel-input/build/js/utils.js', 'public/assets/js/utils.js');

mix.copy('node_modules/intl-tel-input/build/css', 'public/assets/css/intl-tel-input/css');
mix.copy('node_modules/intl-tel-input/build/img', 'public/assets/css/intl-tel-input/img');
