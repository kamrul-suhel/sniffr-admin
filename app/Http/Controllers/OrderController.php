<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $client_id = \Auth::user()->client_id;
        if(key_exists(\Auth::user()->role, config('roles.admins'))) {
            $client_id = $request->input('client_id');
        }

        $orders = Order::with('stories')
            ->where('client_id', '=', $client_id)
            ->get();
        return ($orders);
    }

    public function store(Request $request)
    {
        $order = new Order();
        $order->story_id = $request->input('story_id');
        $order->ip_address = $request->input('ip_address');
        $order->user_agent = $request->input('user_agent');
        $order->user_id = $request->input('user_id');
        $order->client_id = $request->input('client_id');
        $order->save();
        return $order;
    }
}
