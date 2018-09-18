<?php

\TalvBansal\MediaManager\Routes\MediaRoutes::get();

//Route::get('dm', function(){
//	//$dmResponse = Twitter::postDm(array('screen_name' => 'ianlainchbury', 'text' => 'DM Test', 'format' => 'json'));
//	$dmResponse = Twitter::postDm(array('screen_name' => 'ianlainchbury', 'text' => 'DM Test', 'format' => 'json'));
//
//	dd($dmResponse);
//});

Route::group(['before' => 'if_logged_in_must_be_subscribed'], function () {

//	Route::get(
//		'/',
//		'\\'.Pallares\LaravelNuxt\Controllers\NuxtController::class
//	)->where('/', '/');

    Route::get('videos/category/{category}', 'Frontend\VideoController@category')->name('videos_category_index');
    Route::get('videos/{id}', 'Frontend\VideoController@show')->name('videos_show');
    Route::post('upload', 'Frontend\VideoController@store')->name('videos_store');
    Route::get('upload_video', 'Frontend\VideoController@upload')->name('upload')->name('videos_upload');
    // TODO: remove this form route
    Route::get('upload/form', 'Frontend\VideoController@form')->name('videos_upload_form');
    Route::post('issue', 'Frontend\VideoController@issueAlert');
    Route::post('videocheck', 'Frontend\VideoController@videoCheck');
    Route::get('details/{code}', 'DetailsController@show')->name('details_show');
    Route::post('details/{code}', 'DetailsController@store')->name('details_store');
    // TODO: remove this form route
    Route::get('details/form/{code}', 'DetailsController@form')->name('details_form');

    Route::get('downloaded/track/{mailer_id}/{client_id}', 'Frontend\MailerController@store')->name('mailer_track_store');

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
    | Download Routes
    |--------------------------------------------------------------------------
    */
    Route::get('/contract/download/{reference_id}', 'Contract\ContractController@generatePdf')->name('contract.download.public');
    Route::get('download/{id}/{type}', 'ThemeDownloadController@index');

    Route::get('verify/{activation_code}', 'AuthController@verify');
}); // End if_logged_in_must_be_subscribed route

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

Route::get('password/set/{token}/{email}', ['uses' => 'AuthController@setPassword', 'as' => 'password.set_password']);
Route::post('password/set/{token}/{email}', ['uses' => 'AuthController@setPasswordPost', 'as' => 'password.set_password_post']);


Route::get('unsubscribe/{email}', 'ThemeContactController@index');
Route::post('unsubscribe', 'ThemeContactController@edit');

Route::get('logout', 'AuthController@logout')->name('auth.logout');

