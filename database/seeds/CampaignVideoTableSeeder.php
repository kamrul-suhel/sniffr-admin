<?php

use App\Contact;
use App\Video;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CampaignVideoTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $campaignIds = Contact::lists('id');
        $videoIds = Video::lists('id');
        $unique_ids = [];
        foreach (range(1, 30) as $index) {
            $newVideoId = $faker->randomElement($videoIds);
            $newCampaignId = $faker->randomElement($campaignIds);
            $states = env('sites.states');

            $new_id = $newVideoId . $newCampaignId;
            if (key_exists($new_id, $unique_ids)) {
                continue;
            }
            $unique_ids[$new_id] = 1;

            DB::table('campaign_video')->insert([
                'video_id' => $newVideoId,
                'campaign_id' => $newCampaignId,
                'state' => $faker->randomElement($states),
            ]);
        }
    }
}