<?php

namespace App\Http\Controllers\Frontend;

use App\ClientMailer;
use App\Story;
use App\Traits\FrontendResponse;
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
            $client_mailer = ClientMailer::with('stories')
                ->where('user_id', '=', $request->user_id)
                ->first();
            $data = [
                'stories' => $client_mailer->stories
            ];
            return $this->successResponse($data);
        }

        return view('frontend.master');
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show(string $alpha_id, Request $request)
    {
        $story_id = Story::select('id')->where('alpha_id','=',$alpha_id)->first()['id'];
        $story = Story::with('assets')->with('videos')->find($story_id);

        $data = [
            'story' => $story,
        ];

        if($request->ajax() || $request->json()){
           return $this->successResponse($data);
        }

        return View('frontend.master');

    }
}
