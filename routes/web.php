<?php

Route::group(array('before' => 'if_logged_in_must_be_subscribed'), function(){

    /*
    |--------------------------------------------------------------------------
    | Home Page Routes
    |--------------------------------------------------------------------------
    */

        Route::get('/', 'ThemeHomeController@index');

    /*
    |--------------------------------------------------------------------------
    | Video Page Routes
    |--------------------------------------------------------------------------
    */

        Route::get('videos', array('uses' => 'ThemeVideoController@videos', 'as' => 'videos') );
        Route::get('videos/category/{category}', 'ThemeVideoController@category' );
        Route::get('videos/tag/{tag}', 'ThemeVideoController@tag' );
        Route::get('video/{id}', 'ThemeVideoController@index');

    /*
    |--------------------------------------------------------------------------
    | Upload Routes
    |--------------------------------------------------------------------------
    */

        Route::post('upload', 'ThemeUploadController@store');
        Route::get('upload', 'ThemeUploadController@index');

    /*
    |--------------------------------------------------------------------------
    | Details Routes
    |--------------------------------------------------------------------------
    */

        Route::post('details/{code}', 'ThemeDetailsController@store');
        Route::get('details/{code}', 'ThemeDetailsController@index');

    /*
    |--------------------------------------------------------------------------
    | Favorite Routes
    |--------------------------------------------------------------------------
    */

        Route::post('favorite', 'ThemeFavoriteController@favorite');
        Route::get('favorites', 'ThemeFavoriteController@show_favorites');


    /*
    |--------------------------------------------------------------------------
    | Post Page Routes
    |--------------------------------------------------------------------------
    */

        Route::get( 'posts', array('uses' => 'ThemePostController@posts', 'as' => 'posts') );
        Route::get( 'posts/category/{category}', 'ThemePostController@category' );
        Route::get( 'post/{slug}', 'ThemePostController@index' );


    /*
    |--------------------------------------------------------------------------
    | Page Routes
    |--------------------------------------------------------------------------
    */

        Route::get('pages', 'ThemePageController@pages');
        Route::get('page/{slug}', 'ThemePageController@index');


    /*
    |--------------------------------------------------------------------------
    | Search Routes
    |--------------------------------------------------------------------------
    */

        Route::get('search', 'ThemeSearchController@index');

    /*
    |--------------------------------------------------------------------------
    | Auth and Password Reset Routes
    |--------------------------------------------------------------------------
    */

        Route::get('login', 'ThemeAuthController@login_form')->name('login');
        //Route::get('signup', 'ThemeAuthController@signup_form');
        Route::post('login', 'ThemeAuthController@login');
        //Route::post('signup', 'ThemeAuthController@signup');

        Route::get('password/reset', array('before' => 'demo', 'uses' => 'ThemeAuthController@password_reset', 'as' => 'password.remind'));
        Route::post('password/reset', array('before' => 'demo', 'uses' => 'ThemeAuthController@password_request', 'as' => 'password.request'));
        Route::get('password/reset/{token}', array('before' => 'demo', 'uses' => 'ThemeAuthController@password_reset_token', 'as' => 'password.reset'));
        Route::post('password/reset/{token}', array('before' => 'demo', 'uses' => 'ThemeAuthController@password_reset_post', 'as' => 'password.update'));

        Route::get('verify/{activation_code}', 'ThemeAuthController@verify');

    /*
    |--------------------------------------------------------------------------
    | User and User Edit Routes
    |--------------------------------------------------------------------------
    */

        Route::get('user/{username}', 'ThemeUserController@index');
        Route::get('user/{username}/edit', 'ThemeUserController@edit');
        Route::post('user/{username}/update', array('before' => 'demo', 'uses' => 'ThemeUserController@update'));
        Route::get('user/{username}/billing', array('before' => 'demo', 'uses' => 'ThemeUserController@billing'));
        Route::get('user/{username}/cancel', array('before' => 'demo', 'uses' => 'ThemeUserController@cancel_account'));
        Route::get('user/{username}/resume', array('before' => 'demo', 'uses' => 'ThemeUserController@resume_account'));
        Route::get('user/{username}/update_cc', 'ThemeUserController@update_cc');

}); // End if_logged_in_must_be_subscribed route

Route::get('user/{username}/renew_subscription', 'ThemeUserController@renew');
Route::post('user/{username}/update_cc', array('before' => 'demo', 'uses' => 'ThemeUserController@update_cc_store'));

