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
        'unapproved' => 'default',
        'accepted' => 'default',
        'rejected' => 'danger',
        'unlicensed' => 'warning',
        'licensing' => 'warning',
        'licensed' => 'success',
        'hacks-unassigned' => 'default',
        'writing-inprogress' => 'warning',
        'writing-completed' => 'success',
        'subs-unassigned' => 'default',
        'subs-inprogress' => 'warning',
        'subs-approved' => 'success',
        'subs-rejected' => 'danger',
        'edits-unassigned' => 'default',
        'edits-inprogress' => 'warning',
        'edits-approved' => 'success',
        'edits-rejected' => 'danger',
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
