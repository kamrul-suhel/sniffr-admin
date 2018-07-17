<?php

namespace App\Http\Controllers\Contract;

use App\Contract;
use App\Http\Requests\Contract\DeleteContractRequest;
use App\Notifications\ContractSigned;
use App\Traits\FrontendResponse;
use Auth;
use App\User;
use App\Video;
use App\Story;
use App\Contact;
use App\VideoCategory;
use App\VideoCollection;
use App\Libraries\VideoHelper;
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
            $asset = ($contract->video_id ? Video::find($contract->video_id) : Story::find($contract->story_id));
            $type = ($contract->video_id ? 'video' : 'story');
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
            $data = [
                'note' => 'Contract Deleted!',
                'note_type' => 'success',
                'headline' => '<i class="fa fa-edit"></i> Edit Story',
                'story' => $asset,
                'post_route' => url('admin/stories/update'),
                'button_text' => 'Save Draft',
                'decision' => '',
                'user' => Auth::user(),
                'users' => User::all(),
                'contacts' => Contact::all(),
                'video_categories' => VideoCategory::all(),
                'video_collections' => VideoCollection::all(),
                'videos' => Video::where([['state', 'licensed'], ['file', '!=', NULL]])->get()
            ];

            return redirect()->back()->with($data);
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
            $story = Story::where('id', $request->input('asset_id'))
                ->first();

            $decision = '';

            $data = [
                'note' => 'Contract Saved!',
                'note_type' => 'success',
                'headline' => '<i class="fa fa-edit"></i> Edit Story',
                'story' => $story,
                'post_route' => url('admin/stories/update'),
                'button_text' => 'Save Draft',
                'decision' => $decision,
                'user' => Auth::user(),
                'users' => User::all(),
                'contacts' => Contact::all(),
                'video_categories' => VideoCategory::all(),
                'video_collections' => VideoCollection::all(),
                'videos' => Video::where([['state', 'licensed'], ['file', '!=', NULL]])->get()
            ];

            return redirect()->back()->with($data);
        }

    }

    /**
     * @param int $video_id
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

            $decision = ''; //Input::get('decision');

            $data = [
                'note' => 'Contract Sent!',
                'note_type' => 'success',
                'headline' => '<i class="fa fa-edit"></i> Edit Story',
                'story' => $story,
                'post_route' => url('admin/stories/update'),
                'button_text' => 'Save Draft',
                'decision' => $decision,
                'user' => Auth::user(),
                'users' => User::all(),
                'contacts' => Contact::all(),
                'video_categories' => VideoCategory::all(),
                'video_collections' => VideoCollection::all(),
                'videos' => Video::where([['state', 'licensed'], ['file', '!=', NULL]])->get()
            ];

            return redirect()->back()->with($data);
        }

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

        if($contract->video_id) {
            $video = Video::with('contact')
                ->find($contract->video_id);

            $contract_text = $this->getContractText($contract, $video->id, 'video');
            $story = '';
        } else {
            $story = Story::with('contact')
                ->find($contract->story_id);

            $contract_text = $this->getContractText($contract, $story->id, 'story');
            $video = '';
        }

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'stories' => $story,
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

        if($contract->video_id) {
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
    		QueueEmail::dispatch($video->id, 'contract_signed', 'video');

            if (env('APP_ENV') != 'local') {
    			$user = new User();
    			$user->slackChannel('contracts')->notify(new ContractSigned($video));
            }

            $story = '';

        } else {
            $story = Story::with('contact')->find($contract->story_id);
            $story->state = 'licensed';
            $story->save();

            // Send contract signed notification email
    		QueueEmail::dispatch($story->id, 'contract_signed', 'story');

            $video = '';
        }

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'stories' => $story,
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

        $asset_id = ($contract->video_id ? $contract->video_id : $contract->story_id);

        $contract_text = $this->getContractText($contract, $asset_id, ($contract->video_id ? 'video' : 'story'));

        $pdf = PDF::loadView('contracts.pdf', [
            'contract_text' => $contract_text
        ]);

        return $pdf->download(VideoHelper::quickRandom() . '.pdf');
    }

    /**
     * @param Contract $contract
     * @return mixed
     */
    private function getContractText(Contract $contract, $asset_id, $type = 'video')
    {
        $asset = ($type=='video' ? Video::find($asset_id) : Story::find($asset_id));

        $contract_text = config('contracts')[$contract->contract_model_id]['text'];
        $contract_text = $contract->signed_at ? str_replace(':contract_date', '<strong>'.$contract->signed_at.'</strong>', $contract_text) : str_replace(':contract_date', '<strong>'.date('d-m-Y').'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_name', '<strong>'.$asset->contact->full_name.'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_email', '<strong>'.$asset->contact->email.'</strong>', $contract_text);
        $contract_text = $asset->title ? str_replace(':story_title', ucwords($type).' Title: <strong>'.$asset->title.'</strong>', $contract_text) : str_replace(':story_title', '', $contract_text);
        $contract_text = $asset->url ? str_replace(':story_link', 'URL: <strong>'.$asset->url.'</strong>', $contract_text) : str_replace(':story_link', '', $contract_text);
		$contract_text = $asset->author ? str_replace(':story_author','Author: <strong>'.$asset->author.'</strong>', $contract_text) : str_replace(':story_author', '', $contract_text);
		$contract_text = $contract->upfront_payment ? str_replace(':upfront_payment', 'UNILAD agree to pay an initial upfront payment of: <strong>£'.$contract->upfront_payment.'</strong>.<br />', $contract_text) : str_replace(':upfront_payment', '', $contract_text);
        $contract_text = $contract->success_system ? str_replace(':success_system', 'UNILAD agree to pay the following, based on the performance of the '.$type.' on UNILAD\'s Facebook page: <strong>'.config('success_system')[$contract->success_system].'</strong>', $contract_text) : str_replace(':success_system', '', $contract_text);
		$contract_text = str_replace(':video_ref', '<strong>'.$asset->alpha_id.'</strong>', $contract_text);
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
