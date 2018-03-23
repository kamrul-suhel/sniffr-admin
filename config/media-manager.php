<?php
/**
 * Created by PhpStorm.
 * User: Fabian
 * Date: 29.05.17
 * Time: 16:50.
 */

return [

    'routes' => [
        'middleware' => [],
        'prefix'     => env('MEDIA_MANAGER_ROUTE_PREFIX', '/admin/'),
    ],

    'disk'   => env('MEDIA_MANAGER_STORAGE_DISK', 's3_mediamanager'),
    'access' => env('MEDIA_MANAGER_ACCESS', 'public'),
];
