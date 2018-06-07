<?php

\TalvBansal\MediaManager\Routes\MediaRoutes::get();

Route::group(['before' => 'if_logged_in_must_be_subscribed'], function(){

    Route::get('/settings_object', function () {
        return response(config('settings.public'));
    });
    Route::get('/', 'HomeController@index')->name('home');

    Route::get('videos', 'Video\VideoController@index')->name('videos_index');
    Route::get('dailies', 'Video\VideoController@dailiesIndex')->name('dailies_index');
    Route::get('videos/category/{category}', 'Video\VideoController@category' )->name('videos_category_index');
    Route::get('videos/tag/{tag}', 'Video\VideoController@findByTag' )->name('videos_tag_index');
    Route::get('videos/{id}', 'Video\VideoController@show')->name('videos_show');
    Route::post('upload', 'Video\VideoController@store')->name('videos_store');
    Route::get('upload', 'Video\VideoController@upload')->name('upload')->name('videos_upload');
    // TODO: remove this form route
    Route::get('upload/form', 'Video\VideoController@form')->name('videos_upload_form');
    Route::post('issue', 'Video\VideoController@issueAlert');
    Route::post('videocheck', 'Video\VideoController@videoCheck');
    Route::get('details/{code}', 'DetailsController@show')->name('details_show');
    Route::post('details/{code}', 'DetailsController@store')->name('details_store');
    // TODO: remove this form route
    Route::get('details/form/{code}', 'DetailsController@form')->name('details_form');

    Route::get('tags', 'ThemeTagController@index');


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
    Route::get('search', 'SearchController@index')->name('search');


    /*
    |--------------------------------------------------------------------------
    | Auth and Password Reset Routes
    |--------------------------------------------------------------------------
    */

    Route::get('login', 'AuthController@login_form')->name('login');
    Route::get('islogin', 'AuthController@isLogin')->name('islogin');
    Route::post('login', 'AuthController@login')->name('auth.login');

    Route::get('password/reset', ['uses' => 'AuthController@password_reset', 'as' => 'password.remind']);
    Route::post('password/reset', ['uses' => 'AuthController@password_request', 'as' => 'password.request']);
    Route::get('password/reset/{token}', ['uses' => 'AuthController@password_reset_token', 'as' => 'password.reset']);
    Route::post('password/reset/{token}', ['uses' => 'AuthController@password_reset_post', 'as' => 'password.update']);

    Route::get('verify/{activation_code}', 'AuthController@verify');

    /*
    |--------------------------------------------------------------------------
    | User and User Edit Routes
    |--------------------------------------------------------------------------
    */

    Route::get('user/{username}', 'ThemeUserController@index');
    Route::get('user/{username}/edit', 'ThemeUserController@edit');
    Route::post('user/{username}/update', ['uses' => 'ThemeUserController@update']);
    Route::get('user/{username}/billing', ['uses' => 'ThemeUserController@billing']);
    Route::get('user/{username}/cancel', ['uses' => 'ThemeUserController@cancel_account']);
    Route::get('user/{username}/resume', ['uses' => 'ThemeUserController@resume_account']);
    Route::get('user/{username}/update_cc', 'ThemeUserController@update_cc');

}); // End if_logged_in_must_be_subscribed route

Route::get('unsubscribe/{email}', 'ThemeContactController@index');
Route::post('unsubscribe', 'ThemeContactController@edit');

Route::get('user/{username}/renew_subscription', 'ThemeUserController@renew');
Route::post('user/{username}/update_cc', ['uses' => 'ThemeUserController@update_cc_store']);

Route::get('user/{username}/upgrade_subscription', 'ThemeUserController@upgrade');
Route::post('user/{username}/upgrade_cc', ['uses' => 'ThemeUserController@upgrade_cc_store']);

Route::get('logout', 'AuthController@logout')->name('auth.logout');

Route::get('upload_dir', function(){
    echo Config::get('site.uploads_dir');
});

Route::get('terms', 'ThemeTermsController@index');

