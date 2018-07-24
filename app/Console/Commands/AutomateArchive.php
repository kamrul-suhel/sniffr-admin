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

use DB;

class AutomateArchive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AutomateArchive:archive';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks database and automatically for stories to be archived';

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
        $assets = Story::where([['state', 'approved'], ['reminders', '>=', 2], ['contact_id', '!=', NULL], ['contact_made', NULL], ['contacted_at', '<', Carbon::now()->subDays(3)->toDateTimeString()]])
        ->orderBy('contacted_at', 'DESC')
        ->get();

        if(count($assets)>0) {
            // Set incremental queue delay
            $queue_delay = 10;

            // Loop through stories
            foreach ($assets as $asset) {
                // Only send reminder if within above range plus if story has a contact
                $asset->state = 'archive'; // Set story state to archive
                $asset->save();

                // Output to schedule log
                echo Carbon::now()->toDateTimeString().': Asset Archived: '.$asset->alpha_id.' : '.$asset->title. PHP_EOL;

                // Increment queue delay
                $queue_delay = $queue_delay + 10;
            }
        }
    }
}
