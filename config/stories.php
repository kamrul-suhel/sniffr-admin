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
        // 'hacks-unassigned',
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
        'published',
        'archive',
    ],

    'decisions' => [
		'content-sourced' => [
			'unapproved' => [
                'dropdown' => 'Unapproved', // dropdown name
                'value' => 'unapproved', // dropdown value
                'positive_label' => 'Approve', // positive button value e.g. Accept
                'negative_label' => 'Reject', // class for the positive button
                'positive_class' => 'text-success js-story-state approved', // negative button value e.g. Decline
                'negative_class' => 'text-danger js-story-state rejected', // class for the negative button
            ],
            'approved' => [
                'dropdown' => 'Awaiting Contact',
                'value' => 'approved',
                'positive_label' => 'Made Contact',
                'negative_label' => 'Unapprove',
                'positive_class' => 'text-success js-story-state unlicensed',
                'negative_class' => 'text-danger js-story-state unapproved',
            ],
            'unlicensed' => [
                'dropdown' => 'Approved',
                'value' => 'unlicensed',
                'positive_label' => 'Made Contact',
                'negative_label' => 'Unapprove',
                'positive_class' => '',
                'negative_class' => 'text-danger js-story-state unapproved',
            ],
            'rejected' => [
                'dropdown' => 'Rejected',
                'value' => 'rejected',
                'positive_label' => 'Rejected',
                'negative_label' => '',
                'positive_class' => 'js-story-state unapproved',
                'negative_class' => '',
            ],
		],
        'licensing' => [
            'unlicensed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'unlicensed',
                'positive_label' => 'License Story',
                'negative_label' => 'Unapprove',
                'positive_class' => 'text-success js-story-state licensing',
                'negative_class' => 'text-danger js-story-state unapproved',
            ],
            'licensing' => [
                'dropdown' => 'In Progress',
                'value' => 'licensing',
                'positive_label' => 'Edit License',
                'negative_label' => 'Back to Sourced',
                'positive_class' => 'text-success',
                'negative_class' => 'text-danger js-story-state unlicensed',
            ],
            'licensed' => [
                'dropdown' => 'Licensed',
                'value' => 'licensed',
                'positive_label' => 'Licensed',
                'negative_label' => 'Unlicensed',
                'positive_class' => '',
                'negative_class' => 'text-danger js-story-state unlicensed',
            ],
		],
        'writing' => [
            'licensed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'licensed',
                'positive_label' => 'Write',
                'negative_label' => 'Unlicensed',
                'positive_class' => 'text-success js-story-state writing-inprogress',
                'negative_class' => 'text-danger js-story-state unlicensed',
            ],
            'writing-inprogress' => [
                'dropdown' => 'In Progress',
                'value' => 'writing-inprogress',
                'positive_label' => 'Submit to Sub',
                'negative_label' => '',
                'positive_class' => 'text-success js-story-state writing-completed',
                'negative_class' => '',
            ],
            'subs-rejected' => [
                'dropdown' => 'In Purgatory',
                'value' => 'subs-rejected',
                'positive_label' => 'Write',
                'negative_label' => '',
                'positive_class' => 'text-success js-story-state writing-inprogress',
                'negative_class' => '',
            ],
		],
        'subbing' => [
            'writing-completed' => [
                'dropdown' => 'Ready for Pickup',
                'value' => 'writing-completed',
                'positive_label' => 'Sub Story',
                'negative_label' => 'Back to Writing',
                'positive_class' => 'text-success js-story-state subs-inprogress',
                'negative_class' => 'text-danger js-story-state writing-inprogress',
            ],
            'subs-inprogress' => [
                'dropdown' => 'In Progress',
                'value' => 'subs-inprogress',
                'positive_label' => 'Story Ready',
                'negative_label' => 'Back to Subs',
                'positive_class' => 'text-success js-story-state subs-approved',
                'negative_class' => 'text-danger js-story-state subs-unassigned',
            ],
            'subs-unassigned' => [
                'dropdown' => 'In Purgatory',
                'value' => 'subs-unassigned',
                'positive_label' => 'Sub Story',
                'negative_label' => 'Back to Writing',
                'positive_class' => 'text-success js-story-state subs-inprogress',
                'negative_class' => 'text-danger js-story-state writing-inprogress',
            ],
		],
        'ready-to-publish' => [
            'subs-approved' => [
                'dropdown' => 'Ready for Publishing',
                'value' => 'subs-approved',
                'positive_label' => 'Ready to Publish',
                'negative_label' => '',
                'positive_class' => 'text-success js-story-state published',
                'negative_class' => '',
            ],
            'published' => [
                'dropdown' => 'Published',
                'value' => 'published',
                'positive_label' => 'Story in WP',
                'negative_label' => 'Back to Subbing',
                'positive_class' => '',
                'negative_class' => 'text-danger js-story-state subs-inprogress',
            ],
            'archive' => [
                'dropdown' => 'Archived',
                'value' => 'archive',
                'positive_label' => 'Archived',
                'negative_label' => '',
                'positive_class' => 'js-story-state unapproved',
                'negative_class' => '',
            ],
		],
    ],

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
        'archive' => 'default',
    ],

    'icons' => [
        'accepted' => 'fa fa-clock-o',
        'rejected' => 'fa fa-times',
        'problem' => 'fa fa-exclamation',
        'licensed' => 'fa fa-check',
        'restricted' => 'fa fa-exclamation-triangle'
    ]
];
