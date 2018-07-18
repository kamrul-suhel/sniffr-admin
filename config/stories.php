<?php

return [
    'states' => [
        'unapproved' ,
        // 'approved',
        'rejected',
        'contacted',
        'unlicensed',
        'licensing',
        'licensed',
        'hacks-unassigned',
        'writing-inprogress',
        'writing-completed',
        'subs-unassigned',
        'subs-inprogress',
        'subs-approved',
        'subs-rejected',
        // 'edits-unassigned',
        // 'edits-inprogress',
        // 'edits-approved',
        // 'edits-rejected',
        'published'
    ],

    'decisions' => [
		'content-sourced' => [
			'unapproved' => [
                'dropdown' => 'Unapproved', // dropdown name
                'value' => 'unapproved', // dropdown value
            ],
            'approved' => [
                'dropdown' => 'Awaiting Contact',
                'value' => 'approved',
            ],
            'unlicensed' => [
                'dropdown' => 'Approved',
                'value' => 'unlicensed',
            ],
            'rejected' => [
                'dropdown' => 'Rejected',
                'value' => 'rejected',
            ],
		],
        'licensing' => [
            'unlicensed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'unlicensed',
            ],
            'licensing' => [
                'dropdown' => 'In Progress',
                'value' => 'licensing',
            ],
            'licensed' => [
                'dropdown' => 'Licensed',
                'value' => 'licensed',
            ],
		],
        'writing' => [
            'licensed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'licensed',
            ],
            'writing-inprogress' => [
                'dropdown' => 'In Progress',
                'value' => 'writing-inprogress',
            ],
            'subs-rejected' => [
                'dropdown' => 'In Purgatory',
                'value' => 'subs-rejected',
            ],
		],
        'subbing' => [
            'writing-completed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'writing-completed',
            ],
            'subs-inprogress' => [
                'dropdown' => 'In Progress',
                'value' => 'subs-inprogress',
            ],
            'subs-unassigned' => [
                'dropdown' => 'In Purgatory',
                'value' => 'subs-unassigned',
            ],
		],
        'ready-to-publish' => [
            'subs-approved' => [
                'dropdown' => 'Ready for Publishing',
                'value' => 'subs-approved',
            ],
            'published' => [
                'dropdown' => 'Published',
                'value' => 'published',
            ],
            'hacks-unassigned' => [
                'dropdown' => 'Archived',
                'value' => 'hacks-unassigned',
            ],
		],
    ],

    // 'decisions' => [
	// 	'content-sourced' => [
	// 		'unapproved',
    //         'approved',
    //         'rejected',
	// 	],
    //     'licensing-in-progress' => [
    //         'approved',
    //         'unlicensed',
	// 		'licensing',
    //         'licensed',
	// 	],
    //     'writing-in-progress' => [
    //         'licensed',
    //         'hacks-unassigned',
	// 		'writing-inprogress',
    //         'writing-completed',
	// 	],
    //     'subbing-in-progress' => [
    //         'writing-completed',
    //         'subs-unassigned',
    //         'subs-inprogress',
    //         'subs-approved',
    //         'subs-rejected',
	// 	],
    //     'ready-to-publish' => [
	// 		'published',
	// 	],
    // ],

    'story_type' => [
        'new',
        'skeleton',
    ],

    'priorities' => [
        'high',
        'medium',
        'low',
    ],

    'destinations' => [
        'for-sale',
        'for-page',
        'for-both',
    ],

    'removed_from_social' => [
        '7-days',
        '6-days',
        '5-days',
        '4-days',
        '3-days',
        '2-days',
        '1-day',
        'none',
    ],

    'problem_status' => [
        'dead-link',
        'prior-exclusive-license',
        'contact-is-not-owner',
        'minor-in-video',
    ],

    'submitted_to' => [
        'UNILAD',
        'lad-bible',
        'storyful',
        'jukin',
        'newsflare',
        'viral-hog',
        'viral-thread',
        'viral-flare',
        'blunt-kommunity',
        'buzzfeed',
        'tasty',
        'other',
    ],

    'rights' => [
        'exclusive',
        'non-exclusive',
    ],

    'rights_type' => [
        'content',
        'editorial',
        'distribution-rights',
    ],

    'colors' => [
        'unapproved' => 'default',
        'approved' => 'default',
        'rejected' => 'default',
        'unlicensed' => 'default',
        'licensing' => 'default',
        'licensed' => 'default',
        'hacks-unassigned' => 'default',
        'writing-inprogress' => 'default',
        'writing-completed' => 'success',
        'subs-unassigned' => 'default',
        'subs-inprogress' => 'default',
        'subs-approved' => 'success',
        'subs-rejected' => 'default',
        'edits-unassigned' => 'default',
        'edits-inprogress' => 'default',
        'edits-approved' => 'default',
        'edits-rejected' => 'default',
        'published' => 'success',
    ],

    'icons' => [
        'accepted' => 'fa fa-clock-o',
        'rejected' => 'fa fa-times',
        'problem' => 'fa fa-exclamation',
        'licensed' => 'fa fa-check',
        'restricted' => 'fa fa-exclamation-triangle'
    ]
];