Route::get('user/{username}/upgrade_subscription', 'ThemeUserController@upgrade');
Route::post('user/{username}/upgrade_cc', array('before' => 'demo', 'uses' => 'ThemeUserController@upgrade_cc_store'));

Route::get('logout', 'ThemeAuthController@logout');

Route::get('upgrade', 'UpgradeController@upgrade');

Route::get('upload_dir', function(){
    echo Config::get('site.uploads_dir');
});
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

    Route::group(array('before' => 'admin'), function(){

        // Admin Dashboard
        Route::get('admin', 'AdminController@index');

        // Admin Video Functionality
        Route::get('admin/videos', 'AdminVideosController@index');
        Route::get('admin/videos/edit/{id}', 'AdminVideosController@edit');
        Route::post('admin/videos/update', array('before' => 'demo', 'uses' => 'AdminVideosController@update'));
        Route::get('admin/videos/delete/{id}', array('before' => 'demo', 'uses' => 'AdminVideosController@destroy'));
        Route::get('admin/videos/create', 'AdminVideosController@create');
        Route::post('admin/videos/store', array('before' => 'demo', 'uses' => 'AdminVideosController@store'));
        Route::get('admin/videos/categories', 'AdminVideoCategoriesController@index');
        Route::post('admin/videos/categories/store', array('before' => 'demo', 'uses' => 'AdminVideoCategoriesController@store'));
        Route::post('admin/videos/categories/order', array('before' => 'demo', 'uses' => 'AdminVideoCategoriesController@order'));
        Route::get('admin/videos/categories/edit/{id}', 'AdminVideoCategoriesController@edit');
        Route::post('admin/videos/categories/update', array('before' => 'demo', 'uses' => 'AdminVideoCategoriesController@update'));
        Route::get('admin/videos/categories/delete/{id}', array('before' => 'demo', 'uses' => 'AdminVideoCategoriesController@destroy'));
        Route::get('admin/videos/{id}', array('before' => 'demo', 'uses' => 'AdminVideosController@index'));
        Route::get('admin/videos/status/{state}/{id}', array('before' => 'demo', 'uses' => 'AdminVideosController@status'));


        Route::get('admin/posts', 'AdminPostController@index');
        Route::get('admin/posts/create', 'AdminPostController@create');
        Route::post('admin/posts/store', array('before' => 'demo', 'uses' => 'AdminPostController@store'));
        Route::get('admin/posts/edit/{id}', 'AdminPostController@edit');
        Route::post('admin/posts/update', array('before' => 'demo', 'uses' => 'AdminPostController@update'));
        Route::get('admin/posts/delete/{id}', array('before' => 'demo', 'uses' => 'AdminPostController@destroy'));
        Route::get('admin/posts/categories', 'AdminPostCategoriesController@index');
        Route::post('admin/posts/categories/store', array('before' => 'demo', 'uses' => 'AdminPostCategoriesController@store'));
        Route::post('admin/posts/categories/order', array('before' => 'demo', 'uses' => 'AdminPostCategoriesController@order'));
        Route::get('admin/posts/categories/edit/{id}', 'AdminPostCategoriesController@edit');
        Route::get('admin/posts/categories/delete/{id}', array('before' => 'demo', 'uses' => 'AdminPostCategoriesController@destroy'));
        Route::post('admin/posts/categories/update', array('before' => 'demo', 'uses' => 'AdminPostCategoriesController@update'));

        Route::get('admin/media', 'AdminMediaController@index');
        Route::post('admin/media/files', 'AdminMediaController@files');
        Route::post('admin/media/new_folder', 'AdminMediaController@new_folder');
        Route::post('admin/media/delete_file_folder', 'AdminMediaController@delete_file_folder');
        Route::get('admin/media/directories', 'AdminMediaController@get_all_dirs');
        Route::post('admin/media/move_file', 'AdminMediaController@move_file');
        Route::post('admin/media/upload', 'AdminMediaController@upload');
        Route::get('file_upload', function(){
            echo phpinfo();
        });

        Route::get('admin/pages', 'AdminPageController@index');
        Route::get('admin/pages/create', 'AdminPageController@create');
        Route::post('admin/pages/store', array('before' => 'demo', 'uses' => 'AdminPageController@store'));
        Route::get('admin/pages/edit/{id}', 'AdminPageController@edit');
        Route::post('admin/pages/update', array('before' => 'demo', 'uses' => 'AdminPageController@update'));
        Route::get('admin/pages/delete/{id}', array('before' => 'demo', 'uses' => 'AdminPageController@destroy'));

        Route::get('admin/clients', 'AdminClientController@index');
        Route::get('admin/clients/create', 'AdminClientController@create');
        Route::post('admin/clients/store', array('before' => 'demo', 'uses' => 'AdminClientController@store'));
        Route::get('admin/clients/edit/{id}', 'AdminClientController@edit');
        // Route::post('admin/pages/update', array('before' => 'demo', 'uses' => 'AdminPageController@update'));
        // Route::get('admin/pages/delete/{id}', array('before' => 'demo', 'uses' => 'AdminPageController@destroy'));

        Route::get('admin/campaigns', 'AdminCampaignController@index');
        Route::get('admin/campaigns/create', 'AdminCampaignController@create');
        Route::post('admin/campaigns/store', array('before' => 'demo', 'uses' => 'AdminCampaignController@store'));
        Route::get('admin/campaigns/edit/{id}', 'AdminCampaignController@edit');
        // Route::post('admin/pages/update', array('before' => 'demo', 'uses' => 'AdminPageController@update'));
        // Route::get('admin/pages/delete/{id}', array('before' => 'demo', 'uses' => 'AdminPageController@destroy'));

        Route::get('admin/users', 'AdminUsersController@index');
        Route::get('admin/user/create', 'AdminUsersController@create');
        Route::post('admin/user/store', array('before' => 'demo', 'uses' => 'AdminUsersController@store'));
        Route::get('admin/user/edit/{id}', 'AdminUsersController@edit');
        Route::post('admin/user/update', array('before' => 'demo', 'uses' => 'AdminUsersController@update'));
        Route::get('admin/user/delete/{id}', array('before' => 'demo', 'uses' => 'AdminUsersController@destroy'));

        Route::get('admin/menu', 'AdminMenuController@index');
        Route::post('admin/menu/store', array('before' => 'demo', 'uses' => 'AdminMenuController@store'));
        Route::get('admin/menu/edit/{id}', 'AdminMenuController@edit');
        Route::post('admin/menu/update', array('before' => 'demo', 'uses' => 'AdminMenuController@update'));
        Route::post('admin/menu/order', array('before' => 'demo', 'uses' => 'AdminMenuController@order'));
        Route::get('admin/menu/delete/{id}', array('before' => 'demo', 'uses' => 'AdminMenuController@destroy'));

        Route::get('admin/plugins', 'AdminPluginsController@index');
        Route::get('admin/plugin/deactivate/{plugin_name}', 'AdminPluginsController@deactivate');
        Route::get('admin/plugin/activate/{plugin_name}', 'AdminPluginsController@activate');

        Route::get('admin/themes', 'AdminThemesController@index');
        Route::get('admin/theme/activate/{slug}', array('before' => 'demo', 'uses' => 'AdminThemesController@activate'));

        Route::get('admin/settings', 'AdminSettingsController@index');
        Route::post('admin/settings', array('before' => 'demo', 'uses' => 'AdminSettingsController@save_settings'));

        Route::get('admin/payment_settings', 'AdminPaymentSettingsController@index');
        Route::post('admin/payment_settings', array('before' => 'demo', 'uses' => 'AdminPaymentSettingsController@save_payment_settings'));

        Route::get('admin/theme_settings_form', 'AdminThemeSettingsController@theme_settings_form');
        Route::get('admin/theme_settings', 'AdminThemeSettingsController@theme_settings');
        Route::post('admin/theme_settings', array('before' => 'demo', 'uses' => 'AdminThemeSettingsController@update_theme_settings'));
    });

/*
|--------------------------------------------------------------------------
| Payment Webhooks
|--------------------------------------------------------------------------
*/

    //Route::post('stripe/webhook', 'Laravel\Cashier\WebhookController@handleWebhook');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


Route::group(array('prefix' => 'api/v1'), function()
{
    Route::get('/', 'Api\v1\ApiController@index');

    Route::get('videos', 'Api\v1\VideoController@index');
    Route::get('video/{id}', 'Api\v1\VideoController@video');
    Route::get('video_categories', 'Api\v1\VideoController@video_categories');
    Route::get('video_category/{id}', 'Api\v1\VideoController@video_category');

    Route::get('posts', 'Api\v1\PostController@index');
    Route::get('post/{id}', 'Api\v1\PostController@post');
    Route::get('post_categories', 'Api\v1\PostController@post_categories');
    Route::get('post_category/{id}', 'Api\v1\PostController@post_category');
});
