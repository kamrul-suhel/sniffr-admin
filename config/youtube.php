<?php

return [
    /**
     * Client ID Ian's.
     */
    //'client_id' => env('GOOGLE_CLIENT_ID', '1093804339083-07h3fa92p78i46u4gepetiqbiuj9a4r2.apps.googleusercontent.com'),

    /**
     * Client Secret.
     */
    //'client_secret' => env('GOOGLE_CLIENT_SECRET', 'a7forFUe-6CLbPdPDAaKCXB6'),

    /**
     * Client ID UNILAD.
     */
    'client_id' => env('GOOGLE_CLIENT_ID', '64989914309-i8remren8n9lb1ptiauhukiijvadl2ts.apps.googleusercontent.com'),

    /**
     * Client Secret.
     */
    'client_secret' => env('GOOGLE_CLIENT_SECRET', 'uG4yNqSAnuvEaOqciMkJmhGg'),

    'developer_key' => env('GOOGLE_DEVELOPER_KEY', 'AIzaSyATCrhO563JeXmXKoxgxPMkPeoxej5vYIg'),

    /**
     * Scopes.
     */
    'scopes' => [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtubepartner'
    ],

    /**
     * Route URI's
     */
    'routes' => [

        /**
         * Determine if the Routes should be disabled.
         * Note: We recommend this to be set to "false" immediately after authentication.
         */
        'enabled' => true,

        /**
         * The prefix for the below URI's
         */
        'prefix' => 'youtube',

        /**
         * Redirect URI
         */
        'redirect_uri' => 'callback',

        /**
         * The autentication URI
         */
        'authentication_uri' => 'auth',

        /**
         * The redirect back URI
         */
        'redirect_back_uri' => '/',

    ]

];
