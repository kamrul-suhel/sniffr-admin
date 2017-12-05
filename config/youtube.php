<?php

return [

    /**
     * Client ID UNILAD.
     */
    'client_id' => env('GOOGLE_CLIENT_ID', '197984425086-u2p9n4ojovlfaugj47ak8pjk33t59ppa.apps.googleusercontent.com'),

    /**
     * Client Secret.
     */
    'client_secret' => env('GOOGLE_CLIENT_SECRET', 'gYHNx-C0LeJO3j2NKpIR1jYm'),

    /**
     * Client ID Ian's.
     */
    'client_id' => env('GOOGLE_CLIENT_ID', '1093804339083-07h3fa92p78i46u4gepetiqbiuj9a4r2.apps.googleusercontent.com'),

    /**
     * Client Secret.
     */
    'client_secret' => env('GOOGLE_CLIENT_SECRET', 'a7forFUe-6CLbPdPDAaKCXB6'),

    /**
     * Scopes.
     */
    'scopes' => [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.readonly'
    ],

    /**
     * Route URI's
     */
    'routes' => [

        /** 
         * Determine if the Routes should be disabled.
         * Note: We recommend this to be set to "false" immediately after authentication.
         */
        'enabled' => false,

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
