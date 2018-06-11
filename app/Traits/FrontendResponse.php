<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

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
            'terms',
            'licensed_at'
        ];

        return $fields;
    }


    private function paginate($items, $perPage = 15, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}