<?php

namespace App\Http\Controllers\Client;

use App\ClientMailer;
use App\Libraries\VideoHelper;
use App\Traits\FrontendResponse;
use Auth;
use Illuminate\Http\Request;
use App\Video;
use App\Http\Controllers\Controller;

class ClientVideosController extends Controller
{
    use FrontendResponse;
    use VideoHelper;

    const PAGINATE_PER_PAGE = 6;

    /**
     * @var int
     */
    private $videos_per_page;

    /**
     * ClientVideosController constructor.
     */
    public function __construct()
    {
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
    public function videosSent(Request $request)
    {
        if(!Auth::check()){
            return view('frontend.master');
        }

        if ($request->ajax() || $request->isJson()) {
            $user_id = Auth::user()->id;
            $client_videos_mailer = ClientMailer::with('videos.order')
                ->whereHas('users', function ($query) use ($user_id) {
                    $query->where('users.id', '=', 3);
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
                'videos' => $client_videos_mailer
            ];
            return $this->successResponse($data);
        }

        return view('frontend.master');
    }
}
