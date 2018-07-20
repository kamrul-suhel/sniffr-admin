<?php

namespace App\Http\Controllers\Frontend\Client;

use App\ClientMailer;
use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use Auth;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\Request;
use App\Services\DownloadService;
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
    public function __construct(Request $request, DownloadService $downloadService)
    {
    	$this->downloadService = $downloadService;
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

	/**
	 * @param Request $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
	 */
	public function show(Request $request)
	{
		if ($request->ajax() || $request->isJson()) {
			$video_id = Video::select('id')->where('alpha_id', '=', $request->alpha_id)->first()['id'];
			$video = Video::with('orders')->find($video_id);

			$data = [
				'video' => $video,
			];
			return $this->successResponse($data);
		}

		return view('frontend.master');

	}

    public function getOfferedVideos(Request $request)
    {

//        $clientId = Auth::user()->client_id;
//
//        $offeredVideos = Collection::with('collectionVideos.video');
//        // If search passed through
//        if ($request->search) {
//            $search = $request->search;
//            $offeredVideos = $offeredVideos->whereHas('collectionVideos.video', function ($query) use ($search) {
//                $query->where('title', 'LIKE', '%' . $search . '%');
//            });
//        }
//        $offeredVideos = $offeredVideos->where('client_id', $clientId)
////                ->where('status', 'open')
//            ->orderBy('created_at', 'DESC')
//            ->whereHas('collectionVideos', function($query) {
////                $query->where('status', 'offered');
//            })
//            ->get();
//
////        $offeredVideos = $offeredVideos->each(function($collection){
////            $collection->video->each(function($video) use ($collection){
////                $video['collection'] = $collection;
////            });
////        });
//
//        dd($offeredVideos);


        if ($request->ajax()) {
            $clientId = Auth::user()->client_id;

            $offeredVideos = Collection::with('collectionVideos.video');
            // If search passed through
            if ($request->search) {
                $search = $request->search;
                $offeredVideos = $offeredVideos->whereHas('collectionVideos.video', function ($query) use ($search) {
                    $query->where('title', 'LIKE', '%' . $search . '%');
                });
            }
            $offeredVideos = $offeredVideos->where('client_id', $clientId)
                ->where('status', 'open')
                ->orderBy('created_at', 'DESC')
                ->whereHas('collectionVideos', function($query) {
//                    $query->where('status', 'offered');
                })
                ->get()
                ->pluck('collectionVideos');
//            ->collapse();

//            $offeredVideos = $offeredVideos->each(function($collection){
//               $collection->video->each(function($video) use ($collection){
//                   $video['collection'] = $collection;
//               });
//            });

            //Paginate collection object
            $videos = $this->paginate($offeredVideos,self::PAGINATE_PER_PAGE, $request->page);
            $data = [
                'videos' => $videos,
            ];
            return $this->successResponse($data);
        }
        return view('frontend.master');
    }

	public function getPurchasedVideos(Request $request)
	{
		if ($request->ajax()) {
			$client_id = Auth::user()->client_id;

			$purchasedVideos = Collection::with('collectionVideos.video');
			// If search passed through
			if ($request->search) {
				$search = $request->search;
				$purchasedVideos = $purchasedVideos->whereHas('collectionVideos.video', function ($query) use ($search) {
					$query->where('title', 'LIKE', '%' . $search . '%');
				});
			}
			$purchasedVideos = $purchasedVideos->where('client_id', $client_id)
				->where('status', 'closed')
				->orderBy('created_at', 'DESC')
				->whereHas('collectionVideos', function($query) {
					$query->where('status', 'purchased');
				})
				->get()
				->pluck('collectionVideos')->all();

			//Paginate collection object
			$videos = $this->paginate($purchasedVideos, self::PAGINATE_PER_PAGE, $request->page);

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
		$this->downloadService->logDownload($videoId, $mailer_id, 'video');

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
