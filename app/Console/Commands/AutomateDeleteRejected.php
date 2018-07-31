<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Story;
use App\Video;
use App\Contact;

use Carbon\Carbon as Carbon;

use DB;

class AutomateDeleteRejected extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AutomateDeleteRejected:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks database and automatically deletes rejected stories over 24hrs old';

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
        $assets = Story::where([['state', 'rejected'], ['updated_at', '<', Carbon::now()->subDays(1)->toDateTimeString()]])
        ->orderBy('updated_at', 'DESC')
        ->get();

        if(count($assets)>0) {

            // Loop through stories
            foreach ($assets as $asset) {

                // Output to schedule log
                echo Carbon::now()->toDateTimeString().': Asset Deleted: '.$asset->alpha_id.' : '.$asset->title. PHP_EOL;

                $asset->delete(); // Soft delete story

            }
        }
    }
}
