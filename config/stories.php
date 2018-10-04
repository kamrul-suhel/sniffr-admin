<?php

return [
	'states' => [
		'unapproved',
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
				'dropdown' => 'Approved',
				'value' => 'approved', // dropdown value
				'positive_label' => 'Approved',
				'negative_label' => 'Unapproved',
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
			'approved' => [
				'dropdown' => 'Awaiting Contact',
				'value' => 'approved',
				'positive_label' => 'Made Contact',
				'negative_label' => 'Purgatory',
				'positive_class' => 'text-success js-story-state licensing',
				'negative_class' => 'text-danger js-story-state purgatory',
			],
			'licensing' => [
				'dropdown' => 'In Progress',
				'value' => 'licensing',
				'positive_label' => 'Edit',
				'negative_label' => 'Back to Sourced',
				'positive_class' => 'text-success',
				'negative_class' => 'text-danger js-story-state approved',
			],
			'purgatory' => [
				'dropdown' => 'Purgatory',
				'value' => 'purgatory',
				'positive_label' => 'Back to Pickup',
				'negative_label' => 'Rejected',
				'positive_class' => 'text-success js-story-state approved',
				'negative_class' => 'js-story-state unapproved',
			],
		],
		'writing' => [
			'licensed' => [
				'dropdown' => 'Ready for Pickup',
				'value' => 'licensed',
				'positive_label' => 'Write',
				'negative_label' => 'Unlicensed',
				'positive_class' => 'text-success js-story-state writing-inprogress',
				'negative_class' => 'text-danger js-story-state approved',
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
		'all' => [
			'all' => [
				'dropdown' => 'All',
				'value' => 'all',
				'positive_label' => 'All',
				'negative_label' => '',
				'positive_class' => '',
				'negative_class' => '',
			]
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

	'bump_type' => [
		'default' => [
			'name' => 'News/Serious',
			'twitter' => [
				0 => [
					'dm' => 'Hello, hope you are well. [user] here from UNILAD.  We would be interested in chatting to you about your recent tweet for a potential article for our website. Would you be interested in talking to us? Please let me know.',
					'message' => 'Hey [twitter_handle]! [user] here from UNILAD! We would like to chat to you about your recent tweet for a potential article. Please DM me or email me stories@unilad.co.uk. Your story reference number is: [story_id]'
				],
				1 => [
					'dm' => 'Hey! Would be great to chat. Do you have some time today? [user]',
					'message' => 'Hi [twitter_handle]! Would be great to chat. Do you have some time today? [user]'
				],
				2 => [
					'dm' => 'Hello, did you get my previous message?',
					'message' => 'Hello [twitter_handle]! Could you DM me, your story reference number is: [story_id]'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi there! How are you? Im a journalist from UNILAD and would be interested to talk to you about your reddit post for an article. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages?'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi! Im a journalist from UNILAD, would you be interested to talk about your imgur post for an article? To reply email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? To reply email stories@unilad.co.uk'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD. Did you get my previous messages?'
				]
			]
		],
		'video' => [
			'name' => 'Video',
			'twitter' => [
				0 => [
					'dm' => 'Hello, hope you are well. [user] here from UNILAD.  We would be interested in chatting to you about your recent tweet for a potential article for our website. Would you be interested in talking to us? Please let me know :)',
					'message' => 'Hey [twitter_handle]! [user] here from UNILAD! We would love to chat to you about your video. Please DM me or email me stories@unilad.co.uk. Your story reference number is: [story_id]'
				],
				1 => [
					'dm' => 'Hey! Would be great to chat. Do you have some time today? [user]',
					'message' => 'Hi [twitter_handle]! Would be great to chat. Do you have some time today? [user]'
				],
				2 => [
					'dm' => 'Hello, did you get my previous message? :)',
					'message' => 'Hello [twitter_handle]! Could you DM me :) Your story reference number is: [story_id]'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi there! How are you? Im a journalist from UNILAD and would be interested to talk to you about your reddit post for an article. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi! Im a journalist from UNILAD, would you be interested to talk about your imgur post for an article? To reply email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? To reply email stories@unilad.co.uk'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			]
		],
		'photo' => [
			'name' => 'Photo',
			'twitter' => [
				0 => [
					'dm' => 'Hey! Hope you are okay? [user] here from UNILAD. We would love to chat to you about your recent photo for a potential article for our website. Would you be interested in chatting to us? Please let me know :)',
					'message' => 'Hey [twitter_handle]! [user] here from UNILAD! We would love to chat to you about your recent photo. Please DM me or email me stories@unilad.co.uk. Your story reference number is: [story_id]'
				],
				1 => [
					'dm' => 'Hi! Would be great to chat. Do you have some time today? [user]',
					'message' => 'Hi [twitter_handle]! Would be great to chat. Do you have some time today? [user]'
				],
				2 => [
					'dm' => 'Hello, did you get my previous message? :)',
					'message' => 'Hello [twitter_handle]! Could you DM me :) Your story reference number is: [story_id]'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi there! How are you? Im a journalist from UNILAD and would be interested to talk to you about your reddit post for an article. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi! Im a journalist from UNILAD, would you be interested to talk about your imgur post for an article? To reply email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? To reply email stories@unilad.co.uk'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			]
		],
		'funny' => [
			'name' => 'Funny',
			'twitter' => [
				0 => [
					'dm' => 'Hey! How are you? [user] here from UNILAD. We would love to chat to you about your hilarious tweet for a potential article for our website - it really made us laugh. Would you be interested in chatting to us? Please let me know :)',
					'message' => 'Hey [twitter_handle]! [user] here from UNILAD! We would love to chat to you about your hilarious tweet. Please DM me or email me stories@unilad.co.uk. Your story reference number is: [story_id]'
				],
				1 => [
					'dm' => 'Hi! Would be great to chat. Do you have some time today? [user]',
					'message' => 'Hi [twitter_handle]! Would be great to chat. Do you have some time today? [user]'
				],
				2 => [
					'dm' => 'Hello, did you get my previous message? :)',
					'message' => 'Hey [twitter_handle]! Could you DM me :) Your story reference number is: [story_id]'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi there! How are you? [user] here from UNILAD and would be interested to talk to you about your hilarious reddit post for a potential article for our website - it really made us laugh. Would you be interested in chatting to us? Please reply on here or email stories@unilad.co.uk [user]'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi! Im a journalist from UNILAD, would you be interested to talk about your imgur post for an article? To reply email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? To reply email stories@unilad.co.uk'
				],
				2 => [
					'message' => 'Hey, It’s [user] from UNILAD! Did you get my previous messages? :)'
				]
			]
		],
		'sensitive' => [
			'name' => 'Sensitive',
			'twitter' => [
				0 => [
					'dm' => 'Hello, hope you are well. [user] here from UNILAD.  We would be interested in chatting to you about your recent tweet for a potential article for our website - it was really touching. Would you be interested in talking to us? Please let me know :)',
					'message' => 'Hey [twitter_handle]! [user] here from UNILAD! We would like to chat to you about your touching tweet for a potential article. Please DM me or email me stories@unilad.co.uk. Your story reference number is: [story_id]'
				],
				1 => [
					'dm' => 'Hey! Would you have some time to talk to me? [user]',
					'message' => 'Hi [twitter_handle]! Would you have some time to talk to me? [user]'
				],
				2 => [
					'dm' => 'Hi, Did you see my previous messages?',
					'message' => 'Hi [twitter_handle]! Did you see my previous messages? Your story reference number is [story_id]'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi there! How are you? Im a journalist from UNILAD and would be interested to talk to you about your recent post for a potential article for our website - it was really touching. Do you have some time to talk to me? Please reply on here or email stories@unilad.co.uk [user]'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? Please reply on here or email stories@unilad.co.uk, [user]'
				],
				2 => [
					'message' => 'Hi, It’s [user] from UNILAD! Did you see my previous messages?'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi! Im a journalist from UNILAD, would you be interested to talk about your imgur post for an article? To reply email stories@unilad.co.uk'
				],
				1 => [
					'message' => 'Hello again! Would you have some time to talk to me? To reply email stories@unilad.co.uk'
				],
				2 => [
					'message' => 'Hi, It’s [user] from UNILAD! Did you see my previous messages?'
				]
			]
		],
		'pre_contract' => [
			'name' => 'Pre Contract',
			'twitter' => [
				0 => [
					'dm' => 'Hi There, we didn\'t hear back from you, just wondering if you had chance to take a look at what I sent you! Thanks.',
					'message' => 'Hi [twitter_handle], we didn\'t hear back from you, just wondering if you had chance to take a look at what I sent you! Thanks.'
				],
				1 => [
					'dm' => 'Hey, Just wondered if you would still interested in working with us on the story? Thanks! ',
					'message' => 'Hey [twitter_handle], Just wondered if you would still interested in working with us on the story? Thanks!'
				],
				2 => [
					'dm' => 'Hey! Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks',
					'message' => 'Hey [twitter_handle]! Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks'
				]
			],
			'reddit' => [
				0 => [
					'message' => 'Hi There, we didn\'t hear back from you, just wondering if you had chance to take a look at what I sent you! Thanks. '
				],
				1 => [
					'message' => 'Hey, Just wondered if you would still interested in working with us on the story? Thanks! '
				],
				2 => [
					'message' => 'Hey! Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks'
				]
			],
			'imgur' => [
				0 => [
					'message' => 'Hi There, we didn\'t hear back from you, just wondering if you had chance to take a look at what I sent you! Thanks. '
				],
				1 => [
					'message' => 'Hey, Just wondered if you would still interested in working with us on the story? Thanks! '
				],
				2 => [
					'message' => 'Hey! Just checking if your still up for working ith us on the article? Did you get my previous messages. Thanks'
				]
			]
		]
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
