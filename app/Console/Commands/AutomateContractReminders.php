<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Page;
use App\Menu;
use App\Label;
use App\User;
use App\Tag;
use App\Video;
use App\Contact;
use App\Contract;

use Carbon\Carbon as Carbon;
use App\Jobs\QueueEmail;

use DB;

class AutomateContractReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AutomateContractReminders:sendReminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks database and automatically sends reminders for unsigned contracts';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
		// Contract sent, not signed
		$contracts = Contract::where([
			['reminders', '<', 2],
			['signed_at', NULL],
			['sent_at', '<', Carbon::now()->subDays(1)->toDateTimeString()]
		])->get();

        if($contracts) {
            // Set incremental queue delay
            $queue_delay = 10;

            // Loop through videos
            foreach ($contracts as $contract) {
                $asset = $contract->video_id ? $contract->video : $contract->story;
				$type = $contract->video_id ? 'video' : 'story';

                // Only send email reminder if within above range plus if video has a contact/email
                if(isset($asset->contact) && $asset->contact->email != NULL){
					// Output to schedule log
					echo Carbon::now()->toDateTimeString().' : '.$asset->alpha_id.' : '.$asset->title.' : '.$asset->more_details_sent.' : '.($asset->reminders ? $asset->reminders : '0').' : '.$asset->contact->email. PHP_EOL;

					$contract->reminders = $contract->reminders ? $contract->reminders + 1 : 1;
					// Need to update video reminder count and more details sent timestamp
					$contract->sent_at = now();
					$contract->save();

					// Schedule contract email reminder to be sent via queue/job
					QueueEmail::dispatch($asset->id, 'contract_bump_'.$contract->reminders, $type)
						->delay(now()->addSeconds($queue_delay));


					// Increment queue delay
					$queue_delay = $queue_delay + 10;
                }
            }
        }
    }
}
