<?php

return [
    'img_url' => '/assets/images/',
    'uploads_url' => '/assets/images/admin/',
    'uploads_dir' => '/assets/images/frontend/',
    'media_upload_function' => 'ImageHandler::upload',
    'num_results_per_page' => 15,
    'downloads' => [
        'types' => [
            'regular',
            'watermark'
        ]
    ]
];
