<?php

namespace App\Http\Controllers\Frontend\Client;

use App\ClientMailer;
use App\Http\Controllers\Controller;
use App\Story;
use App\Collection;
use Chumper\Zipper\Facades\Zipper;
use App\Traits\FrontendResponse;
use App\Services\DownloadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App;

class ClientStoriesController extends Controller
{
    /**
     * @var DownloadService
     */
    private $downloadService;

    use FrontendResponse;
    const PAGINATE_PER_PAGE = 12;

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
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        if ($request->ajax() || $request->isJson()) {
            $user_id = Auth::user()->id;
            $client_mailer = ClientMailer::with('stories.orders')
                ->whereHas('users', function ($query) use ($user_id) {
                    $query->where('users.id', '=', $user_id);
                })
                ->orderBy('created_at', 'DESC')
                ->get()
                ->pluck('stories')
                ->collapse();


            //Paginate collection object
            $stories = $this->paginate($client_mailer, self::PAGINATE_PER_PAGE, $request->page);
            $data = [
                'stories' => $stories,
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
            $story_id = Story::select('id')->where('alpha_id', '=', $request->alpha_id)->first()['id'];
            $story = Story::with('assets')->with('videos')->with('orders')->find($story_id);

            $description = preg_replace("/<img[^>]+\>/i", "", $story->description);

            $story->description = $description;
            $data = [
                'story' => $story,
            ];
            return $this->successResponse($data);
        }

        return view('frontend.master');

    }

	public function getOfferedStories(Request $request)
	{
		if ($request->ajax()) {
			$clientId = Auth::user()->client_id;

			$offeredStories = Collection::with('collectionStories.story');
			// If search passed through
			if ($request->search) {
				$search = $request->search;
				$offeredStories = $offeredStories->whereHas('collectionStories.story', function ($query) use ($search) {
					$query->where('title', 'LIKE', '%' . $search . '%');
				});
			}
			$offeredStories = $offeredStories->where('client_id', $clientId)
//				->where('status', 'open')
				->orderBy('created_at', 'DESC')
				->whereHas('collectionStories', function($query) {
//					$query->where('status', 'offered');
				})
				->get()
				->pluck('collectionStories')->all();

			//Paginate collection object
			$stories = $this->paginate($offeredStories,self::PAGINATE_PER_PAGE, $request->page);

			$data = [
				'stories' => $stories,
			];

			return $this->successResponse($data);
		}
		return view('frontend.master');
	}

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function getPurchasedStories(Request $request)
    {
        if ($request->ajax()) {
            $client_id = Auth::user()->client_id;

			$purchasedStories = Collection::with('collectionStories.story');
			// If search passed through
            if ($request->search) {
				$search = $request->search;
				$purchasedStories = $purchasedStories->whereHas('collectionStories.story', function ($query) use ($search) {
					$query->where('title', 'LIKE', '%' . $search . '%');
				});
            }
			$purchasedStories = $purchasedStories->where('client_id', $client_id)
				->where('status', 'closed')
				->orderBy('created_at', 'DESC')
				->whereHas('collectionStories', function($query) {
					$query->where('status', 'purchased');
				})
				->get()
				->pluck('collectionStories')->all();

			//Paginate collection object
			$stories = $this->paginate($purchasedStories, self::PAGINATE_PER_PAGE, $request->page);

			$data = [
				'stories' => $stories,
			];
            return $this->successResponse($data);
        }
        return view('frontend.master');
    }

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

        $newZipFileName = $story->alpha_id . time() . '.zip';
        $newZipFilePath = '../storage/' . $newZipFileName;
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

		$mailer_id = $story->mailers()->first() ? $story->mailers()->first()->id : 0; //get mailer_id for better logs (which downloads relate to which downloaded) - the story could be sent out in more that one email, but we just grab the first one

        // save the order
        $this->downloadService->logDownload($storyId, $mailer_id, 'story');

        Zipper::make($newZipFilePath)->add($files)->close();
        \Storage::disk('s3')->put('downloads/' . $newZipFileName, $newZipFilePath, 'public');

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
}
