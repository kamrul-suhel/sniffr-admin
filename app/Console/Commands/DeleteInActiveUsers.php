<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use DB;

class DeleteInActiveUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'DeleteInActiveUsers:deleteusers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete inactive users';

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
        //this is just a test, we can add whatever scheduled functions and code we want below
        DB::table('contacts')
            ->where('id', 5)
            ->update(['updated_at' => \Carbon\Carbon::now()]);
    }
}
