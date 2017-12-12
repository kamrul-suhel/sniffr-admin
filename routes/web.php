<?php

Route::group(array('before' => 'if_logged_in_must_be_subscribed'), function(){

    /*
    |--------------------------------------------------------------------------
    | Home Page Routes
    |--------------------------------------------------------------------------
    */
    Route::get('/', 'ThemeHomeController@index')->name('home');

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
    | Tag Routes
    |--------------------------------------------------------------------------
    */
    Route::get('tags', 'ThemeTagController@index');

    /*
    |--------------------------------------------------------------------------
    | Upload Routes
    |--------------------------------------------------------------------------
    */
    Route::post('upload', 'ThemeUploadController@store');
    Route::get('upload', 'ThemeUploadController@index');

    /*
    |--------------------------------------------------------------------------
    | Submission Routes (for exclusive and non-exclusive videos)
    |--------------------------------------------------------------------------
    */
    Route::post('submission', 'ThemeSubmissionController@store');
    Route::get('submission', 'ThemeSubmissionController@index');

    /*
    |--------------------------------------------------------------------------
    | Thanks Routes
    |--------------------------------------------------------------------------
    */
    Route::get('thanks', 'ThemeUploadController@thanks');

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
    | Download Routes
    |--------------------------------------------------------------------------
    */
    Route::get('download/{id}', 'ThemeDownloadController@index');

    /*
    |--------------------------------------------------------------------------
    | Dailies Routes
    |--------------------------------------------------------------------------
    */
    Route::get('dailies', 'ThemeDailiesController@index');

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

    Route::get('password/reset', array('uses' => 'ThemeAuthController@password_reset', 'as' => 'password.remind'));
    Route::post('password/reset', array('uses' => 'ThemeAuthController@password_request', 'as' => 'password.request'));
    Route::get('password/reset/{token}', array('uses' => 'ThemeAuthController@password_reset_token', 'as' => 'password.reset'));
    Route::post('password/reset/{token}', array('uses' => 'ThemeAuthController@password_reset_post', 'as' => 'password.update'));

    Route::get('verify/{activation_code}', 'ThemeAuthController@verify');

    /*
    |--------------------------------------------------------------------------
    | User and User Edit Routes
    |--------------------------------------------------------------------------
    */

    Route::get('user/{username}', 'ThemeUserController@index');
    Route::get('user/{username}/edit', 'ThemeUserController@edit');
    Route::post('user/{username}/update', array('uses' => 'ThemeUserController@update'));
    Route::get('user/{username}/billing', array('uses' => 'ThemeUserController@billing'));
    Route::get('user/{username}/cancel', array('uses' => 'ThemeUserController@cancel_account'));
    Route::get('user/{username}/resume', array('uses' => 'ThemeUserController@resume_account'));
    Route::get('user/{username}/update_cc', 'ThemeUserController@update_cc');

}); // End if_logged_in_must_be_subscribed route

Route::get('user/{username}/renew_subscription', 'ThemeUserController@renew');
Route::post('user/{username}/update_cc', array('uses' => 'ThemeUserController@update_cc_store'));

Route::get('user/{username}/upgrade_subscription', 'ThemeUserController@upgrade');
Route::post('user/{username}/upgrade_cc', array('uses' => 'ThemeUserController@upgrade_cc_store'));

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

