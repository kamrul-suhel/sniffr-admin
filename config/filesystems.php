<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => 'AKIAJLBUIX4YJQYGUWTQ',
            'secret' => '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',
            'region' => 'eu-west-1',
            'bucket' => 'vlp-storage',
        ],

        's3_mediamanager' => [
            'driver' => 's3',
            'key' => 'AKIAJLBUIX4YJQYGUWTQ',
            'secret' => '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',
            'region' => 'eu-west-1',
            'bucket' => 'vlp-storage-media',
        ],

        's3_sourcebucket' => [
            'driver' => 's3',
            'key' => 'AKIAJLBUIX4YJQYGUWTQ',
            'secret' => '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',
            'region' => 'us-east-1',
            'bucket' => 'et-video-service-dev-sourcebucket-1kwpqhvzjyxc5',
        ],

        'google' => [
            'driver' => 'google',
            'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
            'folderId' => env('GOOGLE_DRIVE_FOLDER_ID'),
        ],

        'google_mediamanager' => [
            'driver' => 'google',
            'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
            'folderId' => '1vIHaL0yga2XWnN-z722ifQDdkTEfoQkI',
        ],

    ],

];
