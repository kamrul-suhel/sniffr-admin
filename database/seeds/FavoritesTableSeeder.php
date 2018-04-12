<?php

use App\Download;
use App\Favorite;
use App\User;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FavoritesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = User::pluck('id')->toArray();
        $videoIds = Video::pluck('id')->toArray();
        $unique_ids = [];

        foreach (range(1, 30) as $index) {
            // check composite id is unique
            $newVideoId = $faker->randomElement($videoIds);
            $newUserId = $faker->randomElement($userIds);
            $new_composite_id = $newVideoId . $newUserId;
            if (key_exists($new_composite_id, $unique_ids)) {
                continue;
            }
            $unique_ids[$new_composite_id] = 1;

            Favorite::create([
                'user_id' => $faker->randomElement($userIds),
                'video_id' => $faker->randomElement($videoIds),
            ]);
        }
    }
}