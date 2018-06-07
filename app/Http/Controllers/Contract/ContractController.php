<?php

namespace App\Http\Controllers\Contract;

use App\Contract;
use App\Http\Requests\Contract\DeleteContractRequest;
use App\Mail\ContractMailable;
use App\Mail\ContractSignedThanks;
use App\Notifications\ContractSigned;
use App\Traits\FrontendResponse;
use App\Video;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\CreateContractRequest;
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
     * @param CreateContractRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateContractRequest $request)
    {
        $video = Video::find($request->input('video_id'));
        $video->rights = 'exc';
        $video->save();

        $uuid = \Ramsey\Uuid\Uuid::uuid4();
        $contract = new \App\Contract();
        $contract->upfront_payment = $request->input('upfront_payment');
        $contract->upfront_payment_currency_id = $request->input('upfront_payment_currency_id');
        $contract->revenue_share = $request->input('revenue_share');
        $contract->success_system = $request->input('success_system');
        $contract->credit = $request->input('credit');
        $contract->notes = $request->input('notes');
        $contract->user_id = \Auth::id();
        $contract->video_id = $request->input('video_id');
        $contract->contract_model_id = $request->input('contract_model_id');
        $contract->token = md5(uniqid($request->input('video_id'), true));
        $contract->reference_id = $uuid->toString();
        $contract->save();



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

        \Mail::to($video->contact->email)->send(new ContractMailable($video, $video->currentContract));

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
            abort(404);
        }

        $video = Video::with('contact')->find($contract->video_id);

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
        $video->state = 'licensed';
        $video->save();

        \Mail::to($video->contact->email)->send(new ContractSignedThanks($video, $video->currentContract));

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
     * @param string $video_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function generatePdf(string $video_id)
    {
        $video = Video::find($video_id);

        if (!$video) {
            return Redirect::to('admin/videos/')->with([
                'note' => 'Sorry, we could not find the video',
                'note_type' => 'error',
            ]);
        }
        $contract = Contract::where('video_id', $video_id)->first();

        if (!$contract) {
            return Redirect::to('admin/videos/')->with([
                'note' => 'Sorry, we could not find the contract',
                'note_type' => 'error',
            ]);
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
        $contract_text = str_replace(':contract_date', '<strong>'.date('d-m-Y').'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_name', '<strong>'.$video->contact->full_name.'</strong>', $contract_text);
        $contract_text = str_replace(':licensor_email', '<strong>'.$video->contact->email.'</strong>', $contract_text);
        $contract_text = str_replace(':story_title', '<strong>'.$video->title.'</strong>', $contract_text);
        $contract_text = str_replace(':story_link', '<strong>'.$video->url.'</strong>', $contract_text);
        $contract_text = str_replace(':contract_ref_number', '<strong>'.$contract->reference_id.'</strong>', $contract_text);
        $contract_text = str_replace(':unilad_share', '<strong>'.(100 - $contract->revenue_share).'%</strong>', $contract_text);
        $contract_text = str_replace(':creator_share', '<strong>'.$contract->revenue_share.'%</strong>', $contract_text);

        return $contract_text;
    }
}
