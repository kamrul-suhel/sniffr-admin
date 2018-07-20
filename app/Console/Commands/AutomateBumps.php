<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Story;
use App\Video;
use App\Contact;

use Carbon\Carbon as Carbon;
use App\Jobs\QueueBump;

use DB;

class AutomateBumps extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AutomateBumps:sendBumps';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks database and automatically sends bumps for stories';

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
        $assets = Story::where([['state', 'approved'], ['reminders', '<', 2], ['contact_id', '!=', NULL], ['contact_made', NULL], ['contacted_at', '<', Carbon::now()->subDays(1)->toDateTimeString()]])
        ->orderBy('contacted_at', 'DESC')
        ->get();

        if($assets) {
            // Set incremental queue delay
            $queue_delay = 10;

            // Loop through stories
            foreach ($assets as $asset) {
                // Only send reminder if within above range plus if story has a contact
                if($asset->contact->canAutoBump()) {
                    // Which method to contact (if not archiving story)
                    QueueBump::dispatch($asset->id)
                        ->delay(now()->addSeconds($queue_delay));

                    // Output to schedule log
                    echo Carbon::now()->toDateTimeString().' : '.$asset->alpha_id.' : '.$asset->title.' : '.$asset->contacted_at.' : '.($asset->reminders ? $asset->reminders : '0').' : '.$asset->contact->full_name.' ('.$asset->contact->id.')'. PHP_EOL;

                    // Increment queue delay
                    $queue_delay = $queue_delay + 10;
                }
            }
        }
    }
}
