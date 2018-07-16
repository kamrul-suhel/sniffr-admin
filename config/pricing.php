<?php

return [
	'base' => 300,
    'type' => [
    	'exclusive' => [
			'slug' => 'exclusive',
			'name' => 'Exclusive',
			'modifier' => 3
		],
		'non-exclusive' => [
			'slug' => 'non-exclusive',
			'name' => 'Non-Exclusive',
			'modifier' => 1
		]
    ],
    'platform' => [
		'social-media' => [
			'slug' => 'social-media',
			'name' => 'Social Media',
			'modifier' => 0.5
		],
		'live-tv-broadcast' => [
			'slug' => 'live-tv-broadcast',
			'name' => 'Live TV Broadcast',
			'modifier' => 1
		],
		'production-project' => [
			'slug' => 'production-project',
			'name' => 'Production Project',
			'modifier' => 2
		]
    ],
	'tier' => [
		'social-media-agency' => [
			'slug' => 'social-media-agency',
			'name' => 'Social Media Agency',
			'modifier' => 0.5
		],
		'online' => [
			'slug' => 'online',
			'name' => 'Online',
			'modifier' => 0.75
		],
		'random' => [
			'slug' => 'random',
			'name' => 'Neutral',
			'modifier' => 0.75
		],
		'production' => [
			'slug' => 'production',
			'name' => 'TV Production',
			'modifier' => 1
		],
		'publisher' => [
			'slug' => 'publisher',
			'name' => 'Publisher',
			'modifier' => 1
		],
		'well-known' => [
			'slug' => 'well-known',
			'name' => 'Well Known',
			'modifier' => 2
		]
	],
	'class' => [
		'random' => [
			'slug' => 'random',
			'name' => 'Random',
			'modifier' => 0.25
		],
		'story' => [
			'slug' => 'story',
			'name' => 'Story Video',
			'modifier' => 0.5
		],
		'nuker' => [
			'slug' => 'nuker',
			'name' => 'Nuker',
			'modifier' => 1
		],
		'big-vid' => [
			'slug' => 'big-vid',
			'name' => 'Big Vid',
			'modifier' => 7
		],
		'exceptional' => [
			'slug' => 'exceptional',
			'name' => 'Exceptional',
			'modifier' => 0
		]
	],
	'region' => [
		'eastern-europe' => [
			'slug' => 'eastern-europe',
			'name' => 'Eastern Europe',
			'modifier' => 1.25
		],
		'africa' => [
			'slug' => 'africa',
			'name' => 'Africa',
			'modifier' => 1.25
		],
		'middle-east-east' => [
			'slug' => 'middle-east-east',
			'name' => 'Middle East (East)',
			'modifier' => 1.25
		],
		'asia' => [
			'slug' => 'asia',
			'name' => 'Asia',
			'modifier' => 1.5
		],
		'south-america' => [
			'slug' => 'south-america',
			'name' => 'South America',
			'modifier' => 1.5
		],
		'south-africa' => [
			'slug' => 'south-africa',
			'name' => 'South Africa',
			'modifier' => 1.75
		],
		'middle-east-west' => [
			'slug' => 'middle-east-west',
			'name' => 'Middle East (West)',
			'modifier' => 1.75
		],
		'oceania' => [
			'slug' => 'oceania',
			'name' => 'Oceania',
			'modifier' => 2
		],
		'western-europe' => [
			'slug' => 'western-europe',
			'name' => 'Western Europe',
			'modifier' => 2
		],
		'russia' => [
			'slug' => 'russia',
			'name' => 'Russia',
			'modifier' => 2
		],
		'japan' => [
			'slug' => 'japan',
			'name' => 'Japan',
			'modifier' => 2
		],
		'china' => [
			'slug' => 'china',
			'name' => 'China',
			'modifier' => 2
		],
		'singapore' => [
			'slug' => 'singapore',
			'name' => 'Singapore',
			'modifier' => 2
		],
		'latin-america' => [
			'slug' => 'latin-america',
			'name' => 'Latin America',
			'modifier' => 2
		],
		'north-america' => [
			'slug' => 'north-america',
			'name' => 'North America',
			'modifier' => 2
		]
	],
	'length' => [
		'day' => [
			'slug' => 'day',
			'name' => '24 hours',
			'modifier' => 1,
            'end_date' => \Carbon\Carbon::now()->addDay(1)
		],
		'week' => [
			'slug' => 'week',
			'name' => '1 week',
			'modifier' => 1.1,
            'end_date' => \Carbon\Carbon::now()->addDays(7)
		],
		'month' => [
			'slug' => 'month',
			'name' => '1 month',
			'modifier' => 1.2,
            'end_date' => \Carbon\Carbon::now()->addMonth(1)
		],
		'six_months' => [
			'slug' => '6 months',
			'name' => '1 - 4 years',
			'modifier' => 1.3,
            'end_date' => \Carbon\Carbon::now()->addMonths(6)
		],
		'year' => [
			'slug' => 'year',
			'name' => '1 year',
			'modifier' => 1.4,
            'end_date' => \Carbon\Carbon::now()->addYear(1)
		],
		'five_years' => [
			'slug' => 'five_years',
			'name' => '1 - 5 years',
			'modifier' => 1.6,
            'end_date' => \Carbon\Carbon::now()->addYears(5)
		],
		'ten_years' => [
			'slug' => 'ten_years',
			'name' => '5 - 10 years',
			'modifier' => 1.7,
            'end_date' => \Carbon\Carbon::now()->addYears(10)
		],
		'perpetuity' => [
			'slug' => 'perpetuity',
			'name' => 'In Perpituity',
			'modifier' => 1.75,
		]
	],
    'location' => [
        'eastern-europe' => [
            'slug' => 'eastern-europe',
            'name' => 'Eastern Europe',
            'modifier' => 1.25
        ],
        'africa' => [
            'slug' => 'africa',
            'name' => 'Africa',
            'modifier' => 1.25
        ],
        'middle-east-east' => [
            'slug' => 'middle-east-east',
            'name' => 'Middle East (East)',
            'modifier' => 1.25
        ],
        'asia' => [
            'slug' => 'asia',
            'name' => 'Asia',
            'modifier' => 1.5
        ],
        'south-america' => [
            'slug' => 'south-america',
            'name' => 'South America',
            'modifier' => 1.5
        ],
        'south-africa' => [
            'slug' => 'south-africa',
            'name' => 'South Africa',
            'modifier' => 1.75
        ],
        'middle-east-west' => [
            'slug' => 'middle-east-west',
            'name' => 'Middle East (West)',
            'modifier' => 1.75
        ],
        'oceania' => [
            'slug' => 'oceania',
            'name' => 'Oceania',
            'modifier' => 2
        ],
        'western-europe' => [
            'slug' => 'western-europe',
            'name' => 'Western Europe',
            'modifier' => 2
        ],
        'russia' => [
            'slug' => 'russia',
            'name' => 'Russia',
            'modifier' => 2
        ],
        'japan' => [
            'slug' => 'japan',
            'name' => 'Japan',
            'modifier' => 2
        ],
        'china' => [
            'slug' => 'china',
            'name' => 'China',
            'modifier' => 2
        ],
        'singapore' => [
            'slug' => 'singapore',
            'name' => 'Singapore',
            'modifier' => 2
        ],
        'america' => [
            'slug' => 'america',
            'name' => 'America',
            'modifier' => 2
        ]
    ],
];
