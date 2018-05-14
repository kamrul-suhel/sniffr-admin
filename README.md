
## Run Migrations and DB Seeders
Works better if you drop every table in your local DB.
It will create users, admins, videos, etc.
Every time you add a column you should add it to the migrations and seeders.

```php artisan migrate:refresh --seed```
## Error fix for when AWS credentials and watermarking fail

```Aws\Exception\CredentialsException: Error retrieving credentials from the instance profile metadata server. (cURL error 28: Connection timed out after 3002 milliseconds (see http://curl.haxx.se/libcurl/c/libcurl-errors.html))```

- 1 Check file in /vendor/dumpk/elastcoder/src/config.php is like this:

```
return [
    'encodings' => [
        'example' => [
            'type' => 1,
            'PresetId' => '1516201655942-vaq9mu',
            'width' => 1920,
            'height' => 1080,
            'aspect' => '16:9',
            'ext' => 'mp4',
            'PipelineId' => '1515757750300-4fybrt',
            'Watermarks' => [[
                    'PresetWatermarkId' => 'TopRight',
                    'InputKey' => 'logo-sniffr-white.png',
            ]],
        ],
    ],

];
```
- 2 RUN: php artisan config:cache

- 3 RUN: php artisan config:clear

- 4 RUN: php artisan queue:work (see if that works)

- 5 SWITCH BETWEEN RUNNING: php artisan queue:work AND php artisan queue:listen


## MySQL too many connections issue

- Kill mysql processes with Activity Monitor (maybe restart computer too, or at least local MAMP server)
- Console into: `mysql -u root`
- `show variables like "max_connections";`
- `set global max_connections = 500;`
- Good articles about this https://stackoverflow.com/questions/14331032/mysql-error-1040-too-many-connection and https://stackoverflow.com/questions/44248036/too-many-connections-error-with-laravel-5-4-and-mariadb

## Notes for FFMpeg install and video watermarking

- Install package using instructions (https://packagist.org/packages/pbmedia/laravel-ffmpeg)
- Edit /config/laravel-ffmpeg.php (if needed)

## Notes for Laravel Scheduler + AWS SQS (WIP)

Laravel Scheduler (with local CRON) working. Currently it just calls DeleteInActiveUsers:deleteusers (which just updates my contact id:5 on the updated_at field). We can use this as a template to create other functions.

- Sessions, Cache and Queue needed to be created for auto-scaling. Works locally now too so that's fine.
- Need to edit Cron for local scheduling: 1) Edit the Cron file `$ crontab -e 2) * * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1`
- Good article on scaling Laravel with AWS Elastic Beanstalk (https://deliciousbrains.com/scaling-laravel-aws-elastic-beanstalk-part-1-setting-up-laravel/)
- Another good article about AWS EB + laravel-aws-worker package (https://blog.menara.com.au/2016/06/running-laravel-in-amazon-elastic-beanstalk/)


## Notes for Laravel Queues for taking email sends out of the flow

The difference between Laravel Scheduler and Laravel Queues >> Scheduler is more for timed/recurring functions rather than Queues which are tasks/jobs added to a queue for later (attributed to a user).

- Needed to create new queue table for queued jobs using 
` $ php artisan queue:table`
- And another for failed jobs using `$ php artisan queue:failed-table`
- Run command to create jobs db tables but done from migrations/jobs subfolder 
` $ php artisan migrate --path=/database/migrations/jobs/ `
- Add or Edit `QUEUE_DRIVER=database` in env file
- Added new test queue job ` $ php artisan make:job SubmissionThanks `
- Updated App\Jobs\SubmissionThanks file to execute SubmissionThanks mail (WIP)
- Then we have to create a schedule function to keep checking the queue.
- Run `$ php artisan queue:listen`

## Notes for GAE setup

I have added Sessions, Cache and Queue + add a GAE specific packages and created app.yaml file. Then deployed to GAE Flex for testing.

- Added packages to composer:
```
"google/cloud-tools":"^0.6"
"google/cloud-storage": "^1.0",
```
- Added script to composer:
```
"post-install-cmd": [
    "chmod -R 755 bootstrap\/cache",
    "php artisan cache:clear"
]
``
- Added app.yaml file. Pay attention to specific GAE variables like GOOGLE_BUCKET_NAME, DB_SOCKET, liveness_check, and beta_settings. Plus, your APP_KEY must match for your local project before deploying (check with $ php artisan key:generate).


- Added warm up using liveness_check which keeps servers live longer so they don't suspend and become slow on initial requests during slow periods. Note that warm up is different on GAE Flex from GAE Standard. More info here (https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml)

## Check your memory:
```$memory_limit = ini_get('memory_limit');
if (preg_match('/^(\d+)(.)$/', $memory_limit, $matches)) {
    if ($matches[2] == 'M') {
        $memory_limit = $matches[1] * 1024 * 1024; // nnnM -> nnn MB
    } else if ($matches[2] == 'K') {
        $memory_limit = $matches[1] * 1024; // nnnK -> nnn KB
    }
}

$ok = ($memory_limit >= 640 * 1024 * 1024); // at least 64M?

dd($memory_limit);```