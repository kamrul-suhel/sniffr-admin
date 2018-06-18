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