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

Route::middleware('auth:api')->get('user', 'Frontend\UserController@index');


Route::get('settings_object', 'SettingController@index')->name('setting_object');
Route::post('search/videos/{alpha_id?}', 'Api\v1\AssetVideoSearchController@videos');
Route::get('videos/{alpha_id}', 'Api\v1\VideoController@show')->name('api.videos.show');

/*
|--------------------------------------------------------------------------
| Frontend Stories Routes
|--------------------------------------------------------------------------
*/

Route::get('stories', 'Frontend\StoryController@index')->name('frontend.stories');
Route::get('stories/{alpha_id}', 'Frontend\StoryController@show')->name('frontend.stories.show');


/*
|--------------------------------------------------------------------------
| Frontend Search video/story dialogs box, getting current video, next & previous link
|--------------------------------------------------------------------------
*/

Route::post('search/stories/{alpha_id?}', 'SearchController@stories');


/*
|--------------------------------------------------------------------------
| Collection Routes
|--------------------------------------------------------------------------
*/
Route::post('client/collections/register_user/{collection_id}', 'CollectionController@registerUser')->name('client.register_user');
Route::post('client/collections', 'Api\v1\CollectionController@store')->name('client.store');
Route::post('client/collections/cancel_collection', 'CollectionController@cancelCollection')->name('client.cancel_collection');


Route::group(['middleware' => 'auth:api','prefix' => 'client'], function () {
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
