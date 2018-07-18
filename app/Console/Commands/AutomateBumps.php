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
use App\Jobs\QueueEmail;

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
        $assets = Story::where([['state', 'approved'], ['contact_id', '!=', 0], ['contact_made', NULL], ['contacted_at', '>', Carbon::now()->subDays(30)->toDateTimeString()]])
        ->where(function ($query) {
            $query->where('reminders', '<', 4)
                ->orWhereNull('reminders');
        })
        ->orderBy('contacted_at', 'DESC')
        ->get();

        if(count($assets)>0) {

            // Set incremental queue delay
            $queue_delay = 10;

            // Loop through stories
            foreach ($assets as $asset) {
                // Check previous reminders and whether the story fits within the range: 24 hours, 48 hours, 72 hours (archive)
                $send_ok = false;
                switch (true) {
                    case ($asset->reminders == NULL && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString()): // no reminders sent, this will be the first to be sent
                        $type = '24 hours';
                        $send_ok = true; //24 hours
                        break;
                    case ($asset->reminders == 1 && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(2)->toDateTimeString()): // this will be the second to be sent
                        $type = '48 hours';
                        $send_ok = true; //48 hours
                        break;
                    case ($asset->reminders == 2 && $asset->contacted_at < Carbon::now()->subDays(2)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(3)->toDateTimeString()): // this will move story into archive
                        $type = 'Archive';
                        $send_ok = true; //72 hours
                        break;
                }

                // Only send reminder if within above range plus if story has a contact
                if(isset($asset->contact)) {
                    if($asset->contact->email!=NULL && $send_ok == true){

                        // Output to schedule log
                        echo Carbon::now()->toDateTimeString().' : '.$type.' : '.$asset->alpha_id.' : '.$asset->title.' : '.$asset->contacted_at.' : '.($asset->reminders ? $asset->reminders : '0').' : '.$asset->contact->email. PHP_EOL;

                        // Need to update story reminder count and contacted_at sent timestamp
                        $asset->contacted_at = now();
                        $asset->reminders = ($asset->reminders ? $video->reminders+1 : 1);
                        $asset->state = ($type=='Archive' ? 'rejected' : $asset->state);
                        $asset->save();

                        // Schedule email reminder to be sent via queue/job (if not archiving story)
                        if($type!='Archive') {
                            QueueEmail::dispatch($asset->id, 'story_contacted', 'story')
                                ->delay(now()->addSeconds($queue_delay));
                        }

                        // Increment queue delay
                        $queue_delay = $queue_delay + 10;
                    }
                }
            }
        }
    }
}
