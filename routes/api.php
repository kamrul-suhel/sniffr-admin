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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('settings_object', 'SettingController@index')->name('setting_object');
Route::post('search/videos/{alpha_id?}', 'SearchController@videos');
Route::get('videos', 'Frontend\VideoController@index')->name('frontend.videos');
Route::get('videos/{alpha_id}', 'Frontend\VideoController@show')->name('frontend.videos.show');

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
Route::post('client/collections', 'CollectionController@store')->name('client.store');
Route::post('client/collections/cancel_collection', 'CollectionController@cancelCollection')->name('client.cancel_collection');