Route::get('upload_dir', function () {
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

Route::group(['middleware' => ['admin'], 'prefix' => 'admin'], function () {
    Route::get('', 'Admin\DashboardController@index')->name('admin.dashboard');

	Route::get('asset/update_field', array('uses' => 'Admin\AdminAssetController@updateField'));

    Route::get('users/{id}/stories', 'Admin\AdminUsersController@storiesSent')->name('users.stories.sent');
    Route::post('users/invitation', 'Admin\AdminUsersController@storiesSent')->name('admin.users.invitation.create');
    Route::post('users/invitation', 'Admin\AdminUsersController@storiesSent')->name('admin.users.invitation.create');

	Route::get('licenses/{asset_type}', 'Admin\AdminLicensingController@index', ['as' => 'licenses']);
	Route::get('licenses/{asset_type}/{alpha_id}', 'Admin\AdminLicensingController@show', ['as' => 'licenses']);

	// Admin Story Functionality
	Route::get('stories/create', 'Admin\AdminStoryController@create')->name('admin.stories.create');
	Route::post('stories/store', array('uses' => 'Admin\AdminStoryController@store'));
	Route::get('stories/edit/{id}', 'Admin\AdminStoryController@edit')->name('admin.stories.edit');
	Route::post('stories/update', array('uses' => 'Admin\AdminStoryController@update'))->name('admin.stories.update');
	Route::get('stories/delete/{id}', array('uses' => 'Admin\AdminStoryController@destroy'));
	Route::get('stories/status/{state}/{id}', array('uses' => 'Admin\AdminStoryController@status'));
	Route::get('stories/get_source', array('uses' => 'Admin\AdminStoryController@getSource'));
	Route::get('stories/reminder/{id}', array('uses' => 'Admin\AdminStoryController@sendReminder'));
	Route::get('stories/contact_made/{id}', array('uses' => 'Admin\AdminStoryController@contactMade'));
	Route::get('stories/wp_refresh/{id}', array('uses' => 'Admin\AdminStoryController@wpSync'));

    // Admin Video Functionality
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
    Route::get('videos/autocomplete', 'Admin\AdminVideosController@autocomplete')->name('video.autocomplete');
    Route::get('videos/{id}', array('uses' => 'Admin\AdminVideosController@index'));
    Route::get('videos/status/{state}/{id}', array('uses' => 'Admin\AdminVideosController@status'));
    Route::get('videos/statusapi/{state}/{id}', array('uses' => 'Admin\AdminVideosController@statusapi')); //test for ajax call
    Route::get('videos/remind/{id}', array('uses' => 'Admin\AdminVideosController@remind'));


    Route::resource('comment', 'Admin\AdminCommentController');
	Route::get('comments/{type}/{asset_id}', 'Admin\AdminCommentController@getComments');

    Route::get('contract/{contract}/delete', 'Contract\ContractController@delete')->name('contract.delete');
    Route::resource('contract', 'Contract\ContractController');
    Route::get('contract/{type}/{id}/send', 'Contract\ContractController@send')->name('contract.send');
    Route::get('/contract/download/{reference_id}', 'Contract\ContractController@generatePdf')->name('contract.download');

    Route::get('media', 'Admin\AdminMediaController@index');

    Route::get('mailers', 'Admin\AdminClientMailerController@index');
    Route::get('mailers/refresh', array('uses' => 'Admin\AdminClientMailerController@refresh'));
    Route::get('mailers/checkjobs', 'Admin\AdminClientMailerController@checkJobs');
    Route::get('mailers/create', 'Admin\AdminClientMailerController@create');
    Route::post('mailers/store', array('uses' => 'Admin\AdminClientMailerController@store'));
    Route::get('mailers/edit/{id}', 'Admin\AdminClientMailerController@edit');
    Route::get('mailers/stats/{id}', 'Admin\AdminClientMailerController@stats');
    Route::post('mailers/update', array('uses' => 'Admin\AdminClientMailerController@update'));
    Route::get('mailers/delete/{id}', array('uses' => 'Admin\AdminClientMailerController@destroy'));

    Route::resource('clients', 'Admin\AdminClientController');
    Route::get('clients/{id}/purchases', 'Admin\AdminClientController@purchases')->name('clients.purchases');
    Route::get('clients/{id}/purchases/csv', 'Admin\AdminClientController@purchases_csv')->name('clients.purchases_csv');
    Route::get('clients', 'Admin\AdminClientController@index');
    Route::get('clients/create', 'Admin\AdminClientController@create');
    Route::post('clients/store', array('uses' => 'Admin\AdminClientController@store'));
    Route::get('clients/edit/{id}', 'Admin\AdminClientController@edit');
    Route::post('clients/update/{client}', 'Admin\AdminClientController@update')->name('admin.clients.update');
    Route::get('clients/delete/{id}', array('uses' => 'Admin\AdminClientController@destroy'));

    Route::resource('collections', 'Admin\AdminCollectionController', ['as' => 'admin']);

    Route::get('contacts/autocomplete', 'Admin\AdminContactController@autocomplete')->name('contact.autocomplete');
    Route::resource('contacts', 'Admin\AdminContactController');

    Route::resource('users', 'Admin\AdminUsersController', ['only' => ['index', 'create', 'store', 'edit', 'update', 'destroy']]);

    Route::get('labels', 'Admin\AdminLabelController@index');
    Route::get('analyse', 'Admin\AdminLabelController@analyseVideo');
    Route::get('failedjobs', 'Admin\AdminLabelController@reviewFailedJobs');
    Route::get('checkyoutube', 'Admin\AdminVideosController@checkYoutube');
    Route::get('checkwatermark', 'Admin\AdminVideosController@checkWatermark');
    Route::get('checkanalysis', 'Admin\AdminVideosController@checkAnalysis');
    Route::get('pdfview/{id}', 'Admin\AdminVideosController@pdfview');
    Route::get('nsfw/{id}', 'Admin\AdminVideosController@nsfw');

    Route::get('reminders', 'Admin\AdminLabelController@automateEmailReminders');


    /*
    |--------------------------------------------------------------------------
    | Admin story in dialogs box
    |--------------------------------------------------------------------------
    */
    Route::resource('quotes', 'Admin\AdminQuoteController');
});


/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/
Route::group(['middleware' => ['client'], 'prefix' => 'client'], function () {

    /*
   |--------------------------------------------------------------------------
   | Purchased Controller
   |--------------------------------------------------------------------------
   */
    Route::get('purchased', 'Frontend\Client\ClientPurchasedController@index')->name('client.purchased');
    Route::get('offered', 'Frontend\Client\ClientPurchasedController@index')->name('client.offered');
    Route::get('quotes', 'Frontend\Client\ClientQuotesController@index')->name('client.quotes');

    /*
    |--------------------------------------------------------------------------
    | Download Videos
    |--------------------------------------------------------------------------
    */
    Route::get('videos/{id}/download', 'Frontend\Client\ClientVideosController@downloadVideo')->name('client.video.download');
    Route::get('videos/purchased', 'Frontend\Client\ClientVideosController@getPurchasedVideos')->name('client.purchased.videos');
    Route::get('videos/offered', 'Frontend\Client\ClientVideosController@getOfferedVideos')->name('client.purchased.videos');
    Route::get('videos', 'Frontend\Client\ClientVideosController@index')->name('client.videos');
    Route::get('videos/{alpha_id}', 'Frontend\Client\ClientVideosController@show')->name('client.stories.show');

    /*
    |--------------------------------------------------------------------------
    | Download Stories
    |--------------------------------------------------------------------------
    */


    Route::get('stories/{id}/download', 'Frontend\Client\ClientStoriesController@downloadStory')->name('client.stories.download');
    Route::get('stories/purchased', 'Frontend\Client\ClientStoriesController@getPurchasedStories')->name('client.purchased.stories');
    Route::get('stories/offered', 'Frontend\Client\ClientStoriesController@getOfferedStories')->name('client.purchased.stories');
    Route::get('stories', 'Frontend\Client\ClientStoriesController@index')->name('client.stories');
    Route::get('stories/{alpha_id}', 'Frontend\StoryController@show')->name('client.stories.show');

    /*
    |--------------------------------------------------------------------------
    | Account and Profile Management
    |--------------------------------------------------------------------------
    */
    Route::get('profile', 'Client\ClientAccountController@myAccount')->name('client.profile.edit');
    Route::post('profile/{client}', 'Client\ClientAccountController@update')->name('client.update');
    Route::resource('profile/{slug}/users', 'Client\ClientUserController', ['as' => 'client.profile']);

    /*
    |--------------------------------------------------------------------------
    | Collections Routes for video
    |--------------------------------------------------------------------------
    */

    Route::post('collections/get_video_price/{collection_video_id}', 'CollectionController@getVideoPrice')->name('client.get_video_price');
    Route::post('collections/accept_asset_price/{collection_asset_id}/{type}', 'CollectionController@acceptAssetQuote')->name('client.accept_asset_quote');
    Route::post('collections/reject_asset_price/{collection_asset_id}/{type}', 'CollectionController@rejectAssetQuote')->name('client.accept_asset_quote');
    Route::post('collections/accept_collection_quote/{collection_id}/{quote_id}', 'CollectionController@acceptCollectionQuote')->name('client.accept_collection_quote');
    Route::post('collections/request_quote/{type}/{collection_video_id}', 'CollectionController@requestQuote')->name('client.request_quote');

});



/*
|--------------------------------------------------------------------------
| Frontend Videos Routes
|--------------------------------------------------------------------------
*/


//Route::get('videos',
//	'\\'.Pallares\LaravelNuxt\Controllers\NuxtController::class)
//	->where('videos', 'videos')
//	->name('videos_index');



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


Route::group(array('prefix' => 'api/v1'), function () {
    Route::get('/', 'Api\v1\ApiController@index');

    Route::get('videos', 'Api\v1\VideoController@index');
    Route::get('video/{id}', 'Api\v1\VideoController@video');
    Route::get('video_categories', 'Api\v1\VideoController@video_categories');
    Route::get('video_category/{id}', 'Api\v1\VideoController@video_category');
});

//Route::fallback( '\\'.Pallares\LaravelNuxt\Controllers\NuxtController::class);
