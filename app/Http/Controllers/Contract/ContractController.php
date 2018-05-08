<?php

namespace App\Http\Controllers\Contract;

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
        //$contract->user_id = $request->input('user_id');
        $contract->video_id = $request->input('video_id');
        $contract->save();

        return redirect()->route('admin_video_edit', [
            'id' => $request->input('video_id')
        ]);
    }

}