<?php

namespace App\Http\Controllers;

use App\Asset;
use App\Download;
use App\Order;
use App\Story;
use App\Video;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use PDF;

class StoryController extends Controller
{
    /**
     * @param $story_id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadStory($story_id)
    {
        $story = Story::find($story_id);
        if (!$story) {
            abort(404, 'Story Not Found');
        }

        $videos = Video::with('stories')->whereHas('stories', function ($query) use ($story_id) {
            $query->where('stories.id', '=', $story_id);
        })->get();

        $assets = Asset::with('stories')->whereHas('stories', function ($query) use ($story_id) {
            $query->where('stories.id', '=', $story_id);
        })->get();

        if ((!$assets->count()) && (!$videos->count())) {
            abort(404, 'No Assets Found in this Story');
        }

        $newZipFileName = $story->alpha_id. time() . '.zip';
        $newZipFilePath = '../storage/'.$newZipFileName;
        $prefix = 'sniffr_';
        $files = [];

        $pdf = $this->getPdf($story_id, false);

        $files[] = $pdf;

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

        $mailer_id = (Input::get('mailer_id') ? Input::get('mailer_id') : 0); //get mailer_id for better logs (which downloads relate to which mailer)

        // save the order
        $this->logDownload($story_id, $mailer_id);
        $this->saveDownloadToOrder($story_id, $mailer_id);

        Zipper::make($newZipFilePath)->add($files)->close();
        \Storage::disk('s3')->put('downloads/'.$newZipFileName, $newZipFilePath, 'public');

        return response()->download($newZipFilePath)->deleteFileAfterSend(true);
    }

    /**
     * @param $story_id
     */
    public function saveDownloadToOrder($story_id, $mailer_id)
    {
        $order = Order::where('story_id', '=', $story_id)
            ->where('client_id', '=', \Auth::user()->client_id)
            ->first();
        if ($order) {
            return;
        }
        $order = new Order();
        $order->story_id = $story_id;
        $order->mailer_id = $mailer_id;
        $order->user_id = \Auth::user()->id;
        $order->client_id = \Auth::user()->client_id;
        $order->save();
    }

    /**
     * @param $story_id
     */
    public function logDownload($story_id, $mailer_id)
    {
        // $download = Order::where('story_id', '=', $story_id)
        //     ->where('client_id', '=', \Auth::user()->client_id)
        //     ->first();
        // 
        // if ($download) {
        //     return;
        // }

        $download = new Download();
        $download->story_id = $story_id;
        $download->mailer_id = $mailer_id;
        $download->user_id = \Auth::user()->id;
        $download->client_id = \Auth::user()->client_id ?: 0;
        $download->save();
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

    /**
     * @param $videoId
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadVideo($videoId)
    {
        $video = Video::find($videoId);

        if (!$video) {
            abort(404, 'Asset Not Found');
        }

        $prefix = 'sniffr_';

        $info = pathinfo($video->file);
        $ext = $info['extension'];

        $tempVideoFile = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
        copy($video->file, $tempVideoFile);

        return response()->download($tempVideoFile);
    }

    /**
     * @param int $storyId
     * @param bool $download
     * @return string
     */
    public function getPdf(int $storyId, bool $download = true)
    {
        $story = Story::find($storyId);

        if (!$story) {
            abort(404, 'Story Not Found');
        }

        $html = view("stories.pdf")->with([
            "title" => $story['title'],
            "author" => $story['author'],
            "description" => $story['description'],
        ]);

        $pdf = App::make('dompdf.wrapper');
        $pdf->loadHTML($html);

        if ($download) {
            return $pdf->download();
        }

        $pdfName = \Ramsey\Uuid\Uuid::uuid4()->toString();
        $pdfUrl = 'downloads/' . $pdfName . '.pdf';

        \Storage::disk('s3')->put($pdfUrl, $pdf->output(), 'public');
        $pdfUrl = \Storage::disk('s3')->url($pdfUrl);

        $tempPdf = tempnam(sys_get_temp_dir(), $pdfName) . '.pdf';
        copy($pdfUrl, $tempPdf);

        return $tempPdf;
    }
}
