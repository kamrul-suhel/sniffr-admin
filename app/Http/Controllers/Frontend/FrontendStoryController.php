<?php

namespace App\Http\Controllers\Frontend;

use App\ClientMailer;
use App\Story;
use App\Traits\FrontendResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FrontendStoryController extends Controller
{
    use FrontendResponse;

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function getMailerStories(Request $request){


        if($request->ajax() || $request->isJson()){
           $user_id = $request->user_id;
            $client_mailer = ClientMailer::with('stories')
                ->whereHas('users', function ($query) use($user_id) {
                    $query->where('users.id', '=', $user_id);
                })
                ->orderBy('created_at', 'DESC')
            ->get();


            $data = [
                'stories' => $client_mailer
            ];
            return $this->successResponse($data);
        }

        return view('frontend.master');
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show(Request $request)
    {

        if($request->ajax() || $request->isJson()){
            $story_id = Story::select('id')->where('alpha_id','=', $request->alpha_id)->first()['id'];
            $story = Story::with('assets')->with('videos')->find($story_id);

            $description = preg_replace("/<img[^>]+\>/i", "", $story->description);

            $story->description = $description;
            $data = [
                'story' => $story,
            ];
           return $this->successResponse($data);
        }

        return View('frontend.master');

    }
}
