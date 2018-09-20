<?php
/**
 * Created by PhpStorm.
 * User: kamrulahmed
 * Date: 20/09/2018
 * Time: 11:33
 */

namespace App\Http\Controllers\Api\v1\Traits;


trait AssetVideoTrait
{
    public function getCurrentVideo($alpha_id)
    {
        $currentVideo = $this->video
            ->select($this->getVideoFieldsForFrontend())
            ->where('alpha_id', $alpha_id);

        if (auth()->check()) {
            $client_id = auth()->user()->client_id;
            $currentVideo = $currentVideo->with(['videoCollections' => function ($query) use ($client_id) {
                $query->select(['id', 'collection_id', 'video_id'])
                    ->where('status', 'purchased');
                $query->whereHas('collection', function ($query) use ($client_id) {
                    $query->where('client_id', $client_id);
                });
            }]);
        }

        $currentVideo = $currentVideo->with('tags')
            ->first();
        $currentVideo->iframe = $this->getVideoHtml($currentVideo, true);
        return $currentVideo;
    }

    public function sortVideoBy($sortBy){
        $sortArray = [];

        switch($sortBy){
            case 'newVideoLast':
                $sortArray[] = 'licensed_at';
                $sortArray[] = 'ASC';
                break;

            case 'newVideo':
                $sortArray[] = 'licensed_at';
                $sortArray[] = 'DESC';
                break;

            case 'videoMaxLength':
                $sortArray[] = 'duration';
                $sortArray[] = 'DESC';
                break;

            case 'videoMinLength':
                $sortArray[] = 'duration';
                $sortArray[] = 'ASC';
                break;

            default:
                $sortArray[] = 'licensed_at';
                $sortArray[] = 'DESC';
        }

        return $sortArray;
    }

    public function filterByMaxMinLength($videos, $request){
        if($request->has('maxLength') && $request->has('minLength')){
            $videos = $videos->whereBetween('duration', [$request->minLength, $request->maxLength]);
            return $videos;
        }

        if($request->has('minLength')){
            $videos = $videos->whereBetween('duration', [$request->minLength, 60*120]);
            return $videos;
        }

        if($request->has('maxLength')){
            $videos = $videos->whereBetween('duration', [0, $request->maxLength]);
            return $videos;
        }
        return $videos;
    }
}
