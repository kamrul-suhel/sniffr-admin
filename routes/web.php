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
    Route::get('upload/form', 'ThemeUploadController@form');
    Route::post('issue', 'ThemeUploadController@issueAlert');
    Route::post('videocheck', 'ThemeUploadController@videoCheck');
    //Route::view('videocheckform', 'frontend.test');

    /*
    |--------------------------------------------------------------------------
    | Submission Routes (for exclusive and non-exclusive videos)
    |--------------------------------------------------------------------------
    */
    Route::post('submission', 'ThemeSubmissionController@store');
    Route::get('submission', 'ThemeSubmissionController@index');
    Route::get('submission/form', 'ThemeSubmissionController@form');

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
    Route::get('details/form/{code}', 'ThemeDetailsController@form');

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
    Route::get('download/{id}/{type}', 'ThemeDownloadController@index');

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

Route::get('unsubscribe/{email}', 'ThemeContactController@index');
Route::post('unsubscribe', 'ThemeContactController@edit');

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
    Route::get('videos', 'Admin\AdminVideosController@index');
    Route::get('videos/edit/{id}', 'Admin\AdminVideosController@edit')->name('admin.video.edit');
    Route::post('videos/update', array('uses' => 'Admin\AdminVideosController@update'));
    Route::get('videos/delete/{id}', array('uses' => 'Admin\AdminVideosController@destroy'));
    Route::get('videos/restore/{id}', array('uses' => 'Admin\AdminVideosController@restore'));
    Route::get('videos/create', 'Admin\AdminVideosController@create');
    Route::post('videos/store', array('uses' => 'Admin\AdminVideosController@store'));
    Route::get('videos/categories', 'Admin\AdminVideoCategoriesController@index');
    Route::post('videos/categories/store', array('uses' => 'Admin\AdminVideoCategoriesController@store'));
    Route::post('videos/categories/order', array('uses' => 'Admin\AdminVideoCategoriesController@order'));
    Route::get('videos/categories/edit/{id}', 'Admin\AdminVideoCategoriesController@edit');
    Route::post('videos/categories/update', array('uses' => 'Admin\AdminVideoCategoriesController@update'));
    Route::get('videos/categories/delete/{id}', array('uses' => 'Admin\AdminVideoCategoriesController@destroy'));

    Route::get('videos/collections', 'Admin\AdminVideoCollectionsController@index');
    Route::post('videos/collections/store', array('uses' => 'Admin\AdminVideoCollectionsController@store'));
    Route::post('videos/collections/order', array('uses' => 'Admin\AdminVideoCollectionsController@order'));
    Route::get('videos/collections/edit/{id}', 'Admin\AdminVideoCollectionsController@edit');
    Route::post('videos/collections/update', array('uses' => 'Admin\AdminVideoCollectionsController@update'));
    Route::get('videos/collections/delete/{id}', array('uses' => 'Admin\AdminVideoCollectionsController@destroy'));

    Route::get('videos/shottypes', 'Admin\AdminVideoShotTypeController@index');
    Route::post('videos/shottypes/store', array('uses' => 'Admin\AdminVideoShotTypeController@store'));
    Route::post('videos/shottypes/order', array('uses' => 'Admin\AdminVideoShotTypeController@order'));
    Route::get('videos/shottypes/edit/{id}', 'Admin\AdminVideoShotTypeController@edit');
    Route::post('videos/shottypes/update', array('uses' => 'Admin\AdminVideoShotTypeController@update'));
    Route::get('videos/shottypes/delete/{id}', array('uses' => 'Admin\AdminVideoShotTypeController@destroy'));

    Route::get('videos/ingest', array('uses' => 'Admin\AdminVideosController@ingest'));
    Route::post('videos/ingest', array('uses' => 'Admin\AdminVideosController@ingest'));
    Route::get('videos/{id}', array('uses' => 'Admin\AdminVideosController@index'));
    Route::get('videos/status/{state}/{id}', array('uses' => 'Admin\AdminVideosController@status'));
    Route::get('videos/statusapi/{state}/{id}', array('uses' => 'Admin\AdminVideosController@statusapi')); //test for ajax call
    Route::get('videos/remind/{id}', array('uses' => 'Admin\AdminVideosController@remind'));

    // comments
    Route::resource('comment', 'CommentController');

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
    Route::get('campaigns/{id}', array('uses' => 'Admin\AdminCampaignController@show'));

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

    Route::get('labels', 'Admin\AdminLabelController@index');
    Route::get('analyse', 'Admin\AdminLabelController@analyseVideo');
    Route::get('failedjobs', 'Admin\AdminLabelController@reviewFailedJobs');
    Route::get('checkyoutube', 'Admin\AdminVideosController@checkYoutube');
    Route::get('checkanalysis', 'Admin\AdminVideosController@checkAnalysis');
    Route::get('pdfview/{id}', 'Admin\AdminVideosController@pdfview');
    Route::get('nsfw/{id}', 'Admin\AdminVideosController@nsfw');

    Route::get('reminders', 'Admin\AdminLabelController@automateEmailReminders');
});


/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

Route::group(array('prefix' => 'client'), function(){
    // Client Video Functionality
    Route::get('videos', 'Client\ClientVideosController@index');
    Route::post('videos/update', array('uses' => 'Client\ClientVideosController@update'));
    Route::get('videos/view/{id}', 'Client\ClientVideosController@view');
    Route::get('videos/status/{state}/{id}', array('uses' => 'Client\ClientVideosController@status'));
    Route::get('videos/interest/{id}', array('uses' => 'Client\ClientVideosController@interest'));

    Route::get('dashboard', 'Client\ClientDashboardController@index');
    Route::get('dailies', array('uses' => 'Client\ClientDailiesController@index'));
    Route::get('dailies/view/{id}', 'Client\ClientDailiesController@view');
    Route::get('dailies/{id}', array('uses' => 'Client\ClientDailiesController@index'));
    Route::get('dailies/status/{state}/{id}', array('uses' => 'Client\ClientDailiesController@status'));
    Route::get('dailies/request/{id}', array('uses' => 'Client\ClientDailiesController@request'));
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
