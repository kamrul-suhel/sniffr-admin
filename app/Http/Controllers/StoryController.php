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
    public function downloadStory($storyId)
    {
        $story = Story::find($storyId);
        if (!$story || !$story->assets()->count()) {
            abort(404, 'No Story or Assets Found');
        }

        $newZipFileName = $story->alpha_id. time() . '.zip';
        $newZipFilePath = '../storage/'.$newZipFileName;
        $prefix = 'sniffr_';
        $files = [];

        $pdf = $this->getStoryPdf($storyId, false);

        $files[] = $pdf;

		foreach ($story->assets()->get() as $asset) {
			$info = pathinfo($asset->url);
			$ext = $info['extension'];

			$tempImage = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
			copy($asset->url, $tempImage);
			$files[] = $tempImage;
		}

        $mailer_id = $story->mailers()->first()->id; //get mailer_id for better logs (which downloads relate to which mailer) - the story could be sent out in more that one email, but we just grab the first one

        // save the order
        $this->logDownload($storyId, $mailer_id, 'story');
        $this->saveDownloadToOrder($storyId, $mailer_id, 'story');

        Zipper::make($newZipFilePath)->add($files)->close();
        \Storage::disk('s3')->put('downloads/'.$newZipFileName, $newZipFilePath, 'public');

        return response()->download($newZipFilePath)->deleteFileAfterSend(true);
    }

    /**
     * @param $story_id
     */
    public function saveDownloadToOrder($story_id, $mailer_id, $type)
    {
        $order = Order::where('story_id', '=', $story_id)
            ->orWhere('video_id', '=', $story_id)
            ->where('client_id', '=', \Auth::user()->client_id)
            ->first();
        if ($order) {
            return;
        }
        $order = new Order();
        $order->story_id = ($type=='story' ? $story_id : 0);
        $order->video_id = ($type=='video' ? $story_id : 0);
        $order->mailer_id = $mailer_id;
        $order->user_id = \Auth::user()->id;
        $order->client_id = \Auth::user()->client_id;
        $order->save();
    }

    /**
     * @param $story_id
     */
    public function logDownload($story_id, $mailer_id, $type)
    {
        $download = new Download();
        $download->story_id = ($type=='story' ? $story_id : 0);
        $download->video_id = ($type=='video' ? $story_id : 0);
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

    public function licenseVideo($videoId)
    {
        $video = Video::find($videoId);

		if (!$video) {
			abort(404, 'Asset Not Found');
		}

        $mailer_id = $video->mailers()->first()->id;

		$files[] = $this->getVideoPdf($videoId, false);

        // save the order
        $this->logDownload($videoId, $mailer_id, 'video');
        $this->saveDownloadToOrder($videoId, $mailer_id, 'video');

        $newZipFileName = $video->alpha_id. time() . '.zip';
        $newZipFilePath = '../storage/'.$newZipFileName;
        $prefix = 'sniffr_';

        $info = pathinfo($video->file);
        $ext = $info['extension'];

        $tempVideoFile = tempnam(sys_get_temp_dir(), $prefix) . '.' . $ext;
        copy($video->file, $tempVideoFile);
        $files[] = $tempVideoFile;

        Zipper::make($newZipFilePath)->add($files)->close();
        \Storage::disk('s3')->put('downloads/'.$newZipFileName, $newZipFilePath, 'public');

        return response()->download($newZipFilePath)->deleteFileAfterSend(true);
    }

    /**
     * @param int $storyId
     * @param bool $download
     * @return string
     */
    public function getStoryPdf(int $storyId, bool $download = true)
    {
        $story = Story::find($storyId);

        if (!$story) {
            abort(404, 'Story Not Found');
        }

        $html = view("pdf.story")->with([
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

	/**
	 * @param int $storyId
	 * @param bool $download
	 * @return string
	 */
	public function getVideoPdf(int $videoId, bool $download = true)
	{
		$video = Video::find($videoId);

		if (!$video) {
			abort(404, 'Video Not Found');
		}

		$html = view("pdf.video")->with([
			"title" => $video['title'],
			"description" => $video['description'],
			"credit" => ($video['credit'] ? 'Please Credit: '.$video['credit'] : ''),
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
