<?php

return [
    'cache' => [
        'cache_enabled' => env('CACHE_ENABLED', false),
    ],
    'site' => [
        'website_name' => 'Sniffr',
        'website_description' => 'Sniffr\'s Online Video Licensing Platform',
        'logo' => 'logo-sniffr-white.png',
        'favicon' => '',
        'theme' => 'default',
        'facebook_page_id' => 'uniladmag',
        'twitter_page_id' => 'unilad',
        'youtube_page_id' => 'uniladtv',
        'videos_per_page' => 12,
    ],
    'keys' => [
        'system_email' => 'admin@admin.com',
        'demo_mode' => 0,
        'enable_https' => 0,
        'google_page_id' => NULL,
        'google_tracking_id' => 'UA-45819798-4',
        'google_oauth_key' => NULL,
        'created_at' => '0000-00-00 00:00:00',
        'updated_at' => '2018-02-01 16:33:14',
        'posts_per_page' => 12,
        'free_registration' => 0,
        'activation_email' => 0,
        'premium_upgrade' => 1,
    ],
    'payments' => [],
    'theme' => [],
];
