<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //This is the line of code added, at the end, we the have class name of AutomateEmailReminders.php inside app\console\commands
        '\App\Console\Commands\AutomateEmailReminders',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // checks for shell access to run artisan queue and if not run command to run queue (!!! don't uncomment this !!!)
        // if (stripos((string) shell_exec('grep \'[q]ueue:work\''), 'artisan queue:work') === false) {
        //     $schedule->command('queue:work --queue=default --sleep=2 --tries=3 --timeout=5')->everyMinute()->appendOutputTo(storage_path() . '/logs/scheduler.log');
        // }

        // this is for running commands in scheduler (uncomment if needed to run daily)
        $filePath = 'storage/logs/scheduler.log';
        $schedule->command('AutomateEmailReminders:sendReminders')
            ->hourly()
            ->between('8:00', '21:00')
            ->appendOutputTo($filePath);
        
        $schedule->command('stats:getVideoPosts')->everyTenMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
