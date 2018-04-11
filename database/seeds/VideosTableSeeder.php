<?php

use App\Contact;
use App\Video;
use App\VideoCategory;
use App\VideoCollection;
use App\VideoShotType;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class VideosTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $contactIds = Contact::lists('id');
        $videoCategoryIds = VideoCategory::lists('id');
        $videoCollectionIds = VideoCollection::lists('id');
        $videoShotTypeIds = VideoShotType::lists('id');
        $states = env('site.states');

        foreach (range(1, 30) as $index) {
            Video::create([
                'alpha_id' => sha1(microtime()),
                'state' => $faker->randomElement($states),
                'maybe' => NULL,
                'user_id' => NULL,
                'contact_id' => $faker->randomElement($contactIds),
                'video_category_id' => $faker->randomElement($videoCategoryIds),
                'video_collection_id' => $faker->randomElement($videoCollectionIds),
                'video_shottype_id' => $faker->randomElement($videoShotTypeIds),
                'title' => $faker->sentence,
                'rights' => 'ex',
                'access' => 'guest',
                'details' => NULL,
                'description' => NULL,
                'notes' => NULL,
                'nsfw' => NULL,
                'referrer' => NULL,
                'credit' => NULL,
                'active' => 1,
                'featured' => 0,
                'views' => 0,
                'image' => '',
                'thumb' => '',
                'mime' => NULL,
                'ext' => NULL,
                'url' => 'https://www.reddit.com/r/aww/comments/7d55y7/whenever_i_stop_petting_my_brittany/',
                'file' => NULL,
                'file_watermark' => NULL,
                'file_watermark_dirty' => NULL,
                'link' => NULL,
                'vertical' => NULL,
                'youtube_id' => '',
                'embed_code' => '',
                'duration' => NULL,
                'date_filmed' => NULL,
                'location' => NULL,
                'source' => NULL,
                'more_details' => NULL,
                'more_details_sent' => NULL,
                'more_details_code' => NULL,
                'reminders' => NULL,
                'contact_is_owner' => NULL,
                'submitted_elsewhere' => NULL,
                'submitted_where' => NULL,
                'allow_publish' => NULL,
                'filmed_by_me' => NULL,
                'permission' => NULL,
                'is_exclusive' => NULL,
                'terms' => NULL,
                'ip' => NULL,
                'user_agent' => NULL,
                'licensed_at' => NULL,
            ]);
        }
    }
}