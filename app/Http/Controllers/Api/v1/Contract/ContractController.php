<?php

namespace App\Http\Controllers\Api\v1\Contract;

use App\Contract;
use App\Http\Controllers\Api\v1\BaseApiController;
use App\Jobs\QueueEmail;
use App\Jobs\QueueStory;
use App\Jobs\QueueVideoYoutubeUpload;
use App\Libraries\VideoHelper;
use App\Notifications\ContractSigned;
use App\Services\ContractService;
use App\Story;
use App\User;
use App\Video;
use Illuminate\Http\Request;
use PDF;

class ContractController extends BaseApiController
{

    private $contractService;

    public function __construct()
    {
        $this->contractService = new ContractService();
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
        }

        if($contract->video_id) {
            $video = Video::with('contact')
                ->find($contract->video_id);

            $contract_text = $this->contractService->getContractText($contract, $video->id, 'video');
            $story = '';
        } else {
            $story = Story::with('contact')
                ->find($contract->story_id);

            $contract_text = $this->contractService->getContractText($contract, $story->id, 'story');
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

            // Push story to WP
            QueueStory::dispatch($story->alpha_id, 'push', 0);

            // Send contract signed notification email
            QueueEmail::dispatch($story->id, 'contract_signed', 'story');

            // Need to add slack alert for stories (like videos)

            $video = '';
        }

        if ($request->ajax() || $request->isJson()) {
            return $this->successResponse([
                'videos' => $video,
                'stories' => $story,
                'signed' => true
            ]);
        }
    }

}
