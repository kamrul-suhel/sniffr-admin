<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

	'slack' => [
		'channels' => [
			'contracts' => 'https://hooks.slack.com/services/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', // sniffr-contracts
			'quotes' => 'https://hooks.slack.com/services/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', // sniffr-quotes
			'submissions' => 'https://hooks.slack.com/services/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', // sniffr-submissions
			'alerts' => 'https://hooks.slack.com/services/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' // sniffr-bot
		]
	]

];
