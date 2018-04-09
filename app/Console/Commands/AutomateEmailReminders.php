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

use Carbon\Carbon as Carbon;
use App\Jobs\QueueEmail;

use DB;

class AutomateEmailReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AutomateEmailReminders:sendReminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks database and automatically sends email reminders';

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
        $videos = Video::where([['state', 'accepted'], ['contact_id', '!=', 0], ['more_details', NULL], ['more_details_code', '!=', NULL], ['more_details_sent', '>', Carbon::now()->subDays(30)->toDateTimeString()]])
        ->where(function ($query) {
            $query->where('reminders', '<', 4)
                ->orWhereNull('reminders');
        })
        ->orderBy('more_details_sent', 'DESC')
        ->get();

        if(count($videos)>0) {
            // Loop through videos
            foreach ($videos as $video) {
                // Check previous reminders and whether the video fits within the range: 24 hours, 72 hours, 1 week
                $send_ok = false;
                switch (true) {
                    case ($video->reminders == NULL && $video->more_details_sent < Carbon::now()->subDays(1)->toDateTimeString()): // no reminders sent, this will be the first to be sent
                        $type = '24 hours';
                        $send_ok = true; //24 hours
                        break;
                    case ($video->reminders == 1 && $video->more_details_sent < Carbon::now()->subDays(1)->toDateTimeString() && $video->more_details_sent > Carbon::now()->subDays(3)->toDateTimeString()): // this will be the second to be sent
                        $type = '72 hours';
                        $send_ok = true; //72 hours
                        break;
                    case ($video->reminders == 2 && $video->more_details_sent < Carbon::now()->subDays(7)->toDateTimeString() && $video->more_details_sent > Carbon::now()->subDays(15)->toDateTimeString()): // this will be the third to be sent
                        $type = '1 week';
                        $send_ok = true; //1 week
                        break;
                }

                // Only send email reminder if within above range plus if video has a contact/email
                if(isset($video->contact) && $video->contact->email!=NULL && $send_ok == true){

                    // Output to schedule log
                    echo Carbon::now()->toDateTimeString().' : '.$type.' : '.$video->alpha_id.' : '.$video->title.' : '.$video->more_details_sent.' : '.($video->reminders ? $video->reminders : '0').' : '.$video->contact->email. PHP_EOL;
                    // Need to update video reminder count and more details sent timestamp
                    $video->more_details_sent = now();
                    $video->reminders = $video->reminders ? $video->reminders+1 : 1;
                    $video->save();

                    // Schedule email reminder to be sent via queue/job
                    QueueEmail::dispatch($video->id, 'details_reminder')
                        ->delay(now()->addSeconds(10));
                }
            }
        }
    }
}
