<?php

use App\Download;
use App\User;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DownloadsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = User::lists('id');
        $videoIds = Video::lists('id');
        $downloadTypes = config('site.downloads.types');

        foreach (range(1, 30) as $index) {
            Download::create([
                'user_id' => $faker->randomElement($userIds),
                'client_id' => NULL,
                'video_id' => $faker->randomElement($videoIds),
                'type' => $faker->randomElement($downloadTypes),
            ]);
        }
    }
}