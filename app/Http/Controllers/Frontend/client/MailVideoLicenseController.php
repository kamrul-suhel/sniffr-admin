<?php

namespace App\Http\Controllers\Frontend\client;

use App\Order;
use App\Story;
use App\Traits\FrontendResponse;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MailVideoLicenseController extends Controller
{
    //
    use FrontendResponse;

    /**
     * @param $story_id
     */
    public function index($story_id)
    {
        if(!Auth::check()){
            return view('frontend.master');
        }

        $story = Story::find($story_id);
        $mailer_id = $story->mailers()->first()->id;

        $order = Order::where('story_id', '=', $story_id)
            ->where('client_id', '=', \Auth::user()->client_id)
            ->first();
        if ($order) {
            return $this->successResponse();
        }

        $order = new Order();
        $order->story_id = $story_id;
        $order->mailer_id = $mailer_id;
        $order->user_id = \Auth::user()->id;
        $order->client_id = \Auth::user()->client_id;
        $license = $order->save();

        if($license){
            return $this->successResponse();
        }
    }
}
