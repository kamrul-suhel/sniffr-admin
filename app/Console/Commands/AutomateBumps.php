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
        $assets = Story::where([['state', 'approved'], ['contact_id', '!=', NULL], ['contact_made', NULL], ['contacted_at', '>', Carbon::now()->subDays(30)->toDateTimeString()]])
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
                $ok = false;
                switch (true) {
                    case ($asset->reminders == NULL && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString()): // no reminders sent, this will be the first to be sent
                        $type = '24 hours';
                        $ok = true; //After 24 hours of first contact
                        break;
                    case ($asset->reminders == 1 && $asset->contacted_at < Carbon::now()->subDays(1)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(2)->toDateTimeString()): // this will be the second to be sent
                        $type = '48 hours';
                        $ok = true; //After 48 hours of last contact
                        break;
                    case ($asset->reminders == 2 && $asset->contacted_at < Carbon::now()->subDays(3)->toDateTimeString() && $asset->contacted_at > Carbon::now()->subDays(15)->toDateTimeString()): // this will move story into archive
                        $type = 'Archive';
                        $ok = true; //After 72 hours of last contact
                        break;
                }

                // Only send reminder if within above range plus if story has a contact
                if(isset($asset->contact) && $ok == true) {

                    // Which method to contact (if not archiving story)
                    if($type!='Archive') {

                        QueueEmail::dispatch($asset->id, 'story_contacted', 'story')
                            ->delay(now()->addSeconds($queue_delay));

                    }

                    // Output to schedule log
                    echo Carbon::now()->toDateTimeString().' : '.$type.' : '.$asset->alpha_id.' : '.$asset->title.' : '.$asset->contacted_at.' : '.($asset->reminders ? $asset->reminders : '0').' : '.$asset->contact->full_name.' ('.$asset->contact->id.')'. PHP_EOL;

                    // Need to update story reminder count and contacted_at sent timestamp
                    $asset->contacted_at = now();
                    $asset->reminders = ($asset->reminders ? $asset->reminders+1 : 1);
                    $asset->state = ($type=='Archive' ? 'archive' : $asset->state); // Set story state to archive
                    $asset->save();

                    // Increment queue delay
                    $queue_delay = $queue_delay + 10;

                }
            }
        }
    }
}
