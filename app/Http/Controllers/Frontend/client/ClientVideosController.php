<?php

namespace App\Http\Controllers\Frontend\Client;

use App\ClientMailer;
use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use Auth;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Video;
use App\Collection;
use App\Http\Controllers\Controller;
use App;

class ClientVideosController extends Controller
{
    use FrontendResponse;
    use VideoHelper;

    const PAGINATE_PER_PAGE = 12;

    /**
     * @var int
     */
    private $videos_per_page;

    /**
     * ClientVideosController constructor.
     */
    public function __construct(Request $request, OrderService $orderService)
    {
    	$this->orderService = $orderService;
        $settings = config('settings.site');
        $this->videos_per_page = $settings['videos_per_page'] ?: 24;
        $this->data = [
            'user' => Auth::user(),
        ];
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        if(!Auth::check()){
            return view('frontend.master');
        }

        if ($request->ajax() || $request->isJson()) {
            $user_id = Auth::user()->id;
            $client_videos_mailer = ClientMailer::with('videos.orders')
                ->whereHas('users', function ($query) use ($user_id) {
                    $query->where('users.id', '=', $user_id);
                })
                ->whereHas('videos', function ($query) {
                    $query->where('state', 'licensed');
                })
                ->orderBy('created_at', 'DESC')
                ->get()
                ->pluck('videos')
                ->collapse();

			$client_videos_mailer = $this->paginate($client_videos_mailer, self::PAGINATE_PER_PAGE);

			$data = [
				'videos' => $client_videos_mailer,
				'user' => Auth::user()
			];

            return $this->successResponse($data);
        }

        return view('frontend.master');
    }


	public function getPurchasedVideos(Request $request)
	{
		if ($request->ajax()) {
			$client_id = Auth::user()->client_id;

				$purchased_videos = Collection::with('collectionVideos.video');
				// If search passed through
				if ($request->search) {
					$search = $request->search;
					$purchased_videos = $purchased_videos->whereHas('collectionVideos.video', function ($query) use ($search) {
						$query->where('title', 'LIKE', '%' . $search . '%');
					});
				}
				$purchased_videos = $purchased_videos->where('client_id', $client_id)
					->where('status', 'closed')
					->orderBy('created_at', 'DESC')
					->get()
					->pluck('collectionVideos')->all();

			//Paginate collection object
			$videos = $this->paginate($purchased_videos, self::PAGINATE_PER_PAGE, $request->page);

			$data = [
				'videos' => $videos,
			];
			return $this->successResponse($data);
		}
		return view('frontend.master');
	}


	public function downloadVideo($videoId)
	{
		$video = Video::find($videoId);

		if (!$video) {
			abort(404, 'Asset Not Found');
		}

		$mailer_id = $video->mailers()->first() ? $video->mailers()->first()->id : 0;

		$files[] = $this->getVideoPdf($videoId, false);

		// save the order
		$this->orderService->logDownload($videoId, $mailer_id, 'video');
		$this->orderService->saveDownloadToOrder($videoId, $mailer_id, 'video');

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
