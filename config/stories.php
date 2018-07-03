<?php

return [
    'states' => [
        'unapproved' ,
        'approved',
        'rejected',
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
                'dropdown' => 'Approved',
                'value' => 'approved',
            ],
            'rejected' => [
                'dropdown' => 'Rejected',
                'value' => 'rejected',
            ],
		],
        'licensing' => [
            'approved' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'approved',
            ],
            'licensing' => [
                'dropdown' => 'In Progress',
                'value' => 'licensing',
            ],
            'licensed' => [
                'dropdown' => 'Licensed',
                'value' => 'licensed',
            ],
            'unlicensed' => [
                'dropdown' => 'Unlicensable',
                'value' => 'unlicensed',
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
            'subs-approved' => [
                'dropdown' => 'Ready for Publishing',
                'value' => 'subs-approved',
            ],
            'subs-unassigned' => [
                'dropdown' => 'In Purgatory',
                'value' => 'subs-unassigned',
            ],
		],
        'ready-to-publish' => [
            'published' => [
                'dropdown' => 'Published',
                'value' => 'published',
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

    'priorities' => [
        'high',
        'medium',
        'low',
    ],

    'destinations' => [
        'for-sale',
        'for-page',
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
