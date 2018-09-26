<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('user', 'Api\v1\UserController@index');

Route::get('settings_object', 'Api\v1\SettingController@index')->name('api.setting_object');
Route::post('search/videos/{alpha_id?}', 'Api\v1\AssetVideoSearchController@videos');
Route::get('videos/{alpha_id}', 'Api\v1\VideoController@show')->name('api.videos.show');

Route::post('upload', 'Api\v1\VideoController@store')->name('videos_store');
Route::get('details/{code}', 'Api\v1\DetailController@show')->name('api.details.show');
Route::post('details/{code}', 'Api\v1\DetailController@store')->name('api.details.store');

/*
|--------------------------------------------------------------------------
| Frontend Stories Routes
|--------------------------------------------------------------------------
*/

Route::get('stories', 'Api\v1\StoryController@index')->name('api.stories');
Route::get('stories/{alpha_id}', 'Api\v1\StoryController@show')->name('api.stories.show');


/*
|--------------------------------------------------------------------------
| Frontend Search video/story dialogs box, getting current video, next & previous link
|--------------------------------------------------------------------------
*/

Route::post('search/stories/{alpha_id?}', 'Api\v1\AssetStorySearchController@stories');


/*
|--------------------------------------------------------------------------
| Collection Routes
|--------------------------------------------------------------------------
*/
Route::post('client/collections/register_user/{collection_id}', 'Api\v1\CollectionController@registerUser')->name('client.register_user');
Route::post('client/collections', 'Api\v1\CollectionController@store')->name('client.store');
Route::post('client/collections/cancel_collection', 'Api\v1\CollectionController@cancelCollection')->name('client.cancel_collection');

Route::group(['middleware' => 'auth:api','prefix' => 'client'], function () {

    /*
    |--------------------------------------------------------------------------
    | Purchased Controller
    | No needed
    |--------------------------------------------------------------------------
    */
//    Route::get('purchased', 'Frontend\Client\ClientPurchasedController@index')->name('client.purchased');
//    Route::get('offered', 'Frontend\Client\ClientPurchasedController@index')->name('client.offered');
//    Route::get('quotes', 'Frontend\Client\ClientQuotesController@index')->name('client.quotes');


    /*
    |----------------------------------------------------------------------
    |   Remove oauth_access_token from database for current user
    |----------------------------------------------------------------------
     */
    Route::get('token/get', 'Api\v1\UserController@getAccessTokenId');
    Route::post('token/delete', 'Api\v1\UserController@destroyAccessTokenId');


    /*
    |--------------------------------------------------------------------------
    | Download Videos
    |--------------------------------------------------------------------------
    */
    Route::get('videos/{id}/download', 'Api\v1\Client\ClientVideoController@downloadVideo')->name('client.video.download');
    Route::get('videos/purchased', 'Api\v1\Client\ClientVideoController@getPurchasedVideos')->name('client.purchased.videos');
    Route::get('videos/offered', 'Api\v1\Client\ClientVideoController@getOfferedVideos')->name('client.purchased.videos');
    Route::get('videos', 'Api\v1\Client\ClientVideoController@index')->name('client.videos');
    Route::get('videos/{alpha_id}', 'Api\v1\Client\ClientVideoController@show')->name('client.stories.show');

    /*
    |--------------------------------------------------------------------------
    | Download Stories
    |--------------------------------------------------------------------------
    */
    Route::get('stories/{id}/download', 'Api\v1\Client\ClientStoryController@downloadStory')->name('client.stories.download');
    Route::get('stories/purchased', 'Api\v1\Client\ClientStoryController@getPurchasedStories')->name('client.purchased.stories');
    Route::get('stories/offered', 'Api\v1\Client\ClientStoryController@getOfferedStories')->name('client.purchased.stories');
    Route::get('stories', 'Api\v1\Client\ClientStoryController@index')->name('client.stories');
    Route::get('stories/{alpha_id}', 'Api\v1\StoryController@show')->name('client.stories.show');


    /*
    |--------------------------------------------------------------------------
    | Collections Routes for video
    |--------------------------------------------------------------------------
    */
    Route::post('collections/get_video_price/{collection_video_id}', 'Api\v1\CollectionController@getVideoPrice')->name('client.get_video_price');
    Route::post('collections/accept_asset_price/{collection_asset_id}/{type}', 'Api\v1\CollectionController@acceptAssetQuote')->name('client.accept_asset_quote');
    Route::post('collections/reject_asset_price/{collection_asset_id}/{type}', 'Api\v1\CollectionController@rejectAssetQuote')->name('client.accept_asset_quote');
    Route::post('collections/accept_collection_quote/{collection_id}/{quote_id}', 'Api\v1\CollectionController@acceptCollectionQuote')->name('client.accept_collection_quote');
    Route::post('collections/request_quote/{type}/{collection_video_id}', 'Api\v1\CollectionController@requestQuote')->name('client.request_quote');

    /*
    |--------------------------------------------------------------------------
    | Account and Profile Management
    |--------------------------------------------------------------------------
    */
    Route::get('profile', 'Api\v1\Client\ClientAccountController@myAccount')->name('client.profile.edit');
    Route::post('profile/{client}', 'Api\v1\Client\ClientAccountController@update')->name('client.update');
    Route::resource('profile/{slug}/users', 'Api\v1\Client\ClientUserController', ['as' => 'client.profile']);
});


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
