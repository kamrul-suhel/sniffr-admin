<?php

namespace App\Http\Controllers\Frontend\Client;

use App\ClientMailer;
use App\Http\Controllers\Controller;
use App\Order;
use App\Story;
use App\Video;
use Chumper\Zipper\Facades\Zipper;
use App\Traits\FrontendResponse;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App;

class ClientStoriesController extends Controller
{
    /**
     * @var OrderService
     */
    private $orderService;

    use FrontendResponse;
    const PAGINATE_PER_PAGE = 12;

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

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function getPurchasedStories(Request $request)
    {

        if ($request->ajax()) {
            $client_id = Auth::user()->client_id;

            if ($request->search) {
                $ordered_stories = Story::with('orders')
                    ->where('title', 'LIKE', '%' . $request->search . '%')
                    ->whereHas('orders', function ($query) use ($client_id) {
                        $query->where('client_id', $client_id);
                    })
                    ->orderBy('id', 'DESC')
                    ->get();
            } else {
                $ordered_stories = Story::with('orders')
                    ->whereHas('orders', function ($query) use ($client_id) {
                        $query->where('client_id', $client_id);
                    })->get();
            }
            //Paginate collection object
            $stories = $this->paginate($ordered_stories, self::PAGINATE_PER_PAGE, $request->page);
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
        $this->orderService->logDownload($storyId, $mailer_id, 'story');
        $this->orderService->saveDownloadToOrder($storyId, $mailer_id, 'story');

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
