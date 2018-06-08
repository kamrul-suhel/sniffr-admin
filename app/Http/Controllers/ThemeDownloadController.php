<?php

namespace App\Http\Controllers;

use Auth;
use Redirect;
use App\Download;
use App\Video;
use App\Contract;
use PDF;

class ThemeDownloadController extends Controller
{
	public function __construct()
	{
		//$this->middleware('auth');
	}

    public function index($id, $type = 'watermark')
    {
        $authUser = Auth::user();
        if ($authUser->role == 'client' && $type == 'regular') {
            return redirect()->home()->with(array('note' => 'Sorry but you do not have permission to download this video!', 'note_type' => 'error'));
        }

        $video = Video::where('alpha_id', $id)->first();

        if($video && $video->file) {
        	// $download = new Download;
        	// $download->user_id = Auth::user()->id;
            // $download->client_id = (Auth::user()->client_id ? Auth::user()->client_id : 0);
        	// $download->video_id = $video->id;
			// $download->type = $type;
        	// $download->save();

			if($type=='regular'){
				$file = $video->file;
			} else {
				$file = $video->file_watermark;
			}

            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=" . basename($file));
            header("Content-Type: " . $video->mime);

            return readfile($file);
        }
        return Redirect::to('/videos');
    }

    /**
     * @param string $video_id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function contractDownloader(string $reference)
    {
        $contract = Contract::where('reference_id', $reference)->first();

        if (!$contract) {
            return Redirect::to('/')->with([
                'note' => 'Sorry, we could not find this contract',
                'note_type' => 'error',
            ]);
        }

        $video = Video::where('id', $contract->video_id)->first();

        if (!$video) {
            return Redirect::to('/')->with([
                'note' => 'Sorry, we could not find the video',
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
        $contract_text = $video->url ? str_replace(':story_link', '<strong>'.$video->url.'</strong>', $contract_text) : str_replace(':story_link', '', $contract_text);
        $contract_text = $contract->upfront_payment ? str_replace(':upfront_payment', 'UNILAD agree to pay an initial upfront payment of: <strong>£'.$contract->upfront_payment.'</strong>.<br />', $contract_text) : str_replace(':upfront_payment', '', $contract_text);
        $contract_text = $contract->success_system ? str_replace(':success_system', 'UNILAD agree to pay the following, based on the performance of the video on UNILAD\'s Facebook page: <strong>'.config('success_system')[$contract->success_system].'</strong>', $contract_text) : str_replace(':success_system', '', $contract_text);
        $contract_text = str_replace(':contract_ref_number', '<strong>'.$contract->reference_id.'</strong>', $contract_text);
        $contract_text = str_replace(':unilad_share', '<strong>'.(100 - $contract->revenue_share).'%</strong>', $contract_text);
        $contract_text = str_replace(':creator_share', '<strong>'.$contract->revenue_share.'%</strong>', $contract_text);

        return $contract_text;
    }
}
