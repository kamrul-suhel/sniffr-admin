<?php

namespace App\Http\Controllers\Contract;

use App\Contract;
use App\Mail\ContractMailable;
use App\Traits\FrontendResponse;
use App\Video;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\CreateContractRequest;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    use FrontendResponse;
    /**
     * @param CreateContractRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateContractRequest $request)
    {
        $uuid = \Ramsey\Uuid\Uuid::uuid4();
        $contract = new \App\Contract();
        $contract->upfront_payment = $request->input('upfront_payment');
        $contract->revenue_share = $request->input('revenue_share');
        $contract->success_system = $request->input('success_system');
        $contract->credit = $request->input('credit');
        $contract->notes = $request->input('notes');
        $contract->user_id = \Auth::id();
        $contract->token = md5(uniqid($request->input('video_id'), true));
        $contract->reference_id = $uuid->toString();
        $contract->save();

        return redirect()->route('admin_video_edit', [
            'id' => $request->input('video_alpha_id')
        ])->with([
            'note' => 'Contract Saved!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param int $video_id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function send(int $video_id)
    {
        $video = Video::with('currentContract')->with('contact')->find($video_id);
        \Mail::to($video->contact->email)->send(new ContractMailable($video, $video->currentContract));

        return redirect()->route('admin_video_edit', [
            'id' => $video->alpha_id
        ])->with([
            'note' => 'Contract Sent!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param Request $request
     * @param string $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function accept(Request $request, string $token)
    {
        $contract = Contract::where('token', '=', $token)->first();

        if (!$contract) {
            abort(404);
        }

        $video = Video::with('contact')->find($contract->video_id);

        $contract_text = config('contracts.text');
        $contract_text = str_replace(':contract_date', date('d-m-Y'), $contract_text);
        $contract_text = str_replace(':licensor_name', $video->contact->full_name, $contract_text);
        $contract_text = str_replace(':licensor_email', $video->contact->email, $contract_text);
        $contract_text = str_replace(':story_title', $video->title, $contract_text);
        $contract_text = str_replace(':story_link', $video->url, $contract_text);
        $contract_text = str_replace(':contract_ref_number', $contract->reference_id, $contract_text);
        $contract_text = str_replace(':unilad_share', (100 - $contract->revenue_share), $contract_text);
        $contract_text = str_replace(':creator_share', $contract->revenue_share, $contract_text);

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'signed' => ($contract->signed_at) ? true : false,
                'contract' => $contract_text,
            ]);
        }

        return view('frontend.master');
    }

    /**
     * @param Request $request
     * @param string $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function sign(Request $request, string $token)
    {
        $contract = Contract::where('token', '=', $token)->first();
        $contract->signed_at = now();
        $contract->ip = $request->ip();
        $contract->user_agent = $request->header('User-Agent');
        $contract->save();

        if (!$contract) {
            abort(404);
        }

        $video = Video::with('contact')->find($contract->video_id);

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'signed' => true
            ]);
        }

        return view('frontend.master');
    }
}