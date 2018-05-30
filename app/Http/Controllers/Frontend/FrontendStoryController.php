<?php

namespace App\Http\Controllers\Frontend;

use App\ClientMailer;
use App\Order;
use App\Story;
use App\Traits\FrontendResponse;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class FrontendStoryController extends Controller
{
    use FrontendResponse;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function getMailerStories(Request $request)
    {

        if ($request->ajax() || $request->isJson()) {
            $user_id = $request->user_id;
            $client_mailer = ClientMailer::with('stories.orders')
                ->whereHas('users', function ($query) use ($user_id) {
                    $query->where('users.id', '=', $user_id);
                })
                ->orderBy('created_at', 'DESC')
                ->get()
                ->pluck('stories')
                ->collapse();

            //Paginate collection object
            $stories = $this->paginate($client_mailer, 8, $request->page);
            $data = [
                'stories' => $stories
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

        return View('frontend.master');

    }

    public function getDownloadedStories(Request $request){
        $user_id = $request->id;
        $order_stories = Order::with('story')
            ->where('user_id', '=', $user_id)
            ->get();
        dd($order_stories);
    }

    private function paginate($items, $perPage = 15, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}
