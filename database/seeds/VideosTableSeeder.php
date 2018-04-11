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
        $verticalIds = config('verticals');
        $states = env('site.states');

        foreach (range(1, 100) as $index) {
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
                'rights' => $faker->randomElement(['ex', 'nonex']),
                'access' => 'guest',
                'details' => NULL,
                'description' => $faker->paragraph(50),
                'notes' => NULL,
                'nsfw' => $faker->boolean(5),
                'referrer' => $faker->name(),
                'credit' => $faker->name(),
                'active' => $faker->boolean(80),
                'featured' => $faker->boolean(1),
                'views' => $faker->numberBetween(0, 1000),
                'image' => 'image.jpg',
                'thumb' => 'thumb.jpg',
                'mime' => $faker->randomElement(['video/mp4', 'video/quicktime', 'video/x-m4v']),
                'ext' => NULL,
                'url' => $faker->url,
                'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851.mp4',
                'file_watermark' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark.mp4',
                'file_watermark_dirty' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark-dirty.mp4',
                'link' => NULL,
                'vertical' => $faker->randomElement($verticalIds),
                'youtube_id' => ['8geuehYuMP0','eK0pO79YkvY','8GvDudVgxCY'],
                'embed_code' => '',
                'duration' => $faker->numberBetween(10, 1000),
                'date_filmed' => $faker->date(),
                'location' => $faker->city,
                'source' => $faker->word,
                'more_details' => $faker->paragraph(30),
                'more_details_sent' => NULL,
                'more_details_code' => NULL,
                'reminders' => NULL,
                'contact_is_owner' => NULL,
                'submitted_elsewhere' => NULL,
                'submitted_where' => NULL,
                'allow_publish' => NULL,
                'filmed_by_me' => NULL,
                'permission' => NULL,
                'is_exclusive' => $faker->boolean(),
                'terms' => NULL,
                'ip' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
                'licensed_at' => $faker->date(),
            ]);
        }
    }
}