Route::group(array('prefix' => 'admin'), function(){
    // Admin Dashboard
    Route::get('', 'Admin\AdminController@index');

    // Admin Video Functionality
<<<<<<< HEAD
    Route::get('admin/videos', 'AdminVideosController@index');
    Route::get('admin/videos/edit/{id}', 'AdminVideosController@edit');
    Route::post('admin/videos/update', array('uses' => 'AdminVideosController@update'));
    Route::get('admin/videos/delete/{id}', array('uses' => 'AdminVideosController@destroy'));
    Route::get('admin/videos/create', 'AdminVideosController@create');
    Route::post('admin/videos/store', array('uses' => 'AdminVideosController@store'));
    Route::get('admin/videos/categories', 'AdminVideoCategoriesController@index');
    Route::post('admin/videos/categories/store', array('uses' => 'AdminVideoCategoriesController@store'));
    Route::post('admin/videos/categories/order', array('uses' => 'AdminVideoCategoriesController@order'));
    Route::get('admin/videos/categories/edit/{id}', 'AdminVideoCategoriesController@edit');
    Route::post('admin/videos/categories/update', array('uses' => 'AdminVideoCategoriesController@update'));
    Route::get('admin/videos/categories/delete/{id}', array('uses' => 'AdminVideoCategoriesController@destroy'));
    Route::get('admin/videos/{id}', array('uses' => 'AdminVideosController@index'));
    Route::get('admin/videos/status/{state}/{id}', array('uses' => 'AdminVideosController@status'));
    Route::get('admin/videos/statusapi/{state}/{id}', array('uses' => 'AdminVideosController@statusapi')); //test for ajax call
    Route::get('admin/videos/remind/{id}', array('uses' => 'AdminVideosController@remind'));
    Route::post('admin/videos/comment/{id}', array('uses' => 'AdminVideosController@comment'));


    Route::get('admin/posts', 'AdminPostController@index');
    Route::get('admin/posts/create', 'AdminPostController@create');
    Route::post('admin/posts/store', array('uses' => 'AdminPostController@store'));
    Route::get('admin/posts/edit/{id}', 'AdminPostController@edit');
    Route::post('admin/posts/update', array('uses' => 'AdminPostController@update'));
    Route::get('admin/posts/delete/{id}', array('uses' => 'AdminPostController@destroy'));
    Route::get('admin/posts/categories', 'AdminPostCategoriesController@index');
    Route::post('admin/posts/categories/store', array('uses' => 'AdminPostCategoriesController@store'));
    Route::post('admin/posts/categories/order', array('uses' => 'AdminPostCategoriesController@order'));
    Route::get('admin/posts/categories/edit/{id}', 'AdminPostCategoriesController@edit');
    Route::get('admin/posts/categories/delete/{id}', array('uses' => 'AdminPostCategoriesController@destroy'));
    Route::post('admin/posts/categories/update', array('uses' => 'AdminPostCategoriesController@update'));

    Route::get('admin/media', 'AdminMediaController@index');
    Route::post('admin/media/files', 'AdminMediaController@files');
    Route::post('admin/media/new_folder', 'AdminMediaController@new_folder');
    Route::post('admin/media/delete_file_folder', 'AdminMediaController@delete_file_folder');
    Route::get('admin/media/directories', 'AdminMediaController@get_all_dirs');
    Route::post('admin/media/move_file', 'AdminMediaController@move_file');
    Route::post('admin/media/upload', 'AdminMediaController@upload');

    Route::get('admin/pages', 'AdminPageController@index');
    Route::get('admin/pages/create', 'AdminPageController@create');
    Route::post('admin/pages/store', array('uses' => 'AdminPageController@store'));
    Route::get('admin/pages/edit/{id}', 'AdminPageController@edit');
    Route::post('admin/pages/update', array('uses' => 'AdminPageController@update'));
    Route::get('admin/pages/delete/{id}', array('uses' => 'AdminPageController@destroy'));

    Route::get('admin/clients', 'AdminClientController@index');
    Route::get('admin/clients/create', 'AdminClientController@create');
    Route::post('admin/clients/store', array('uses' => 'AdminClientController@store'));
    Route::get('admin/clients/edit/{id}', 'AdminClientController@edit');
    Route::post('admin/clients/update', array('uses' => 'AdminClientController@update'));
    Route::get('admin/clients/delete/{id}', array('uses' => 'AdminClientController@destroy'));

    Route::get('admin/contacts', 'AdminContactController@index');
    Route::get('admin/contacts/create', 'AdminContactController@create');
    Route::post('admin/contacts/store', array('uses' => 'AdminContactController@store'));
    Route::get('admin/contacts/edit/{id}', 'AdminContactController@edit');
    Route::post('admin/contacts/update', array('uses' => 'AdminContactController@update'));
    Route::get('admin/contacts/delete/{id}', array('uses' => 'AdminContactController@destroy'));

    Route::get('admin/campaigns', 'AdminCampaignController@index');
    Route::get('admin/campaigns/create', 'AdminCampaignController@create');
    Route::post('admin/campaigns/store', array('uses' => 'AdminCampaignController@store'));
    Route::get('admin/campaigns/edit/{id}', 'AdminCampaignController@edit');
    Route::post('admin/campaigns/update', array('uses' => 'AdminCampaignController@update'));
    Route::get('admin/campaigns/delete/{id}', array('uses' => 'AdminCampaignController@destroy'));

    Route::get('admin/users', 'AdminUsersController@index');
    Route::get('admin/user/create', 'AdminUsersController@create');
    Route::post('admin/user/store', array('uses' => 'AdminUsersController@store'));
    Route::get('admin/user/edit/{id}', 'AdminUsersController@edit');
    Route::post('admin/user/update', array('uses' => 'AdminUsersController@update'));
    Route::get('admin/user/delete/{id}', array('uses' => 'AdminUsersController@destroy'));

    Route::get('admin/menu', 'AdminMenuController@index');
    Route::post('admin/menu/store', array('uses' => 'AdminMenuController@store'));
    Route::get('admin/menu/edit/{id}', 'AdminMenuController@edit');
    Route::post('admin/menu/update', array('uses' => 'AdminMenuController@update'));
    Route::post('admin/menu/order', array('uses' => 'AdminMenuController@order'));
    Route::get('admin/menu/delete/{id}', array('uses' => 'AdminMenuController@destroy'));

    Route::get('admin/plugins', 'AdminPluginsController@index');
    Route::get('admin/plugin/deactivate/{plugin_name}', 'AdminPluginsController@deactivate');
    Route::get('admin/plugin/activate/{plugin_name}', 'AdminPluginsController@activate');

    Route::get('admin/themes', 'AdminThemesController@index');
    Route::get('admin/theme/activate/{slug}', array('uses' => 'AdminThemesController@activate'));

    Route::get('admin/settings', 'AdminSettingsController@index');
    Route::post('admin/settings', array('uses' => 'AdminSettingsController@save_settings'));

    Route::get('admin/payment_settings', 'AdminPaymentSettingsController@index');
    Route::post('admin/payment_settings', array('uses' => 'AdminPaymentSettingsController@save_payment_settings'));

    Route::get('admin/theme_settings_form', 'AdminThemeSettingsController@theme_settings_form');
    Route::get('admin/theme_settings', 'AdminThemeSettingsController@theme_settings');
    Route::post('admin/theme_settings', array('uses' => 'AdminThemeSettingsController@update_theme_settings'));
=======
    Route::resource('videos', 'Admin\AdminVideosController');
    Route::get('videos/delete/{id}', array('uses' => 'Admin\AdminVideosController@destroy'));
    Route::post('videos/comment/{id}', array('uses' => 'Admin\AdminVideosController@comment'));
    
    Route::get('videos/{id}', array('uses' => 'Admin\AdminVideosController@index'));
    Route::get('videos/status/{state}/{id}', array('uses' => 'Admin\AdminVideosController@status'));
    Route::get('videos/remind/{id}', array('uses' => 'Admin\AdminVideosController@remind'));
    Route::post('videos/comment/{id}', array('uses' => 'Admin\AdminVideosController@comment'));


    Route::get('videos/categories', 'Admin\AdminVideoCategoriesController@index');
    Route::post('videos/categories/store', array('uses' => 'Admin\AdminVideoCategoriesController@store'));
    Route::post('videos/categories/order', array('uses' => 'Admin\AdminVideoCategoriesController@order'));
    Route::get('videos/categories/edit/{id}', 'Admin\AdminVideoCategoriesController@edit');
    Route::post('videos/categories/update', array('uses' => 'Admin\AdminVideoCategoriesController@update'));
    Route::get('videos/categories/delete/{id}', array('uses' => 'Admin\AdminVideoCategoriesController@destroy'));

    Route::get('posts', 'Admin\AdminPostController@index');
    Route::get('posts/create', 'Admin\AdminPostController@create');
    Route::post('posts/store', array('uses' => 'Admin\AdminPostController@store'));
    Route::get('posts/edit/{id}', 'Admin\AdminPostController@edit');
    Route::post('posts/update', array('uses' => 'Admin\AdminPostController@update'));
    Route::get('posts/delete/{id}', array('uses' => 'Admin\AdminPostController@destroy'));
    Route::get('posts/categories', 'Admin\AdminPostCategoriesController@index');
    Route::post('posts/categories/store', array('uses' => 'Admin\AdminPostCategoriesController@store'));
    Route::post('posts/categories/order', array('uses' => 'Admin\AdminPostCategoriesController@order'));
    Route::get('posts/categories/edit/{id}', 'Admin\AdminPostCategoriesController@edit');
    Route::get('posts/categories/delete/{id}', array('uses' => 'Admin\AdminPostCategoriesController@destroy'));
    Route::post('posts/categories/update', array('uses' => 'Admin\AdminPostCategoriesController@update'));

    Route::get('media', 'Admin\AdminMediaController@index');
    Route::post('media/files', 'Admin\AdminMediaController@files');
    Route::post('media/new_folder', 'Admin\AdminMediaController@new_folder');
    Route::post('media/delete_file_folder', 'Admin\AdminMediaController@delete_file_folder');
    Route::get('media/directories', 'Admin\AdminMediaController@get_all_dirs');
    Route::post('media/move_file', 'Admin\AdminMediaController@move_file');
    Route::post('media/upload', 'Admin\AdminMediaController@upload');

    Route::get('pages', 'Admin\AdminPageController@index');
    Route::get('pages/create', 'Admin\AdminPageController@create');
    Route::post('pages/store', array('uses' => 'Admin\AdminPageController@store'));
    Route::get('pages/edit/{id}', 'Admin\AdminPageController@edit');
    Route::post('pages/update', array('uses' => 'Admin\AdminPageController@update'));
    Route::get('pages/delete/{id}', array('uses' => 'Admin\AdminPageController@destroy'));

    Route::get('clients', 'Admin\AdminClientController@index');
    Route::get('clients/create', 'Admin\AdminClientController@create');
    Route::post('clients/store', array('uses' => 'Admin\AdminClientController@store'));
    Route::get('clients/edit/{id}', 'Admin\AdminClientController@edit');
    Route::post('clients/update', array('uses' => 'Admin\AdminClientController@update'));
    Route::get('clients/delete/{id}', array('uses' => 'Admin\AdminClientController@destroy'));

    Route::get('contacts', 'Admin\AdminContactController@index');
    Route::get('contacts/create', 'Admin\AdminContactController@create');
    Route::post('contacts/store', array('uses' => 'Admin\AdminContactController@store'));
    Route::get('contacts/edit/{id}', 'Admin\AdminContactController@edit');
    Route::post('contacts/update', array('uses' => 'Admin\AdminContactController@update'));
    Route::get('contacts/delete/{id}', array('uses' => 'Admin\AdminContactController@destroy'));

    Route::get('campaigns', 'Admin\AdminCampaignController@index');
    Route::get('campaigns/create', 'Admin\AdminCampaignController@create');
    Route::post('campaigns/store', array('uses' => 'Admin\AdminCampaignController@store'));
    Route::get('campaigns/edit/{id}', 'Admin\AdminCampaignController@edit');
    Route::post('campaigns/update', array('uses' => 'Admin\AdminCampaignController@update'));
    Route::get('campaigns/delete/{id}', array('uses' => 'Admin\AdminCampaignController@destroy'));

    Route::get('users', 'Admin\AdminUsersController@index');
    Route::get('user/create', 'Admin\AdminUsersController@create');
    Route::post('user/store', array('uses' => 'Admin\AdminUsersController@store'));
    Route::get('user/edit/{id}', 'Admin\AdminUsersController@edit');
    Route::post('user/update', array('uses' => 'Admin\AdminUsersController@update'));
    Route::get('user/delete/{id}', array('uses' => 'Admin\AdminUsersController@destroy'));

    Route::get('menu', 'Admin\AdminMenuController@index');
    Route::post('menu/store', array('uses' => 'Admin\AdminMenuController@store'));
    Route::get('menu/edit/{id}', 'Admin\AdminMenuController@edit');
    Route::post('menu/update', array('uses' => 'Admin\AdminMenuController@update'));
    Route::post('menu/order', array('uses' => 'Admin\AdminMenuController@order'));
    Route::get('menu/delete/{id}', array('uses' => 'Admin\AdminMenuController@destroy'));

    Route::get('plugins', 'Admin\AdminPluginsController@index');
    Route::get('plugin/deactivate/{plugin_name}', 'Admin\AdminPluginsController@deactivate');
    Route::get('plugin/activate/{plugin_name}', 'Admin\AdminPluginsController@activate');

    Route::get('themes', 'Admin\AdminThemesController@index');
    Route::get('theme/activate/{slug}', array('uses' => 'Admin\AdminThemesController@activate'));

    Route::get('settings', 'Admin\AdminSettingsController@index');
    Route::post('settings', array('uses' => 'Admin\AdminSettingsController@save_settings'));

    Route::get('payment_settings', 'Admin\AdminPaymentSettingsController@index');
    Route::post('payment_settings', array('uses' => 'Admin\AdminPaymentSettingsController@save_payment_settings'));

    Route::get('theme_settings_form', 'Admin\AdminThemeSettingsController@theme_settings_form');
    Route::get('theme_settings', 'Admin\AdminThemeSettingsController@theme_settings');
    Route::post('theme_settings', array('uses' => 'Admin\AdminThemeSettingsController@update_theme_settings'));
>>>>>>> c6489494bf56d6a42dc4085b7032c29ac63ff10f
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
