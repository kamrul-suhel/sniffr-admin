<?php

namespace App\Http\Controllers\Api\v1\Traits;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

trait FrontendResponse
{
    protected function successResponse($data = array())
    {
        $data['success'] = '1';
        return response()->json($data);
    }

    protected function errorResponse($message, $code = 200)
    {
        return response()->json(['error' => 'true', 'error_message' => $message], $code);
    }

    protected function getVideoFieldsForFrontend()
    {
        return [
            'id',
            'alpha_id',
            'state',
			'class',
			'credit',
            'url',
            'user_id',
            'featured',
            'file_watermark_dirty',
            'contact_id',
            'title',
            'active',
            'image',
            'thumb',
            'mime',
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
            'views',
            'licensed_at',
			'created_at',
			'deleted_at'
        ];

    }

    protected function getAssetStoryFieldsForFrontend(){
        return [
            'id',
            'alpha_id',
            'state',
            'user_id',
            'contact_id',
            'title',
            'author',
            'excerpt',
            'description',
            'thumb',
            'date_ingested',
            'url',
            'status',
            'active',
            'flagged',
            'source',
            'licensed_at',
            'created_at',
            'updated_at',
			'deleted_at'
        ];
    }


    public function paginate($items, $perPage = 15, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function getFrontendServerResponse(Request $request){
    	return view('frontend.master');
	}

}
