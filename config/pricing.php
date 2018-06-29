<?php

return [
    'type' => [
		1 => [
			'slug' => 'neutral',
			'name' => 'Neutral',
			'modifier' => 1
		],
    	2 => [
			'slug' => 'exclusive',
			'name' => 'Exclusive',
			'modifier' => 3
		],
		3 => [
			'slug' => 'non-exclusive',
			'name' => 'Non-Exclusive',
			'modifier' => 1
		]
    ],
    'platform' => [
		1 => [
			'slug' => 'neutral',
			'name' => 'Neutral',
			'modifier' => 1
		],
		2 => [
			'slug' => 'social-media',
			'name' => 'Social Media',
			'modifier' => 0.5
		],
		3 => [
			'slug' => 'website',
			'name' => 'Website',
			'modifier' => 0.5
		],
		4 => [
			'slug' => 'live-tv-broadcast',
			'name' => 'Live TV Broadcast',
			'modifier' => 1
		],
		5 => [
			'slug' => 'production-project',
			'name' => 'Production Project',
			'modifier' => 2
		]
    ],
	'tier' => [
		1 => [
			'slug' => 'neutral',
			'name' => 'Neutral',
			'modifier' => 1
		],
		2 => [
			'slug' => 'social-media-agency',
			'name' => 'Social Media Agency',
			'modifier' => 0.5
		],
		3 => [
			'slug' => 'online',
			'name' => 'Online',
			'modifier' => 0.75
		],
		4 => [
			'slug' => 'random',
			'name' => 'Neutral',
			'modifier' => 0.75
		],
		5 => [
			'slug' => 'production',
			'name' => 'TV Production',
			'modifier' => 1
		],
		6 => [
			'slug' => 'publisher',
			'name' => 'Publisher',
			'modifier' => 1
		],
		7 => [
			'slug' => 'well-known',
			'name' => 'Well Known',
			'modifier' => 2
		]
	],
	'length' => [
		1 => [
			'slug' => 'neutral',
			'name' => 'Neutral',
			'modifier' => 1
		],
		2 => [
			'slug' => '1-4',
			'name' => '1 - 4 years',
			'modifier' => 1
		],
		3 => [
			'slug' => '5+',
			'name' => '5+ years',
			'modifier' => 1.25
		],
		3 => [
			'slug' => 'perpetuity',
			'name' => 'In Perpituity',
			'modifier' => 1.75
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
