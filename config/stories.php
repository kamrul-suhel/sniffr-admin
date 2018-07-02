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

    'decision_states' => [
		'content-sourced' => [
			'unapproved' => '',
            'approved' => '',
		],
        'licensing-in-progress' => [
            'approved',
            'unlicensed',
			'licensing',
            'licensed',
		],
        'writing-in-progress' => [
            'licensed',
            'hacks-unassigned',
			'writing-inprogress',
            'writing-completed',
		],
        'subbing-in-progress' => [
            'writing-completed',
            'subs-unassigned',
            'subs-inprogress',
            'subs-approved',
            'subs-rejected',
		],
        'ready-to-publish' => [
			'published',
		],
        'archived' => [
			'rejected',
		],
    ],

    'decisions' => [
		'content-sourced' => [
			'unapproved',
            'approved',
            'rejected',
		],
        'licensing-in-progress' => [
            'approved',
            'unlicensed',
			'licensing',
            'licensed',
		],
        'writing-in-progress' => [
            'licensed',
            'hacks-unassigned',
			'writing-inprogress',
            'writing-completed',
		],
        'subbing-in-progress' => [
            'writing-completed',
            'subs-unassigned',
            'subs-inprogress',
            'subs-approved',
            'subs-rejected',
            // 'edits-unassigned',
            // 'edits-inprogress',
            // 'edits-approved',
            // 'edits-rejected',
		],
        'ready-to-publish' => [
			'published',
		],
    ],

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
