<?php

use Illuminate\Database\Seeder;
use App\Video;
use App\Tag;
use Faker\Factory as Faker;

class TagVideoTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $tagIds = Tag::pluck('id')->toArray();
        $videoIds = Video::pluck('id')->toArray();
        $unique_ids = [];

        foreach (range(1, 300) as $index) {
            // check composite id is unique
            $newVideoId = $faker->randomElement($videoIds);
            $newTagId = $faker->randomElement($tagIds);
            $new_composite_id = $newVideoId . $newTagId;
            if (key_exists($new_composite_id, $unique_ids)) {
                continue;
            }

            $unique_ids[$new_composite_id] = 1;
            \DB::table('tag_video')->insert([
                [
                    'video_id' => $newVideoId,
                    'tag_id' => $newTagId,
                ],
            ]);
        }
    }
}