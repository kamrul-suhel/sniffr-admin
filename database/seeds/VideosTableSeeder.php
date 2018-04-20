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
        $contactIds = Contact::pluck('id')->toArray();
        $videoCategoryIds = VideoCategory::pluck('id')->toArray();
        $videoCollectionIds = VideoCollection::pluck('id')->toArray();
        $videoShotTypeIds = VideoShotType::pluck('id')->toArray();
        $verticals = config('verticals');
        $states = config('videos.states');

        foreach (range(1, 100) as $index) {
            $vertical = $faker->randomElement($verticals);
            $verticalId = $vertical['id'];
            Video::create([
                'alpha_id' => $faker->numberBetween(100000, 999999) . 'AAAA',
                'maybe' => NULL,
                'user_id' => NULL,
                'state' => $faker->randomElement($states),
                'contact_id' => $faker->randomElement($contactIds),
                'video_category_id' => $faker->randomElement($videoCategoryIds),
                'video_collection_id' => $faker->randomElement($videoCollectionIds),
                'video_shottype_id' => $faker->randomElement($videoShotTypeIds),
                'mime' => $faker->randomElement(['video/mp4', 'video/quicktime', 'video/x-m4v']),
                'rights' => $faker->randomElement(['ex', 'nonex']),
                'youtube_id' => $faker->randomElement(['8geuehYuMP0','eK0pO79YkvY','8GvDudVgxCY']),
                'title' => $faker->sentence,
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
                'image' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1523079805-vid-20180406-wa0006-00001.jpg',
                'thumb' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1523079805-vid-20180406-wa0006-00001.jpg',
                'ext' => NULL,
                'url' => $faker->randomElement(['https://vimeo.com/170275830','https://vimeo.com/237214329','https://vimeo.com/246950354']),
                'file' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851.mp4',
                'file_watermark' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark.mp4',
                'file_watermark_dirty' => 'https://vlp-storage.s3.eu-west-1.amazonaws.com/1519859326-20180228_133851-watermark-dirty.mp4',
                'link' => NULL,
                'vertical' => $verticalId,
                'embed_code' => '',
                'duration' => $faker->numberBetween(10, 1000),
                'date_filmed' => $faker->date(),
                'location' => $faker->city,
                'source' => $faker->word,
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
                'is_exclusive' => $faker->boolean(),
                'terms' => NULL,
                'ip' => $faker->ipv4,
                'user_agent' => $faker->userAgent,
                'licensed_at' => $faker->date(),
            ]);
        }
    }
}