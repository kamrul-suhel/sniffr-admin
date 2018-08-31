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
        //This is the line of code added, at the end, we have an example class name of AutomateEmailReminders.php inside app\console\commands
        '\App\Console\Commands\AutomateEmailReminders',
        '\App\Console\Commands\AutomateBumps',
        '\App\Console\Commands\AutomateArchive',
        '\App\Console\Commands\AutomateDeleteRejected',
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
        $genericPath = 'storage/logs/scheduler.log';
        $automateEmailReminders = 'storage/logs/scheduler.log';
        $automateBumps = 'storage/logs/scheduler_bumps.log';

        $schedule->command('AutomateEmailReminders:sendReminders')
            ->hourly()
            ->between('8:00', '21:00')
            ->appendOutputTo($automateEmailReminders);

        $schedule->command('AutomateBumps:sendBumps')
            ->weekdays()
            ->hourly()
            ->between('8:00', '21:00')
            ->appendOutputTo($automateBumps);

        $schedule->command('AutomateArchive:archive')
            ->hourly()
            ->appendOutputTo($automateBumps);

        $schedule->command('AutomateDeleteRejected:delete')
            ->daily()
            ->appendOutputTo($automateBumps);

        $schedule->command('stats:getVideoStats')
            ->everyTenMinutes()
            ->appendOutputTo($genericPath);

        $schedule->command('licenses:monitorLicenseEndTimes')
            ->everyFiveMinutes()
            ->appendOutputTo($genericPath);
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
