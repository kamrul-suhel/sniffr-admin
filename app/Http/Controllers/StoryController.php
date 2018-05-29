<?php

namespace App\Http\Controllers;

use App\Asset;
use App\Story;
use App\Video;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    /**
     * @param $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadStory($id)
    {
        $story = Story::find($id);
        if (!$story) {
            abort(404, 'Story Not Found');
        }

        $videos = Video::with('stories')->whereHas('stories', function ($query) use ($id) {
            $query->where('stories.id', '=', $id);
        })->get();

        $assets = Asset::with('stories')->whereHas('stories', function ($query) use ($id) {
            $query->where('stories.id', '=', $id);
        })->get();

        if ((!$assets->count()) && (!$videos->count())) {
            abort(404, 'No Assets Found in this Story');
        }

        $newZipFileName = 'public/zips/' . time() . '.zip';
        $prefix = 'sniffr_';
        $files = [];

        if ($assets->count()) {
            foreach ($assets as $asset) {
                $info = pathinfo($asset->url);
                $ext = $info['extension'];

                $tempImage = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
                copy($asset->url, $tempImage);
                $files[] = $tempImage;
            }
        }

        if ($videos->count()) {
            foreach ($videos as $video) {
                $info = pathinfo($video->file);
                $ext = $info['extension'];

                $tempVideo = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
                copy($video->file, $tempVideo);
                $files[] = $tempVideo;
            }
        }

        Zipper::make($newZipFileName)->add($files)->close();
        return response()->download($newZipFileName);
    }

    /**
     * @param $assetId
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadAsset($assetId)
    {
        $asset = Asset::find($assetId);

        if (!$asset) {
            abort(404, 'Asset Not Found');
        }

        $prefix = 'sniffr_';

        $info = pathinfo($asset->url);
        $ext = $info['extension'];

        $tempImage = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
        copy($asset->url, $tempImage);

        return response()->download($tempImage);
    }
}
