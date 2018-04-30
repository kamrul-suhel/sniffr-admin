<?php

use App\Client;
use App\Download;
use App\User;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

/**
 * Class DownloadsTableSeeder
 * TODO maybe move downloads logs outside the database, might get super big
 */
class DownloadsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = User::pluck('id')->toArray();
        $clientIds = Client::pluck('id')->toArray();
        $videoIds = Video::pluck('id')->toArray();
        $downloadTypes = config('site.downloads.types');

        foreach (range(1, 500) as $index) {
            Download::create([
                'user_id' => $faker->randomElement($userIds),
                'client_id' => $faker->randomElement($clientIds),
                'video_id' => $faker->randomElement($videoIds),
                'type' => $faker->randomElement($downloadTypes),
            ]);
        }
    }
}