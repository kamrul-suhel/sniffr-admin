<?php

namespace App\Traits;

trait FrontendResponse
{
    protected function successResponse($data = array())
    {
        $data['success'] = '1';
        return response()->json($data);
    }

    protected function errorResponse($message)
    {
        return response()->json(['error' => 'true', 'error_message' => $message]);
    }

    protected function getVideoFieldsForFrontend()
    {
        $fields = [
            'id',
            'alpha_id',
            'state',
            'user_id',
            'contact_id',
            'title',
            'active',
            'image',
            'thumb',
            'mime',
            'file',
            'file_watermark',
            'file_watermark_dirty',
            'link',
            'vertical',
            'youtube_id',
            'embed_code',
            'duration',
            'description',
            'date_filmed',
            'more_details',
            'location',
            'source',
            'contact_is_owner',
            'submitted_elsewhere',
            'submitted_where',
            'allow_publish',
            'filmed_by_me',
            'permission',
            'is_exclusive',
            'terms'
        ];

        return $fields;
    }
}