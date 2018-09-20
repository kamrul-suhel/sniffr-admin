<?php

return [
	'states' => [
		'new',
		'accepted',
		'rejected',
		'inprogress',
		'pending',
		'licensed',
		'restricted',
		'problem',
		'noresponse'
	],
	'states_with_names' => [
		'nostate' => 'no state',
		'new' => 'new',
		'accepted' => 'accepted',
		'rejected' => 'rejected',
		'inprogress' => 'in progress',
		'pending' => 'pending',
		'licensed' => 'licensed',
		'restricted' => 'restricted',
		'problem' => 'problem',
		'noresponse' => 'no response'
	],

	'colors' => [
		'new' => 'default',
		'accepted' => 'default',
		'rejected' => 'danger',
		'inprogress' => 'default',
		'pending' => 'default',
		'licensed' => 'success',
		'restricted' => 'warning',
		'problem' => 'danger',
		'noresponse' => 'default',
	],
	'icons' => [
		'accepted' => 'fa fa-clock-o',
		'rejected' => 'fa fa-times',
		'problem' => 'fa fa-exclamation',
		'licensed' => 'fa fa-check',
		'restricted' => 'fa fa-exclamation-triangle'
	]
];