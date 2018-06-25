<?php

return [
    'states' => [
        'unapproved',
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
        'edits-unassigned',
        'edits-inprogress',
        'edits-approved',
        'edits-rejected',
        'published'
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
