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


Route::get('/settings_object', 'SettingController@index')->name('setting_object');
Route::post('search/videos/{alpha_id?}', 'SearchController@videos');
Route::get('videos', 'Frontend\VideoController@index')->name('frontend.videos');
Route::get('videos/{alpha_id}', 'Frontend\VideoController@show')->name('frontend.videos.show');