Route::get('contract/{token}/accept', 'Contract\ContractController@accept')->name('contract.accept');
Route::post('contract/{token}/sign', 'Contract\ContractController@sign')->name('contract.sign');
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::group(array('prefix' => 'admin'), function () {
    Route::get('', 'Admin\DashboardController@index')->name('admin.dashboard');

    Route::get('clients/{id}/orders', 'Admin\AdminClientController@orders')->name('clients.orders');
    Route::get('clients/{id}/orders/csv', 'Admin\AdminClientController@orders_csv')->name('clients.orders_csv');
    Route::get('users/{id}/stories', 'Admin\AdminUsersController@storiesSent')->name('users.stories.sent');

    // Admin Video Functionality
    Route::get('videos', 'Admin\AdminVideosController@index')->name('videos.index');
    Route::get('videos/edit/{id}', 'Admin\AdminVideosController@edit')->name('admin_video_edit');
    Route::post('videos/update', array('uses' => 'Admin\AdminVideosController@update'))->name('videos.update');
    Route::get('videos/delete/{id}', array('uses' => 'Admin\AdminVideosController@destroy'))->name('videos.destroy');
    Route::get('videos/restore/{id}', array('uses' => 'Admin\AdminVideosController@restore'));
    Route::get('videos/create', 'Admin\AdminVideosController@create')->name('videos.create');
    Route::post('videos/store', array('uses' => 'Admin\AdminVideosController@store'))->name('videos.store');

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

    Route::resource('comment', 'CommentController');

    Route::get('contract/{contract}/delete', 'Contract\ContractController@delete')->name('contract.delete');
    Route::resource('contract', 'Contract\ContractController');
    Route::get('contract/{id}/send', 'Contract\ContractController@send')->name('contract.send');
    Route::get('/contract/download/{video_id}', 'Contract\ContractController@generatePdf')->name('contract.download');

    Route::get('media', 'Admin\AdminMediaController@index');
    // Route::post('media/files', 'Admin\AdminMediaController@files');
    // Route::post('media/new_folder', 'Admin\AdminMediaController@new_folder');
    // Route::post('media/delete_file_folder', 'Admin\AdminMediaController@delete_file_folder');
    // Route::get('media/directories', 'Admin\AdminMediaController@get_all_dirs');
    // Route::post('media/move_file', 'Admin\AdminMediaController@move_file');
    // Route::post('media/upload', 'Admin\AdminMediaController@upload');

    Route::get('pages', 'Admin\AdminPageController@index');
    Route::get('pages/create', 'Admin\AdminPageController@create');
    Route::post('pages/store', array('uses' => 'Admin\AdminPageController@store'));
    Route::get('pages/edit/{id}', 'Admin\AdminPageController@edit');
    Route::post('pages/update', array('uses' => 'Admin\AdminPageController@update'));
    Route::get('pages/delete/{id}', array('uses' => 'Admin\AdminPageController@destroy'));

    Route::get('stories/{id}/download', 'StoryController@downloadStory')->name('admin.stories.download');
    Route::get('stories', 'Admin\AdminStoryController@index');
    Route::get('stories/create', 'Admin\AdminStoryController@create');
    Route::post('stories/store', array('uses' => 'Admin\AdminStoryController@store'));
    Route::get('stories/edit/{id}', 'Admin\AdminStoryController@edit');
    Route::post('stories/update', array('uses' => 'Admin\AdminStoryController@update'));
	Route::get('stories/refresh', array('uses' => 'Admin\AdminStoryController@refresh'));
    Route::get('stories/delete/{id}', array('uses' => 'Admin\AdminStoryController@destroy'));

    Route::get('mailers', 'Admin\AdminClientMailerController@index');
    Route::get('mailers/create', 'Admin\AdminClientMailerController@create');
    Route::post('mailers/store', array('uses' => 'Admin\AdminClientMailerController@store'));
    Route::get('mailers/edit/{id}', 'Admin\AdminClientMailerController@edit');
    Route::get('mailers/stats/{id}', 'Admin\AdminClientMailerController@stats');
    Route::post('mailers/update', array('uses' => 'Admin\AdminClientMailerController@update'));
    Route::get('mailers/delete/{id}', array('uses' => 'Admin\AdminClientMailerController@destroy'));

    Route::get('clients', 'Admin\AdminClientController@index');
    Route::get('clients/create', 'Admin\AdminClientController@create');
    Route::post('clients/store', array('uses' => 'Admin\AdminClientController@store'));
    Route::get('clients/edit/{id}', 'Admin\AdminClientController@edit');
    Route::post('clients/update', array('uses' => 'Admin\AdminClientController@update'));
    Route::get('clients/delete/{id}', array('uses' => 'Admin\AdminClientController@destroy'));

    Route::resource('contacts', 'Contact\ContactController');

    Route::get('campaigns', 'Admin\AdminCampaignController@index')->name('admin_campaigns');
    Route::get('campaigns/create', 'Admin\AdminCampaignController@create');
    Route::post('campaigns/store', array('uses' => 'Admin\AdminCampaignController@store'));
    Route::get('campaigns/edit/{id}', 'Admin\AdminCampaignController@edit');
    Route::post('campaigns/update', array('uses' => 'Admin\AdminCampaignController@update'));
    Route::get('campaigns/delete/{id}', array('uses' => 'Admin\AdminCampaignController@destroy'));
    Route::get('campaigns/{id}', array('uses' => 'Admin\AdminCampaignController@show'));

    Route::resource('users', 'Admin\AdminUsersController', ['only'=> ['index','create','store','edit','update']]);

    /*Route::get('users', 'Admin\AdminUsersController@index');
    Route::get('user/create', 'Admin\AdminUsersController@create');
    Route::post('user/store', array('uses' => 'Admin\AdminUsersController@store'));
    Route::get('user/edit/{id}', 'Admin\AdminUsersController@edit');
    Route::post('user/update', array('uses' => 'Admin\AdminUsersController@update'));
    Route::get('user/delete/{id}', array('uses' => 'Admin\AdminUsersController@destroy'));*/

    Route::get('labels', 'Admin\AdminLabelController@index');
    Route::get('analyse', 'Admin\AdminLabelController@analyseVideo');
    Route::get('failedjobs', 'Admin\AdminLabelController@reviewFailedJobs');
    Route::get('checkyoutube', 'Admin\AdminVideosController@checkYoutube');
    Route::get('checkwatermark', 'Admin\AdminVideosController@checkWatermark');
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

Route::group(array('prefix' => 'client'), function () {
    Route::resource('orders', 'OrderController');
    Route::get('stories/{id}/download', 'StoryController@downloadStory')->name('client.stories.download');
    Route::get('stories/{id}/download_pdf', 'StoryController@getPdf')->name('client.stories.download_pdf');
    Route::get('asset/{id}/download', 'StoryController@downloadAsset')->name('client.asset.download');
    Route::get('video/{id}/download', 'StoryController@downloadVideo')->name('client.video.download');

    Route::get('videos', 'Client\ClientVideosController@index')->name('client.videos');
});

/*
|--------------------------------------------------------------------------
| Client Frontend Routes
|--------------------------------------------------------------------------
*/

Route::get('/client/stories', 'Frontend\FrontendStoryController@getMailerStories')->name('client.stories');
Route::get('/client/stories/mail/{user_id}', 'Frontend\FrontendStoryController@getMailerStories')->name('client.story.mail.user_id');
Route::get('client/stories/downloaded', 'Frontend\FrontendStoryController@getDownloadedStories')->name('client.downloaded.stories');
Route::get('/client/story/show/{alpha_id}', 'Frontend\FrontendStoryController@show');
Route::get('/client/video/show/{alpha_id}', 'Video\VideoController@show');
Route::get('/client/videos', 'Video\VideoController@videosSent');

/*
|--------------------------------------------------------------------------
| Frontend video dialog box, getting current video, next & previous link
|--------------------------------------------------------------------------
*/

Route::get('videosdialogbox/{alpha_id}', 'SearchController@videosInDialog');
Route::get('videosdialog/featured/{alpha_id}', 'SearchController@featureVideosInDialog');
Route::get('videosdialog/search/{alpha_id}/{value}', 'SearchController@searchVideosInDialog')->name('searchvideodialog');
Route::get('videosdialog/tags/{alpha_id}/{tag}', 'SearchController@tagsSearchVideosInDialog')->name('tagsearchvideodialog');


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
});
