<?php

return [
    'uploads_url' => '/assets/admin/images/',
    'uploads_dir' => '/assets/admin/images/',
    'media_upload_function' => 'ImageHandler::upload',
    'num_results_per_page' => 15,
    'downloads' => [
        'types' => [
            'regular',
            'watermark'
        ]
    ]
];
