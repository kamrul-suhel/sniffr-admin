<?php

use App\Campaign;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CampaignVideoTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $campaignIds = Campaign::pluck('id')->toArray();
        $videoIds = Video::pluck('id')->toArray();
        $unique_ids = [];
        $states = config('videos.states');

        foreach (range(1, 3) as $index) {
            // check composite id is unique
            $newVideoId = $faker->randomElement($videoIds);
            $newCampaignId = $faker->randomElement($campaignIds);
            $new_composite_id = $newVideoId . $newCampaignId;

            if (key_exists($new_composite_id, $unique_ids)) {
                continue;
            }

            $unique_ids[$new_composite_id] = 1;

            DB::table('campaign_video')->insert([
                'video_id' => $newVideoId,
                'campaign_id' => $newCampaignId,
                'state' => $faker->randomElement($states),
            ]);
        }
    }
}