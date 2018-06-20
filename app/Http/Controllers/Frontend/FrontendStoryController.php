<?php

namespace App\Http\Controllers\Frontend;

use App\ClientMailer;
use App\Http\Controllers\Controller;
use App\Order;
use App\Story;
use App\Traits\FrontendResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FrontendStoryController extends Controller
{
    use FrontendResponse;
    const PAGINATE_PER_PAGE = 6;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function getMailerStories(Request $request)
    {
        $user_client_id = Auth::user()->client_id;
        $client_mailer = ClientMailer::with('stories.orders')
            ->whereHas('users', function ($query) use ($user_client_id) {
                $query->where('users.client_id', '=', $user_client_id);
            })
            ->orderBy('created_at', 'DESC')
            ->get()
            ->pluck('stories')
            ->collapse();

        $stories = $this->paginate($client_mailer, self::PAGINATE_PER_PAGE, $request->page);
        $collect_stories = collect($stories->items());

        $items = $collect_stories->each(function($item) use($user_client_id){
            if(isset($item->orders->client_id) && $item->orders->client_id === $user_client_id){
                $item['order'] = 1;
            }else{
                $item['order'] = 0;
            }
        });

        dd($items);

        if ($request->ajax() || $request->isJson()) {
            $user_client_id = Auth::user()->client_id;
            $client_mailer = ClientMailer::with('stories.orders')
                ->whereHas('users', function ($query) use ($user_client_id) {
                    $query->where('users.client_id', '=', $user_client_id);
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

    public function getDownloadedStories(Request $request)
    {

        if ($request->ajax()) {
            $user = Auth::user();
            $order_stories = Order::with('story.orders')
                ->where('user_id', '=', $user->id)
                ->get()
                ->pluck('story');

            //Paginate collection object
            $stories = $this->paginate($order_stories, self::PAGINATE_PER_PAGE, $request->page);
            $data = [
                'stories' => $stories,
            ];
            return $this->successResponse($data);
        }
        return view('frontend.master');
    }



}
