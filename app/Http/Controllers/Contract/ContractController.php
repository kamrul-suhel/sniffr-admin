<?php

namespace App\Http\Controllers\Contract;

use App\Contact;
use App\Contract;
use App\Mail\ContractMailable;
use App\Video;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\CreateContractRequest;

class ContractController extends Controller
{
    /**
     * @param CreateContractRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateContractRequest $request)
    {
        $contract = new \App\Contract();
        $contract->upfront_payment = $request->input('upfront_payment');
        $contract->revenue_share = $request->input('revenue_share');
        $contract->success_system = $request->input('success_system');
        $contract->credit = $request->input('credit');
        $contract->credit = $request->input('credit');
        $contract->user_id = \Auth::id();
        $contract->token = md5(uniqid($request->input('video_id'), true));
        $contract->video_id = $request->input('video_id');
        $contract->save();

        return redirect()->route('admin_video_edit', [
            'id' => $request->input('video_alpha_id')
        ]);
    }

    /**
     * @param int $video_id
     */
    public function send(int $video_id)
    {
        $video = Video::find($video_id);
        //$video = Video::with('currentContract')->with('contact')->find($video_id);

        \Mail::to($video->contact->email)->send(new ContractMailable($video, $video->currentContract));
    }

    /**
     * @param string $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function accept(string $token)
    {
        $contract = Contract::where('token', $token)->first;
        $video = Video::with('contact')->find($contract->video_id);

        return view('contracts.accept', [
            'contract' => $contract,
            'video' => $video
        ]);
    }
}