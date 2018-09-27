<?php

namespace App\Http\Controllers\Contract;

use App\Contract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\CreateContractRequest;
use App\Http\Requests\Contract\DeleteContractRequest;
use App\Http\Traits\Controller\Api\v1\Traits\FrontendResponse;
use App\Jobs\QueueEmail;
use App\Libraries\VideoHelper;
use App\Services\ContractService;
use App\Story;
use App\Video;
use PDF;

class ContractController extends Controller
{
    use FrontendResponse;

    private $contractService;

    public function __construct()
    {
        $this->contractService = new ContractService();
    }

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

        $asset = ($contract->video_id ? Video::find($contract->video_id) : Story::find($contract->story_id));
        $type = ($contract->video_id ? 'video' : 'story');

        if(!$contract->signed_at) {
            $note = 'Contract Deleted!';
            $note_type = 'success';
            $contract->delete();
            $contract->save();
        }

        if($type=='video') {
            return redirect()->route('admin_video_edit', [
                'id' => $asset->alpha_id
            ])->with([
                'active_tab' => 'contract',
                'note' => $note,
                'note_type' => $note_type
            ]);
        } else {

            return redirect()->route('admin.stories.edit', ['id' => $asset->alpha_id])->with([
                'note' => $note,
                'note_type' => $note_type
            ]);
        }

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
     * @throws \Exception
     */
    public function store(CreateContractRequest $request)
    {
        $uuid = \Ramsey\Uuid\Uuid::uuid4();
        $assetType = $request->input('asset_type');
        $contract = new \App\Contract();
        $contract->upfront_payment = $request->input('upfront_payment');
        $contract->upfront_payment_currency_id = $request->input('upfront_payment_currency_id');
        $contract->revenue_share = $request->input('revenue_share');
        $contract->success_system = $request->input('success_system');
        $contract->user_id = \Auth::id();
        $contract->video_id = $assetType == 'video' ? $request->input('asset_id') : NULL;
        $contract->story_id = $assetType == 'story' ? $request->input('asset_id') : NULL;
        $contract->contract_model_id = $request->input('contract_model_id');
        $contract->token = md5(uniqid($request->input('asset_id'), true));
        $contract->reference_id = $uuid->toString();
        $contract->save();

        if($assetType == 'video') {
            $video = Video::find($request->input('asset_id'));
    		$video->rights = config('contracts')[$contract->contract_model_id]['rights'];
    		$video->save();

            return redirect()->route('admin_video_edit', [
                'id' => $request->input('asset_alpha_id')
            ])->with([
                'active_tab' => 'contract',
                'note' => 'Contract Saved!',
                'note_type' => 'success'
            ]);
        } else {

            return redirect()->route('admin.stories.edit', ['id' => $request->get('asset_alpha_id')])->with([
                'note' => 'Contract Saved!',
                'note_type' => 'success'
            ]);
        }

    }

    /**
     * @param string $type
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function send($type = 'video', int $id)
    {
        if($type=='video') {
            $video = Video::with('currentContract')->with('contact')->find($id);

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
    		QueueEmail::dispatch($video->id, 'sign_contract', 'video');

            return redirect()->route('admin_video_edit', [
                'id' => $video->alpha_id
            ])->with([
                'active_tab' => 'contract',
                'note' => 'Contract Sent!',
                'note_type' => 'success'
            ]);
        } else {

            $story = Story::with('currentContract')->with('contact')->find($id);

            if (!$story) {
                abort(404);
            }

            $story->state = 'licensing';
            $story->save();

            $contract = Contract::find($story->currentContract->id);

            if (!$contract) {
                abort(404);
            }

            $contract->sent_at = now();
            $contract->save();

            // Send contract signed notification email
    		QueueEmail::dispatch($story->id, 'sign_contract', 'story');

            return redirect()->route('admin.stories.edit', ['id' => $story->alpha_id])->with([
                'note' => 'Contract Sent!',
                'note_type' => 'success'
            ]);
        }

    }

    /**
     * @param string $reference_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function generatePdf(string $reference_id, bool $redacted = false)
    {
        $contract = Contract::where('reference_id', $reference_id)->first();

        if (!$contract) {
            abort(404);
        }

        $asset_id = ($contract->video_id ? $contract->video_id : $contract->story_id);

        $contract_text = $this->contractService->getContractText($contract, $asset_id, ($contract->video_id ? 'video' : 'story'), $redacted);

        $pdf = PDF::loadView('pdf.contract', [
            'contract_text' => $contract_text
        ]);

        return $pdf->download(VideoHelper::quickRandom() . '.pdf');
    }

}
