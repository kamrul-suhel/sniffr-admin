<?php

namespace App\Http\Controllers\Contract;

use App\Contract;
use App\Http\Requests\Contract\DeleteContractRequest;
use App\Notifications\ContractSigned;
use App\Traits\FrontendResponse;
use App\Video;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\CreateContractRequest;
use App\Jobs\QueueVideoYoutubeUpload;
use App\Jobs\QueueEmail;
use Illuminate\Http\Request;
use PDF;

class ContractController extends Controller
{
    use FrontendResponse;

    /**
     * @param DeleteContractRequest $request
     * @param Contract $contract
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function delete(DeleteContractRequest $request, Contract $contract)
    {
        $note_type = 'error';
        $note = 'Can\'t delete a contract that is already signed';

        if(!$contract->signed_at) {
            $note = 'Contract Deleted!';
            $note_type = 'success';
            $contract->delete();
            $contract->save();
        }

        $video = Video::find($contract->video_id);

        return redirect()->route('admin_video_edit', [
            'id' => $video->alpha_id
        ])->with([
            'active_tab' => 'contract',
            'note' => $note,
            'note_type' => $note_type
        ]);
    }

	/**
	 * @param $id
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function edit($id)
	{
		$contract = Contract::find($id);

		$data = [
			'headline' => '<i class="fa fa-edit"></i> Edit Contract',
			'contract' => $contract,
		];

		return view('admin.contacts.create_edit', $data);
	}

    /**
     * @param CreateContractRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateContractRequest $request)
    {
        $uuid = \Ramsey\Uuid\Uuid::uuid4();
        $contract = new \App\Contract();
        $contract->upfront_payment = $request->input('upfront_payment');
        $contract->upfront_payment_currency_id = $request->input('upfront_payment_currency_id');
        $contract->revenue_share = $request->input('revenue_share');
        $contract->success_system = $request->input('success_system');
        $contract->user_id = \Auth::id();
        $contract->video_id = $request->input('video_id');
        $contract->contract_model_id = $request->input('contract_model_id');
        $contract->token = md5(uniqid($request->input('video_id'), true));
        $contract->reference_id = $uuid->toString();
        $contract->save();

		$video = Video::find($request->input('video_id'));
		$video->rights = config('contracts')[$contract->contract_model_id]['rights'];
		$video->save();

        return redirect()->route('admin_video_edit', [
            'id' => $request->input('video_alpha_id')
        ])->with([
            'active_tab' => 'contract',
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

        if (!$video) {
            abort(404);
        }

        $video->state = 'pending';
        $video->save();

        $contract = Contract::find($video->currentContract->id);

        if (!$contract) {
            abort(404);
        }

        $contract->sent_at = now();
        $contract->save();

		// Send contract signed notification email
		QueueEmail::dispatch($video->id, 'sign_contract');

        return redirect()->route('admin_video_edit', [
            'id' => $video->alpha_id
        ])->with([
            'active_tab' => 'contract',
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
            if($request->ajax() || $request->isJson()){
                return $this->errorResponse("This contract is no longer available");
            }
            return view('frontend.master');
        }

        $video = Video::with('contact')
            ->find($contract->video_id);

        $contract_text = $this->getContractText($contract, $video);

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'signed' => ($contract->signed_at) ? true : false,
                'contract' => nl2br($contract_text),
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
		$video->licensed_at = now();
        $video->state = 'licensed';
        $video->save();

		// Set to process for youtube and analysis
		if (empty($video->youtube_id) && $video->file) {
			QueueVideoYoutubeUpload::dispatch($video->id)
				->delay(now()->addSeconds(5));
		}

		// Send contract signed notification email
		QueueEmail::dispatch($video->id, 'contract_signed');

        if (env('APP_ENV') != 'local') {
            $video->notify(new ContractSigned($video));
        }

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'signed' => true
            ]);
        }

        return view('frontend.master');
    }

    /**
     * @param string $reference_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function generatePdf(string $reference_id)
    {
        $contract = Contract::where('reference_id', $reference_id)->first();

        if (!$contract) {
            abort(404);
        }

        $video = Video::find($contract->video_id);

        if (!$video) {
            abort(404);
        }

        $contract_text = $this->getContractText($contract, $video);

        $pdf = PDF::loadView('contracts.pdf', [
            'contract_text' => $contract_text
        ]);

        return $pdf->download($video->alpha_id . '.pdf');
    }

    /**
     * @param Contract $contract
     * @param Video $video
     * @return mixed
     */
    private function getContractText(Contract $contract, Video $video)
    {
        $contract_text = config('contracts')[$contract->contract_model_id]['text'];
        $contract_text = $contract->signed_at ? str_replace(':contract_date', '<strong>'.$contract->signed_at.'</strong>', $contract_text) : str_replace(':contract_date', '<strong>'.date('d-m-Y').'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_name', '<strong>'.$video->contact->full_name.'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_email', '<strong>'.$video->contact->email.'</strong>', $contract_text);
        $contract_text = $video->title ? str_replace(':story_title', 'Video Title: <strong>'.$video->title.'</strong>', $contract_text) : str_replace(':story_title', '', $contract_text);
        $contract_text = $video->url ? str_replace(':story_link', 'URL: <strong>'.$video->url.'</strong>', $contract_text) : str_replace(':story_link', '', $contract_text);
        $contract_text = $contract->upfront_payment ? str_replace(':upfront_payment', 'UNILAD agree to pay an initial upfront payment of: <strong>£'.$contract->upfront_payment.'</strong>.<br />', $contract_text) : str_replace(':upfront_payment', '', $contract_text);
        $contract_text = $contract->success_system ? str_replace(':success_system', 'UNILAD agree to pay the following, based on the performance of the video on UNILAD\'s Facebook page: <strong>'.config('success_system')[$contract->success_system].'</strong>', $contract_text) : str_replace(':success_system', '', $contract_text);
        $contract_text = str_replace(':video_ref', '<strong>'.$video->alpha_id.'</strong>', $contract_text);
        $contract_text = str_replace(':contract_ref_number', '<strong>'.$contract->reference_id.'</strong>', $contract_text);
        $contract_text = str_replace(':unilad_share', '<strong>'.(100 - $contract->revenue_share).'%</strong>', $contract_text);
        $contract_text = str_replace(':creator_share', '<strong>'.$contract->revenue_share.'%</strong>', $contract_text);

        $currencies = config('currencies');
        if (($contract->upfront_payment_currency_id != 1) && (key_exists($contract->upfront_payment_currency_id, $currencies))) {
            $contract_text = str_replace('£', $currencies[$contract->upfront_payment_currency_id]['symbol'], $contract_text);
        }

        return $contract_text;
    }
}
