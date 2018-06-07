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
        $user_id = $request->get('user_id');
        $client_mailer = ClientMailer::with('videos')
            ->whereHas('users', function ($query) use ($user_id) {
                $query->where('users.id', '=', $user_id);
            })
            ->orderBy('created_at', 'DESC')
            ->get();

        dd($client_mailer);

        $video = new Video;

        $videos = $video->where('state', 'licensed')
            ->orderBy('id', 'DESC')
            ->paginate($this->videos_per_page);

        $data = [
            'videos' => $videos,
        ];

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse($data);
        }

        return view('client.videos.index', $data);
    }
}
