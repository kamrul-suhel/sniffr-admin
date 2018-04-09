<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;

use App\Video;

use App\Jobs\QueueVideoYoutubeUpload;

use DB;

class DailyYoutubeUpload extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'DailyYoutubeUpload:checkVideos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks videos that need uploading to Youtube';

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
        $videos = Video::where([['state', 'licensed'], ['file_watermark_dirty', '!=', NULL], ['youtube_id', NULL]])->limit(300)->get();
        //echo 'Total Count: '.count($videos).'<br /><br />';
        foreach ($videos as $video) {
            //echo $video->id.' : '.$video->title.'<br />';
            QueueVideoYoutubeUpload::dispatch($video->id)
                ->delay(now()->addSeconds(10));
        }
    }
}
