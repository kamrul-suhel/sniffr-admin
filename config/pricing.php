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
	'class' => [
		1 => [
			'slug' => 'neutral',
			'name' => 'Neutral',
			'modifier' => 1
		],
		2 => [
			'slug' => 'random',
			'name' => 'Random',
			'modifier' => 0.25
		],
		3 => [
			'slug' => 'story',
			'name' => 'Story Video',
			'modifier' => 0.5
		],
		4 => [
			'slug' => 'nuker',
			'name' => 'Nuker',
			'modifier' => 1
		],
		5 => [
			'slug' => 'big-vid',
			'name' => 'Big Vid',
			'modifier' => 7
		],
		6 => [
			'slug' => 'exceptional',
			'name' => 'Exceptional',
			'modifier' => 0
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
];